/**
 * @fileoverview Board task popup rendering.
 *
 * @description
 * Handles rendering of task popup with all task details including
 * category, values, assigned contacts, and subtasks.
 *
 * @module board/core/board-task-render
 */

let pupUpPriorityName;

/**
 * Renders task category with color.
 * @param {number} i - Task index.
 */
const renderTaskCategory = (i) => {
  const popUpCategory = document.getElementById(`popUpTaskCategory`);
  if (!popUpCategory || !user.tasks[i]?.category) return;
  popUpCategory.innerHTML = user.tasks[i].category;
  const colors = {
    "Technical Task": "var(--turkis)",
    "User Story": "var(--blue)",
  };
  popUpCategory.style.backgroundColor = colors[user.tasks[i].category] || "var(--blue)";
};

/**
 * Formats date from YYYY-MM-DD to DD/MM/YYYY.
 * @param {string} date - Date string.
 * @returns {string} Formatted date.
 */
const formatTaskDate = (date) => date.split("-").reverse().join("/");

/**
 * Gets priority image path.
 * @param {string} prio - Priority level.
 * @returns {string} Image path.
 */
const getPriorityImagePath = (prio) => {
  const prioMap = {
    Low: "../assets/img/board/board_low.svg",
    Medium: "../assets/img/board/board_medium.svg",
    Urgent: "../assets/img/board/board_urgent.svg",
  };
  return prioMap[prio] || "";
};

/**
 * Sets task title and description.
 * @param {number} i - Task index.
 */
const setTaskTitleAndDescription = (i) => {
  document.getElementById(`popUpTitleId`).innerHTML = user.tasks[i].title;
  document.getElementById(`popUpDescriptionID`).innerHTML = user.tasks[i].description;
};

/**
 * Sets task due date.
 * @param {number} i - Task index.
 */
const setTaskDueDate = (i) => {
  const formattedDate = formatTaskDate(user.tasks[i].dueDate);
  document.getElementById(`popUpDueDate`).innerHTML = formattedDate;
};

/**
 * Sets task priority image and text.
 * @param {number} i - Task index.
 */
const setTaskPriority = (i) => {
  const prio = user.tasks[i].prio;
  const imagePath = getPriorityImagePath(prio);
  if (imagePath) {
    document.getElementById(`popUpPrioImage`).src = imagePath;
  }
  popUpPriority.innerHTML = prio;
};

/**
 * Renders task values.
 * @param {number} i - Task index.
 */
const renderTaskValues = (i) => {
  setTaskTitleAndDescription(i);
  setTaskDueDate(i);
  setTaskPriority(i);
};

/**
 * Renders single assigned contact.
 * @param {number} i - Task index.
 * @param {number} n - Assigned contact index.
 * @param {HTMLElement} container - Container element.
 */
const renderSingleAssigned = (i, n, container) => {
  const assignedContact = user.tasks[i].assignedTo[n];
  container.innerHTML += assigned(n);
  document.getElementById(`pupUpIcon${n}`).style.backgroundColor = assignedContact.userColor;
  document.getElementById(`popUpAssignedTo${n}`).innerHTML = assignedContact.name;
  document.getElementById(`pupUpIcon${n}`).innerHTML = generateSignature(assignedContact.name);
};

/**
 * Renders assigned contacts.
 * @param {number} i - Task index.
 */
const renderTaskAssigneds = (i) => {
  if (!user.tasks[i] || !Array.isArray(user.tasks[i].assignedTo)) return;
  const mainContainer = document.getElementById(`popUpAssignedToMainContainer`);
  user.tasks[i].assignedTo.forEach((_, n) => {
    renderSingleAssigned(i, n, mainContainer);
  });
};

/**
 * Validates if task has subtasks.
 * @param {number} i - Task index.
 * @returns {boolean} True if subtasks exist.
 */
const hasValidSubtasks = (i) => {
  return user.tasks[i] && Array.isArray(user.tasks[i].subtasks);
};

/**
 * Gets subtask container elements.
 * @param {number} i - Task index.
 * @returns {Object} Container elements.
 */
const getSubtaskContainers = (i) => ({
  subtask: document.getElementById(`boardTaskSubtaskMainContainer`),
  await: document.getElementById(`awaitMainContainerId`),
  progress: document.getElementById(`progressMainContainerId` + i),
});

/**
 * Hides subtask containers.
 * @param {Object} containers - Container elements.
 */
const hideSubtaskContainers = ({ subtask, await: awaitC, progress }) => {
  subtask.style.display = "none";
  if (awaitC) awaitC.style.display = "none";
  if (progress) progress.style.display = "none";
};

/**
 * Gets subtask checkbox image source.
 * @param {boolean} isDone - Completion status.
 * @returns {string} Image path.
 */
const getSubtaskImageSource = (isDone) => {
  return isDone ? "../assets/img/board/board_box_check.svg" : "../assets/img/board/board_box.svg";
};

