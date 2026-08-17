/**
 * @fileoverview Summary Dashboard Module
 * @description Displays an overview of all tasks with statistics including task counts by status,
 *              urgent task deadline tracking, personalized greetings based on time of day,
 *              and task priority visualization. Provides quick navigation to the board.
 * @module js/summary
 */

let showedLoginGreeting = false;
let todos = 0;
let done = 0;
let progresses = 0;
let awaits = 0;
let todaysDate = 0;
let tasksInBoard = 0;
let urgentCounter = 0;
let finaleDate;
let greetingText;
let dateCounter;
let earliestUrgentTaskIndex = -1;

/**
 * Initializes the summary view.
 * Includes header and menu, sets navigation style, loads user data, and prepares event listeners.
 */
async function initSummary() {
  await includeHTML();
  await initGreeting();
  setActiveLink("navSummary");
  await loadUsersAndCurrentUser();
  createUserSignatureIcon();
  await TaskDisplayFields();
  preparePopupEvent();
}

/**
 * Displays a greeting after login if not already shown.
 */
async function initGreeting() {
  showedLoginGreeting = sessionStorage.getItem("showedLoginGreeting") === "true";

  if (!showedLoginGreeting && window.innerWidth <= 720) {
    await showGreetScreen();
    showedLoginGreeting = true;
    sessionStorage.setItem("showedLoginGreeting", showedLoginGreeting);
  }
  sessionStorage.setItem("showedLoginGreeting", showedLoginGreeting);
  document.getElementById("summaryToDos").style.display = "flex";
}

/**
 * Displays a greeting message for guests and regular users.
 */
async function showGreetScreen() {
  let GreetingsMobile = document.getElementById("GreetingsMobile");
  GreetingsMobile.classList.remove("hide");
  GreetingsMobile.classList.add("show");
  setTimeout(() => {
    GreetingsMobile.classList.remove("show");
    GreetingsMobile.classList.add("hide");
  }, 2500);
}

/**
 * Loads and updates task-related fields.
 */
async function TaskDisplayFields() {
  await howManyTasks();
  await determineTodaysDate();
  await searchUpcomingDate();
  await greeting();
  setSummaryLetter();
}

/**
 * Sets a greeting message based on the current time.
 */
async function greeting() {
  DateConstructor = new Date();
  timeOfDate = DateConstructor.getHours();
  if (timeOfDate < 12) {
    greetingText = `Good morning`;
  } else if (timeOfDate < 18) {
    greetingText = `Good afternoon`;
  } else if (timeOfDate < 24) {
    greetingText = `Good evening`;
  }
}

/**
 * Counts tasks based on their status.
 */
async function howManyTasks() {
  if (!user || !user.tasks || !Array.isArray(user.tasks)) {
    return;
  }

  for (let i = 0; i < user.tasks.length; i++) {
    if (user.tasks[i].status === "to-do") {
      todos++;
    } else if (user.tasks[i].status === "done") {
      done++;
    } else if (user.tasks[i].status === "progress") {
      progresses++;
    } else if (user.tasks[i].status === "await") {
      awaits++;
    }
  }
}

/**
 * Determines today's date in YYYY-MM-DD format.
 */
async function determineTodaysDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  todaysDate = `${year}-${month}-${day}`;
}

/**
 * Finds the nearest upcoming urgent task due date.
 */
async function searchUpcomingDate() {
  if (!user.tasks || user.tasks.length === 0) {
    return;
  }

  let earliestUpcomingDate = null;

  for (let i = 0; i < user.tasks.length; i++) {
    if (user.tasks[i].prio === "Urgent" && user.tasks[i].status !== "done") {
      const taskDueDate = new Date(user.tasks[i].dueDate);

      if (!earliestUpcomingDate || taskDueDate < earliestUpcomingDate) {
        earliestUpcomingDate = taskDueDate;
        earliestUrgentTaskIndex = i;
      }
    }
  }

  if (!earliestUpcomingDate) {
    console.warn("Keine urgent Aufgabe gefunden!");
    return;
  }

  dateCounter = earliestUpcomingDate;
  adjustDate();
  FinalUpcomingDate(earliestUpcomingDate);
}

/**
 * Formats the upcoming task date.
 */
function adjustDate() {
  let myDate = new Date(dateCounter);

  let year = myDate.getFullYear();
  let month = (myDate.getMonth() + 1).toString().padStart(2, "0"); // Monat ist 0-basiert
  let day = myDate.getDate().toString().padStart(2, "0");

  let formattedDate = `${year}-${month}-${day}`;
  dateCounter = formattedDate;
  howManyUrgent();
}

/**
 * Counts urgent tasks.
 */
function howManyUrgent() {
  for (let i = 0; i < user.tasks.length; i++) {
    if (user.tasks[i].prio === "Urgent" && user.tasks[i].status !== "done") {
      urgentCounter++;
    }
  }
}

/**
 * Sets the final upcoming urgent deadline.
 * @param {Date} upcomingDate - The nearest upcoming due date.
 */
