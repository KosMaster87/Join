let showedLoginGreeting = false;
let todos = 0;
let dones = 0;
let progresses = 0;
let awaits = 0;
let todaysDate = 0;
let tasksInBoard = 0;
let urgentCounter = 0;
let finaleDate;
let greetigText;
let datecounterdate;

/*
 * Include header and munu.
 * Add navigation style as active-link.
 * Set Users array and user as global.
 * Set the countings from the user.
 */
async function initSummary() {
  await includeHTML();
  await initGreeting();
  setActiveLink("navSummary");
  await loadCurrentUserAlsoUsersAsObject();
  createUserSignatureIcon();
  await TaskDisplayFields();
  preparePopupEvent(); // BOARD; ADDTASK; CONTACTS; ++
}

/**
 * Show your greeting after login.
 */
async function initGreeting() {
  showedLoginGreeting =
    sessionStorage.getItem("showedLoginGreeting") === "true";

  if (!showedLoginGreeting && window.innerWidth <= 720) {
    await showGreetScreen();
    showedLoginGreeting = true;
    sessionStorage.setItem("showedLoginGreeting", showedLoginGreeting);
  }
  sessionStorage.setItem("showedLoginGreeting", showedLoginGreeting);
  document.getElementById("summaryToDos").style.display = "flex";
}

/**
 * Your greeting / you are welcome as a guest.
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
 * Initialize all data from the user into the task fields.
 */
async function TaskDisplayFields() {
  await howManyTasks();
  await determineTodaysDate();
  await searchUpcomingDate();
  await greeting();
  setSummaryLetter();
}

/**
 * Greet the user depending on the time of day.
 */
async function greeting() {
  DateConstructor = new Date();
  timeOfDate = DateConstructor.getHours();
  if (timeOfDate < 12) {
    greetigText = `Good morning`;
  } else if (timeOfDate < 18) {
    greetigText = `Good afternoon`;
  } else if (timeOfDate < 24) {
    greetigText = `Good evening`;
  }
}

/**
 * The user's total number of tasks.
 */
async function howManyTasks() {
  for (let i = 0; i < user.tasks.length; i++) {
    if (user.tasks[i].status === "to-do") {
      todos++;
    } else if (user.tasks[i].status === "done") {
      dones++;
    } else if (user.tasks[i].status === "progress") {
      progresses++;
    } else if (user.tasks[i].status === "await") {
      awaits++;
    }
  }
}

/**
 * Determine today's date.
 */
async function determineTodaysDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  todaysDate = `${year}-${month}-${day}`;
}

/**
 * Search tasks by creation date. To find the upcoming date of the next task.
 */
async function searchUpcomingDate() {
  let earliestUpcomingDate = null;

  for (let i = 0; i < user.tasks.length; i++) {
    const taskDueDate = new Date(user.tasks[i].dueDate);

    if (!earliestUpcomingDate || taskDueDate < earliestUpcomingDate) {
      earliestUpcomingDate = taskDueDate;
    }
  }

  datecounterdate = earliestUpcomingDate;
  adjustDate();
  FinalUpcomingDate(earliestUpcomingDate);
}

/**
 * Adjust date for upcomingDate.
 */
function adjustDate() {
  let myDate = new Date(datecounterdate);

  let year = myDate.getFullYear();
  let month = (myDate.getMonth() + 1).toString().padStart(2, "0"); // Monat ist 0-basiert
  let day = myDate.getDate().toString().padStart(2, "0");

  let formattedDate = `${year}-${month}-${day}`;
  datecounterdate = formattedDate;
  howManyUrgent();
}

/**
 * Just urgent counter.
 */
function howManyUrgent() {
  for (let i = 0; i < user.tasks.length; i++) {
    if (user.tasks[i].prio === "Urgent") {
      urgentCounter++;
    }
  }
}

/**
 * Find the month for the upcoming urgent deadline.
 */
function FinalUpcomingDate(upcomingDate) {
  finaleDate = formatDateString(upcomingDate);
}

/**
 * Helper function to get the month name.
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
 * Helper function to format the date string.
 */
function formatDateString(date) {
  const dateObject = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return dateObject.toLocaleDateString("en-US", options);
}

/**
 * Render the user's data into the placeholders.
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

function updateTodoContainer() {
  todoContainer = document.getElementById(`summeryTodoTodos`);
  todoContainer.innerHTML = todos;
}

function updateDoneContainer() {
  doneContainer = document.getElementById(`summeryDoneTodos`);
  doneContainer.innerHTML = dones;
}

function updateProgressContainer() {
  progressContainer = document.getElementById(`summeryProcessTasks`);
  progressContainer.innerHTML = progresses;
}

function updateAwaitContainer() {
  awaitContainer = document.getElementById(`summeryAwaitingTask`);
  awaitContainer.innerHTML = awaits;
}

function updateCounterContainer() {
  tasksInBoard = user.tasks.length;
  counterContainer = document.getElementById(`dataTodos`);
  counterContainer.innerHTML = tasksInBoard;
}

function updateUrgentContainer() {
  urgentContainer = document.getElementById(`summeryUpcomingTasks`);
  urgentContainer.innerHTML = urgentCounter;
}

function updateUpcomingDateContainer() {
  upcomingDateContainer = document.getElementById(`summeryUrgentDate`);

  if (urgentCounter > 0) {
    upcomingDateContainer.innerHTML = finaleDate;
  } else {
    upcomingDateContainer.innerHTML = "none";
  }
}

function updateGreetingContainer() {
  greetingsDesktop = document.getElementById(`greetingsDesktop`);
  greetingNameDesktop = document.getElementById(`greetingNameDesktop`);
  greetingMobile = document.getElementById(`greetingMobile`);

  if (window.innerWidth <= 721) {
    greetingsDesktop.innerHTML = greetigText;
    greetingNameDesktop.innerHTML = user.name;
    greetingMobile.innerHTML = greetigText;
  } else {
    greetingsDesktop.innerHTML = greetigText;
    greetingNameDesktop.innerHTML = user.name;
    greetingMobile.innerHTML = greetigText;
  }
}

/**
 * Symmary content animate images.
 * @param {Image to animate whit hover} element
 */
function changeImage(element) {
  const img = element.querySelector(".summaryAnimateProgramm");
  if (img.classList.contains("editImage")) {
    img.src = "../assets/img/summary/summaryWhiteEdit.svg";
  } else if (img.classList.contains("checkImage")) {
    img.src = "../assets/img/summary/summaryCheckWhite.svg";
  }
}

/**
 * Symmary content animate images.
 * @param {Image to animate whit hover} element
 */
function changeImageBack(element) {
  const img = element.querySelector(".summaryAnimateProgramm");
  if (img.classList.contains("editImage")) {
    img.src = "../assets/img/summary/summaryGrayEdit.svg";
  } else if (img.classList.contains("checkImage")) {
    img.src = "../assets/img/summary/summaryCheckGray.svg";
  }
}