/**
 * Renders single subtask.
 * @param {number} i - Task index.
 * @param {number} s - Subtask index.
 * @param {HTMLElement} container - Container element.
 */
const renderSingleSubtask = (i, s, container) => {
  container.innerHTML += popUpSubtaskReturn(i, s);
  const subtaskText = document.getElementById(`pupUpSubtaskText${s}`);
  if (subtaskText) subtaskText.innerHTML = user.tasks[i].subtasks[s].name;
  const image = document.getElementById(`popUpSubtaskImage${s}`);
  if (image) image.src = getSubtaskImageSource(user.tasks[i].subtasks[s].done);
};

/**
 * Shows and populates subtasks container.
 * @param {number} i - Task index.
 * @param {HTMLElement} subtaskContainer - Main container.
 */
const showSubtasksContainer = (i, subtaskContainer) => {
  subtaskContainer.style.display = "flex";
  const popUpContainer = document.getElementById(`popUpSubtasksContainer`);
  if (!popUpContainer) {
    console.warn("popUpSubtasksContainer not found");
    return;
  }
  user.tasks[i].subtasks.forEach((_, s) => renderSingleSubtask(i, s, popUpContainer));
};

/**
 * Renders task subtasks.
 * @param {number} i - Task index.
 */
const renderTaskSubtasks = (i) => {
  if (!hasValidSubtasks(i)) return;
  const containers = getSubtaskContainers(i);
  if (!containers.subtask) {
    console.warn("boardTaskSubtaskMainContainer not found");
    return;
  }
  if (user.tasks[i].subtasks.length === 0) {
    hideSubtaskContainers(containers);
  } else {
    showSubtasksContainer(i, containers.subtask);
  }
};

/**
 * Renders task popup content.
 * @param {number} i - Task index.
 */
const renderTaskPopup = (i) => {
  const mainContainer = document.getElementById(`mainContent`);
  mainContainer.innerHTML += openTaskReturn(i);
  renderTaskCategory(i);
  renderTaskValues(i);
  renderTaskAssigneds(i);
  renderTaskSubtasks(i);
};

/**
 * Opens task popup.
 * @param {number} i - Task index.
 */
const openTask = (i) => {
  if (!switchTaskTriggered) {
    disableBodyScroll();
    renderTaskPopup(i);
  } else {
    switchTaskTriggered = false;
  }
};

/**
 * Counts finished subtasks.
 * @param {Array} subtasks - Subtasks array.
 * @returns {number} Count of finished subtasks.
 */
const countFinishedSubtasks = (subtasks) => {
  return subtasks.filter((subtask) => subtask.done === true).length;
};

/**
 * Calculates progress percentage.
 * @param {number} finished - Finished count.
 * @param {number} total - Total count.
 * @returns {number} Percentage.
 */
const calculateProgressPercent = (finished, total) => {
  return (finished / total) * 100;
};

/**
 * Updates progress bar elements.
 * @param {number} i - Task index.
 * @param {number} counter - Finished count.
 * @param {number} percent - Progress percentage.
 */
const updateProgressBarElements = (i, counter, percent) => {
  const finishedTasksElement = document.getElementById(`finishedTasks${i}`);
  if (finishedTasksElement) finishedTasksElement.innerHTML = counter;
  const progressBarElement = document.getElementById(`progressBar${i}`);
  if (progressBarElement) progressBarElement.style.width = percent + "%";
};

/**
 * Shows progress container with data.
 * @param {number} i - Task index.
 * @param {Object} task - Task object.
 */
const showProgressContainer = (i, task) => {
  const counter = countFinishedSubtasks(task.subtasks);
  const percent = calculateProgressPercent(counter, task.subtasks.length);
  updateProgressBarElements(i, counter, percent);
};

/**
 * Updates progress bar for task.
 * @param {number} i - Task index.
 */
const updateTaskProgressBar = (i) => {
  const task = user.tasks[i];
  if (!task?.subtasks) return;
  const progressContainer = document.getElementById(`progressMainContainerId${i}`);
  if (!progressContainer) return;
  if (task.subtasks.length === 0) {
    progressContainer.style.display = "none";
  } else {
    progressContainer.style.display = "flex";
    showProgressContainer(i, task);
  }
};

/**
 * Renders single assigned user icon.
 * @param {Object} assignedUser - Assigned user object.
 * @param {HTMLElement} container - Icon bar container.
 */
const renderAssignedUserIcon = (assignedUser, container) => {
  if (!assignedUser?.name) return;
  const signature = generateSignature(assignedUser.name);
  const color = assignedUser.userColor;
  container.insertAdjacentHTML("beforeend", iconReturn(color, signature));
};

/**
 * Removes last icon in icon bar.
 * @param {number} i - Task index.
 */
