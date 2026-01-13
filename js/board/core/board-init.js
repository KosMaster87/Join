/**
 * @fileoverview Board initialization and task loading.
 *
 * @description
 * Handles board initialization, session management, and initial task loading
 * across all status columns.
 *
 * @module board/core/board-init
 */

/**
 * Initializes board view.
 * Sets up HTML, navigation, user data and loads tasks.
 */
const initBoard = async () => {
  await includeHTML();
  setActiveLink("navBoard");
  await loadUsersAndCurrentUser();
  createUserSignatureIcon();
  loadTasks();
  preparePopupEvent();
  checkAndOpenTaskFromSummary();
};

/**
 * Checks if user has valid tasks array.
 * @returns {boolean} True if tasks exist and are array.
 */
const hasValidTasks = () => user.tasks && Array.isArray(user.tasks);

/**
 * Renders todo tasks.
 */
const renderTodoTasks = () => {
  fillTodo();
  loadProgressTasks();
};

/**
 * Renders progress tasks.
 */
const loadProgressTasks = () => {
  fillProgress();
  loadAwaitTasks();
};

/**
 * Renders await tasks.
 */
const loadAwaitTasks = () => {
  fillAwait();
  loadDoneTasks();
};

/**
 * Renders done tasks.
 */
const loadDoneTasks = () => {
  fillDone();
  checkNoFilledTasks();
};

/**
 * Loads and renders all tasks by status.
 */
const loadTasks = () => {
  if (hasValidTasks()) {
    renderTodoTasks();
  }
};

/**
 * Checks if task should be opened from summary navigation.
 */
const checkAndOpenTaskFromSummary = () => {
  const taskIndexToOpen = sessionStorage.getItem("openTaskIndex");
  if (taskIndexToOpen !== null) {
    sessionStorage.removeItem("openTaskIndex");
    setTimeout(() => {
      openTask(parseInt(taskIndexToOpen));
    }, 300);
  }
};

window.initBoard = initBoard;
window.loadTasks = loadTasks;