function FinalUpcomingDate(upcomingDate) {
  finaleDate = formatDateString(upcomingDate);
}

/**
 * Returns the month name for a given month number.
 * @param {number} month - Month number (1-12).
 * @returns {string} Month name.
 */
function getMonthName(month) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[month - 1];
}

/**
 * Formats a date into a readable string.
 * @param {Date|string} date - The date to format.
 * @returns {string} Formatted date string.
 */
function formatDateString(date) {
  // Parse date string as UTC to avoid timezone shifts
  let dateString = typeof date === "string" ? date : date.toISOString().split("T")[0];
  const [year, month, day] = dateString.split("-");

  const monthName = getMonthName(parseInt(month));

  return `${monthName} ${parseInt(day)}, ${year}`;
}

/**
 * Updates summary placeholders with task data.
 */
function setSummaryLetter() {
  updateTodoContainer();
  updateDoneContainer();
  updateProgressContainer();
  updateAwaitContainer();
  updateCounterContainer();
  updateUrgentContainer();
  updateUpcomingDateContainer();
  updateGreetingContainer();
}

/**
 * Updates the To-do task counter in the summary display.
 */
function updateTodoContainer() {
  todoContainer = document.getElementById(`summeryTodoTodos`);
  todoContainer.innerHTML = todos;
}

/**
 * Updates the Done task counter in the summary display.
 */
function updateDoneContainer() {
  doneContainer = document.getElementById(`summeryDoneTodos`);
  doneContainer.innerHTML = done;
}

/**
 * Updates the In Progress task counter in the summary display.
 */
function updateProgressContainer() {
  progressContainer = document.getElementById(`summeryProcessTasks`);
  progressContainer.innerHTML = progresses;
}

/**
 * Updates the Await Feedback task counter in the summary display.
 */
function updateAwaitContainer() {
  awaitContainer = document.getElementById(`summeryAwaitingTask`);
  awaitContainer.innerHTML = awaits;
}

/**
 * Updates the total task count in the summary display.
 */
function updateCounterContainer() {
  if (Array.isArray(user.tasks)) {
    tasksInBoard = user.tasks.length;
  } else {
    tasksInBoard = 0;
  }

  counterContainer = document.getElementById("dataTodos");
  counterContainer.innerHTML = tasksInBoard;
}

/**
 * Updates the urgent task counter in the summary display.
 */
function updateUrgentContainer() {
  urgentContainer = document.getElementById(`summeryUpcomingTasks`);
  urgentContainer.innerHTML = urgentCounter;
}

/**
 * Updates the upcoming urgent deadline date display.
 * Shows "none" if no urgent tasks exist.
 */
function updateUpcomingDateContainer() {
  upcomingDateContainer = document.getElementById(`summeryUrgentDate`);

  if (urgentCounter > 0) {
    upcomingDateContainer.innerHTML = finaleDate;
  } else {
    upcomingDateContainer.innerHTML = "none";
  }
}

/**
 * Updates the personalized greeting display for desktop and mobile views.
 * Displays time-based greeting and user name (or "Guest User" for guests).
 */
function updateGreetingContainer() {
  greetingsDesktop = document.getElementById(`greetingsDesktop`);
  greetingNameDesktop = document.getElementById(`greetingNameDesktop`);
  greetingMobile = document.getElementById(`greetingMobile`);

  let displayName = user.name.startsWith("Guest User") ? "Guest User" : user.name;

  if (window.innerWidth <= 721) {
    greetingsDesktop.innerHTML = greetingText;
    greetingNameDesktop.innerHTML = displayName;
    greetingMobile.innerHTML = greetingText;
  } else {
    greetingsDesktop.innerHTML = greetingText;
    greetingNameDesktop.innerHTML = displayName;
    greetingMobile.innerHTML = greetingText;
  }
}

/**
 * Changes an image on hover.
 * @param {HTMLElement} element - The image container element.
 */
function changeImage(element) {
  const img = element.querySelector(".summaryAnimateProgramm");
  if (img.classList.contains("editImage")) {
    img.src = "./../assets/img/summary/summaryWhiteEdit.svg";
  } else if (img.classList.contains("checkImage")) {
    img.src = "./../assets/img/summary/summaryCheckWhite.svg";
  }
}

/**
 * Restores the image after hover.
 * @param {HTMLElement} element - The image container element.
 */
function changeImageBack(element) {
  const img = element.querySelector(".summaryAnimateProgramm");
  if (img.classList.contains("editImage")) {
    img.src = "./../assets/img/summary/summaryGrayEdit.svg";
  } else if (img.classList.contains("checkImage")) {
    img.src = "./../assets/img/summary/summaryCheckGray.svg";
  }
}

/**
 * Navigates to the board and opens the earliest urgent task after loading.
 */
function openUrgentTask() {
  if (earliestUrgentTaskIndex !== -1) {
    sessionStorage.setItem("openTaskIndex", earliestUrgentTaskIndex);
  }
  includeContentHTML("board");
}