const removeLastIconFromBar = (i) => {
  const iconBar = document.getElementById(`IconBar${i}`);
  const icons = iconBar.getElementsByClassName("iconStyle");
  const lastIcon = icons[icons.length - 1];
  iconBar.removeChild(lastIcon);
};

/**
 * Adds more assigned users indicator.
 * @param {number} i - Task index.
 */
const addMoreAssignedIndicator = (i) => {
  const iconBarContainer = document.getElementById(`IconBar${i}`);
  const number = "+" + (user.tasks[i].assignedTo.length - 3);
  const numberColor = "var(--lightGray)";
  iconBarContainer.innerHTML += iconReturn(numberColor, number);
};

/**
 * Renders assigned user signatures.
 * @param {number} i - Task index.
 */
const renderAssignedSignatures = (i) => {
  const iconBarContainer = document.getElementById(`IconBar${i}`);
  if (!iconBarContainer || !user.tasks[i]?.assignedTo) return;
  iconBarContainer.innerHTML = "";
  const maxIcons = Math.min(4, user.tasks[i].assignedTo.length);
  for (let a = 0; a < maxIcons; a++) {
    renderAssignedUserIcon(user.tasks[i].assignedTo[a], iconBarContainer);
  }
  if (user.tasks[i].assignedTo.length > 4) {
    removeLastIconFromBar(i);
    addMoreAssignedIndicator(i);
  }
};

/**
 * Gets category background color.
 * @param {string} category - Category name.
 * @returns {string} Color code.
 */
const getCategoryColor = (category) => {
  const colors = {
    "Technical Task": "#1FD7C1",
    "User Story": "#0038FF",
  };
  return colors[category] || "#0038FF";
};

/**
 * Sets task category styling.
 * @param {number} i - Task index.
 * @param {Object} task - Task object.
 */
const setTaskCategory = (i, task) => {
  const element = document.getElementById(`TaskCategory${i}`);
  if (!element || !task.category) return;
  element.innerHTML = task.category;
  element.style.backgroundColor = getCategoryColor(task.category);
};

/**
 * Sets task title and description.
 * @param {number} i - Task index.
 * @param {Object} task - Task object.
 */
const setTaskTitleDescription = (i, task) => {
  const title = document.getElementById(`titleId${i}`);
  const description = document.getElementById(`descriptionID${i}`);
  if (title) title.innerHTML = task.title || "";
  if (description) description.innerHTML = task.description || "";
};

/**
 * Sets task priority image.
 * @param {number} i - Task index.
 * @param {Object} task - Task object.
 */
const setTaskPriorityImage = (i, task) => {
  const element = document.getElementById(`PrioImageContainer${i}`);
  if (!element) return;
  const prio = task.prio || task.priority;
  if (prio) {
    element.src = `../assets/img/board/board_${prio.toLowerCase()}.svg`;
  }
};

/**
 * Gets priority image source.
 * @param {string} prio - Priority name.
 * @returns {string} Image source.
 */
const getPriorityImageSrc = (prio) => {
  const lowerPrio = prio.toLowerCase();
  const images = {
    urgent: "../assets/img/board/board_urgent.svg",
    medium: "../assets/img/board/board_medium.svg",
    low: "../assets/img/board/board_low.svg",
  };
  return images[lowerPrio] || "";
};

/**
 * Sets subtask counter.
 * @param {number} i - Task index.
 * @param {Object} task - Task object.
 */
const setSubtaskCounter = (i, task) => {
  const element = document.getElementById(`counterOfTasks${i}`);
  if (!element || !task.subtasks) return;
  element.innerHTML = task.subtasks.length;
};

/**
 * Fills task values in DOM.
 * @param {number} i - Task index.
 */
const fillValue = (i) => {
  const task = user.tasks[i];
  if (!task) return;
  setTaskCategory(i, task);
  setTaskTitleDescription(i, task);
  setTaskPriorityImage(i, task);
  setSubtaskCounter(i, task);
  updateTaskProgressBar(i);
  renderAssignedSignatures(i);
};

window.openTask = openTask;
window.countFinishedSubtasks = countFinishedSubtasks;
window.calculateProgressPercent = calculateProgressPercent;
window.updateProgressBarElements = updateProgressBarElements;
window.showProgressContainer = showProgressContainer;
window.updateTaskProgressBar = updateTaskProgressBar;
window.renderAssignedUserIcon = renderAssignedUserIcon;
window.removeLastIconFromBar = removeLastIconFromBar;
window.addMoreAssignedIndicator = addMoreAssignedIndicator;
window.renderAssignedSignatures = renderAssignedSignatures;
window.getCategoryColor = getCategoryColor;
window.setTaskCategory = setTaskCategory;
window.setTaskTitleDescription = setTaskTitleDescription;
window.setTaskPriorityImage = setTaskPriorityImage;
window.setSubtaskCounter = setSubtaskCounter;
window.fillValue = fillValue;
