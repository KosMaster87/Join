/**
 * @fileoverview Subtask management for task creation.
 *
 * @description
 * Handles subtask creation, editing, deletion, and rendering.
 * Manages subtask input field interactions and menu changes.
 *
 * @module add-task-subtasks
 */

/**
 * Changes the subtask input field's menu appearance.
 */
window.changeMenu = () => {
  const container = document.getElementById("subTaskInputfieldMenu");
  if (!container) return;

  container.innerHTML = window.changeMenuReturn();
  const border = document.getElementById("subTaskInputContainer");
  if (border) border.classList.add("borderColor");
};

/**
 * Adds a subtask to the task list.
 */
window.addSubtask = () => {
  const subtasksInput = document.getElementById("subTaskInputfieldText");

  if (subtasksInput && subtasksInput.value) {
    const newSubtask = { name: subtasksInput.value, done: false };
    window.subtasks.push(newSubtask);
    renderSubtasks();
    window.clearSubtaskInputfield();
  }
};

/**
 * Renders all the subtasks in the container.
 */
const renderSubtasks = () => {
  const subtasksList = document.getElementById("subTasksContainer");
  if (!subtasksList) return;

  subtasksList.innerHTML = "";

  for (let i = 0; i < window.subtasks.length; i++) {
    subtasksList.innerHTML += window.renderSubtasksReturn(window.subtasks, i);
  }
};

/**
 * Edits the selected subtask by changing the text content to an input field.
 * @param {number} i - The index of the subtask being edited.
 */
window.editSubtask = (i) => {
  const textElement = document.getElementById("subTaskTextfield" + i);
  const content = document.getElementById("subtask" + i);

  if (!textElement || !content) return;

  const text = textElement.innerText;
  content.innerHTML = window.editSubtaskReturn(window.subtasks, i);

  const editInput = document.getElementById(`editSubtask${i}`);
  if (editInput) editInput.value = text;
};

/**
 * Finalizes the editing of a subtask and updates the task list.
 * @param {number} i - The index of the subtask being edited.
 */
window.editSubtaskDone = (i) => {
  const content = document.getElementById("editSubtask" + i);
  if (!content) return;

  content.value.length > 0 ? updateSubtask(i, content.value) : window.deleteSubtask(i);
};

/**
 * Updates subtask name.
 * @param {number} i - The subtask index.
 * @param {string} content - The new subtask name.
 */
const updateSubtask = (i, content) => {
  window.subtasks[i].name = content;
  renderSubtasks();
};

/**
 * Deletes a subtask from the task list.
 * @param {number} i - The index of the subtask being deleted.
 */
window.deleteSubtask = (i) => {
  window.subtasks.splice(i, 1);
  renderSubtasks();
};
