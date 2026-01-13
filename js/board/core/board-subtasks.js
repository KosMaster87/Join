/**
 * @fileoverview Board subtask management.
 *
 * @description
 * Handles subtask creation, editing, deletion, and rendering for board tasks.
 *
 * @module board/core/board-subtasks
 */

/**
 * Changes subtask to edit mode.
 * @param {number} i - Task index.
 * @param {number} s - Subtask index.
 */
const editBoardSubtask = (i, s) => {
  const task = document.getElementById("subtask" + s);
  task.innerHTML = "";
  task.innerHTML = editBoardSubtaskReturn(user.tasks[i].subtasks[s].name, s, i);
};

/**
 * Saves edited subtask.
 * @param {number} i - Task index.
 * @param {number} s - Subtask index.
 */
const editBoardSubtaskDone = async (i, s) => {
  const content = document.getElementById("editBoardSubtask" + s).value;
  if (content.length > 0) {
    user.tasks[i].subtasks[s].name = content;
    await savedUsersInBackend();
    renderBoardSubtasks(i);
  } else {
    deleteSubtask(s);
  }
  await savedUsersInBackend();
};

/**
 * Renders all subtasks for task.
 * @param {number} i - Task index.
 */
const renderBoardSubtasks = (i) => {
  const subtasksList = document.getElementById("subTasksContainer");
  subtasksList.innerHTML = "";
  for (let l = 0; l < user.tasks[i].subtasks.length; l++) {
    subtasksList.innerHTML += renderBaordSubtasksReturn(i, l);
  }
};

/**
 * Creates new subtask object.
 * @param {string} name - Subtask name.
 * @returns {Object} New subtask.
 */
const createNewSubtask = (name) => ({
  name: name,
  done: false,
});

/**
 * Gets subtask input value.
 * @returns {string} Input value.
 */
const getSubtaskInput = () => {
  return document.getElementById("subTaskInputfieldText").value;
};

/**
 * Adds new subtask to task.
 * @param {number} i - Task index.
 */
const addBoardSubtask = async (i) => {
  const input = getSubtaskInput();
  if (input) {
    disableSubtaskButtons();

    const newSubtask = createNewSubtask(input);
    user.tasks[i].subtasks.push(newSubtask);
    await savedUsersInBackend();
    clearSubtaskInputfield();
    renderBoardSubtasks(i);

    enableSubtaskButtons();
  }
};

/**
 * Disables subtask action buttons.
 */
const disableSubtaskButtons = () => {
  const menu = document.getElementById("subTaskInputfieldMenu");
  if (!menu) return;

  const buttons = menu.querySelectorAll("img.arrow");
  buttons.forEach((btn) => {
    btn.style.pointerEvents = "none";
    btn.style.opacity = "0.5";
  });
};

/**
 * Enables subtask action buttons.
 */
const enableSubtaskButtons = () => {
  const menu = document.getElementById("subTaskInputfieldMenu");
  if (!menu) return;

  const buttons = menu.querySelectorAll("img.arrow");
  buttons.forEach((btn) => {
    btn.style.pointerEvents = "auto";
    btn.style.opacity = "1";
  });
};
/**
 * Clears subtask input field.
 */
const clearSubtaskInputfield = () => {
  clearSubtaskInput();
};
/**
 * Changes subtask menu styling.
 * @param {number} i - Task index.
 */
const changeBoardMenu = (i) => {
  const container = document.getElementById(`subTaskInputfieldMenu`);
  container.innerHTML = changeBoardMenuReturn(i);
  addSubtaskInputBorder();
};

/**
 * Adds border to subtask input container.
 */
const addSubtaskInputBorder = () => {
  const border = document.getElementById(`subTaskInputContainer`);
  if (border) border.classList.add("borderColor");
};

/**
 * Deletes subtask from task.
 * @param {number} i - Task index.
 * @param {number} s - Subtask index.
 */
const deleteBoardSubtask = async (i, s) => {
  if (user.tasks[i]?.subtasks?.[s]) {
    user.tasks[i].subtasks.splice(s, 1);
    renderBoardSubtasks(i);
    await savedUsersInBackend();
    renderBoardSubtasks(i);
  }
};

window.getSubtaskInput = getSubtaskInput;
window.createNewSubtask = createNewSubtask;
window.renderBoardSubtasks = renderBoardSubtasks;
window.addBoardSubtask = addBoardSubtask;
window.clearSubtaskInputfield = clearSubtaskInputfield;
window.changeBoardMenu = changeBoardMenu;
window.addSubtaskInputBorder = addSubtaskInputBorder;
window.deleteBoardSubtask = deleteBoardSubtask;
window.addBoardSubtask = addBoardSubtask;
window.editBoardSubtask = editBoardSubtask;
window.editBoardSubtaskDone = editBoardSubtaskDone;
window.deleteBoardSubtask = deleteBoardSubtask;
