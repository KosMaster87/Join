/**
 * @fileoverview Board UI helper functions.
 * Handles UI state management and visual interactions.
 * @module board-ui-helpers
 */

/**
 * Adds border to contact input.
 */
const addContactInputBorder = () => {
  document
    .getElementById(`contactSelectContainer`)
    .classList.add("borderColor");
};

/**
 * Clears subtask input field.
 */
const clearSubtaskInput = () => {
  const input = document.getElementById(`subTaskInputfieldText`);
  input.value = "";
  const container = document.getElementById(`subTaskInputfieldMenu`);
  container.innerHTML = `<img src="../assets/img/add_task/task_add.svg" />`;
  document
    .getElementById(`subTaskInputContainer`)
    .classList.remove("borderColor");
};

/**
 * Locks board scroll.
 */
const lockBoardScroll = () => {
  const board = document.querySelector(".boardMainContainer");
  if (board) board.style.overflow = "hidden";
};

/**
 * Unlocks board scroll.
 */
const unlockBoardScroll = () => {
  const board = document.querySelector(".boardMainContainer");
  if (board) board.style.overflow = "auto";
};

/**
 * Triggers body click after delay.
 */
const triggerDelayedBodyClick = () => {
  setTimeout(() => document.body.click(), 0);
};

/**
 * Checks if container is empty.
 * @param {string} containerId - Container ID.
 * @returns {boolean} True if empty.
 */
const isContainerEmpty = (containerId) => {
  const container = document.getElementById(containerId);
  return container && container.innerHTML.trim() === "";
};

/**
 * Fills empty container with message.
 * @param {string} containerId - Container ID.
 * @param {string} statusText - Status text to display.
 */
const fillEmptyContainer = (containerId, statusText) => {
  const container = document.getElementById(containerId);
  if (container) container.innerHTML = noTasksReturn(statusText);
};

/**
 * Checks and fills empty task containers.
 */
const checkNoFilledTasks = () => {
  const containers = [
    { id: "TodoMainContainer", status: "To do" },
    { id: "progressMainContainer", status: "In progress" },
    { id: "awaitMainContainer", status: "Await feedback" },
    { id: "doneMainContainer", status: "Done" },
  ];
  containers.forEach(({ id, status }) => {
    if (isContainerEmpty(id)) fillEmptyContainer(id, status);
  });
};

window.addContactInputBorder = addContactInputBorder;
window.clearSubtaskInput = clearSubtaskInput;
window.lockBoardScroll = lockBoardScroll;
window.unlockBoardScroll = unlockBoardScroll;
window.triggerDelayedBodyClick = triggerDelayedBodyClick;
window.isContainerEmpty = isContainerEmpty;
window.fillEmptyContainer = fillEmptyContainer;
window.checkNoFilledTasks = checkNoFilledTasks;
window.clearSubtaskInput = clearSubtaskInput;
window.lockBoardScroll = lockBoardScroll;
window.unlockBoardScroll = unlockBoardScroll;
window.triggerDelayedBodyClick = triggerDelayedBodyClick;
