/**
 * @fileoverview Board task operations.
 *
 * @description
 * Handles task operations including opening, closing, deleting, and editing tasks,
 * as well as subtask management and contact selection.
 *
 * @module board/core/board-task-operations
 */

/**
 * Removes opened task and reloads tasks.
 * @param {number} i - Task index.
 */
const removeOpenedTask = (i) => {
  const task = document.getElementById(`popUpMainContainer`);
  const blurr = document.getElementById(`blurrContainer`);
  blurr.remove();
  task.remove();
  document.getElementById(`TodoMainContainer`).innerHTML = "";
  loadTasks();
};

/**
 * Closes currently opened task.
 * @param {number} i - Task index.
 */
const closeOpenTask = async (i) => {
  clearBoardTasksField();
  document.body.style.overflow = "auto";
  removeOpenedTask(i);
};

/**
 * Closes edit task view and reopens task.
 * @param {number} i - Task index.
 */
const closeEditTask = (i) => {
  removeClickListener();
  document.getElementById(`popUpMainContainer`).remove();
  document.getElementById(`blurrContainer`).remove();
  openTask(i);
};

/**
 * Gets task input field values.
 * @param {number} i - Task index.
 * @returns {Object} Input values.
 */
const getTaskInputValues = (i) => ({
  title: document.getElementById(`titelInputContainer`).value,
  description: document.getElementById(`descriptionInput`).value,
  date: document.getElementById(`dueDateInputContainer`).value,
});

/**
 * Updates task with new values.
 * @param {number} i - Task index.
 * @param {Object} values - New values.
 */
const updateTaskWithValues = (i, values) => {
  user.tasks[i].title = values.title;
  user.tasks[i].dueDate = values.date;
  user.tasks[i].description = values.description;
};

/**
 * Updates task status and reloads board.
 * @param {number} i - Task index.
 * @param {string} status - New status.
 */
const updateTaskStatusAndReloadBoard = async (i, status) => {
  user.tasks[i].status = status;
  await savedUsersInBackend();
  clearBoardTasksField();
  loadTasks();
};

/**
 * Disables delete and edit buttons.
 * @param {number} i - Task index.
 */
const disableTaskButtons = (i) => {
  const deleteBtn = document.getElementById(`deleteTaskBtn${i}`);
  const editBtn = document.getElementById(`editTaskBtn${i}`);
  disableButtons(deleteBtn, editBtn);
};

/**
 * Removes task popup and blur overlay.
 */
const removeTaskPopup = () => {
  document.getElementById(`popUpMainContainer`).remove();
  document.getElementById(`blurrContainer`).remove();
  document.body.style.overflow = "auto";
};

/**
 * Deletes task from board and saves to backend.
 * @param {number} i - Task index.
 */
const deleteTaskBoard = async (i) => {
  if (window.isSaving) return;
  window.setIsSaving(true);

  disableTaskButtons(i);

  try {
    user.tasks.splice(i, 1);
    await savedUsersInBackend();
    removeTaskPopup();
    clearBoardTasksField();
    loadTasks();
  } finally {
    window.setIsSaving(false);
  }
};

/**
 * Toggles subtask completion status.
 * @param {number} i - Task index.
 * @param {number} s - Subtask index.
 */
const subtaskFinish = async (i, s) => {
  const imageId = document.getElementById(`popUpSubtaskImage${s}`);
  const currentStatus = user.tasks[i].subtasks[s].done;
  user.tasks[i].subtasks[s].done = !currentStatus;
  imageId.src = currentStatus
    ? "../assets/img/board/board_box.svg"
    : "../assets/img/board/board_box_check.svg";

  await savedUsersInBackend();
  updateTaskProgressBar(i);
};

/**
 * Clears popup main container.
 */
const clearPopupContainer = () => {
  document.getElementById(`popUpMainContainer`).innerHTML = "";
};

/**
 * Checks if desktop view.
 * @returns {boolean} True if desktop view.
 */
const isDesktopView = () => window.innerWidth > 1200;

/**
 * Renders desktop edit layout.
 * @param {number} i - Task index.
 */
const renderDesktopEditLayout = (i) => {
  const container = document.getElementById(`popUpMainContainer`);
  container.innerHTML = editBoardDesktopTaskReturn(i);
  container.classList.remove("openwindow");
};

/**
 * Renders mobile edit layout.
 * @param {number} i - Task index.
 */
const renderMobileEditLayout = (i) => {
  document.getElementById(`popUpMainContainer`).innerHTML =
    editBoardMobileTaskReturn(i);
};

/**
 * Renders edit task layout.
 * @param {number} i - Task index.
 */
const renderEditTaskLayout = (i) => {
  if (isDesktopView()) {
    renderDesktopEditLayout(i);
  } else {
    renderMobileEditLayout(i);
  }
};

/**
 * Sets up contact display visibility.
 */
const setupContactDisplay = () => {
  contactList.style.display = "none";
  contactListIcons.style.display = "block";
};

/**
 * Populates task input fields.
 * @param {Object} task - Task object.
 */
const populateTaskInputs = (task) => {
  document.getElementById(`titelInputContainer`).value = task.title;
  document.getElementById(`descriptionInput`).value = task.description;
  document.getElementById(`dueDateInputContainer`).value = task.dueDate;
};

/**
 * Renders edit subtasks.
 * @param {number} i - Task index.
 * @param {Object} task - Task object.
 */
const renderEditSubtasks = (i, task) => {
  if (!task.subtasks) return;
  task.subtasks.forEach((subtask, s) => {
    document.getElementById(`subTasksContainer`).innerHTML +=
      editBoardTaskReturn(i, s);
  });
};

/**
 * Sets up task editing.
 * @param {number} i - Task index.
 * @param {Object} task - Task object.
 */
const setupTaskEditing = (i, task) => {
  whatsPrio(i, task.prio);
  if (task.assignedTo) selectContacts(i);
};

/**
 * Edits task details in board.
 * @param {number} i - Task index.
 */
const editBoardTask = async (i) => {
  clearPopupContainer();
  renderEditTaskLayout(i);
  setupContactDisplay();

  const task = user.tasks[i];
  if (!task) return;

  populateTaskInputs(task);
  renderEditSubtasks(i, task);
  setupTaskEditing(i, task);
  if (!task.prio) setDefaultPriority(i);

  await savedUsersInBackend();
  loadTaskContacts(i);
  closeListener(i);
};

/**
 * Marks assigned contacts as selected.
 * @param {number} i - Task index.
 */
const selectContacts = (i) => {
  if (!user.tasks[i] || !Array.isArray(user.tasks[i].assignedTo)) return;

  user.contacts.forEach((contact) => {
    contact.selected = false;
  });

  user.tasks[i].assignedTo.forEach((assignedPerson) => {
    const matchingContact = user.contacts.find(
      (contact) => contact.name === assignedPerson.name
    );
    if (matchingContact) matchingContact.selected = true;
  });
};

window.closeOpenTask = closeOpenTask;
window.deleteTaskBoard = deleteTaskBoard;
window.editBoardTask = editBoardTask;
window.subtaskFinish = subtaskFinish;
window.getTaskInputValues = getTaskInputValues;
window.updateTaskWithValues = updateTaskWithValues;
window.updateTaskStatusAndReloadBoard = updateTaskStatusAndReloadBoard;
