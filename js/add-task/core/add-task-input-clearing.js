/**
 * @fileoverview Input field clearing and reset functionality.
 *
 * @description
 * Handles clearing of all form inputs, resetting variables,
 * and managing subtask input field state.
 *
 * @module add-task-input-clearing
 */

/**
 * Clears all input fields.
 */
window.clearInputs = () => {
  if (window.isSaving) {
    setTimeout(window.clearInputs, 100);
    return;
  }
  resetAllInputFields();
  clearVariables();
};

/**
 * Resets all form input fields to empty.
 */
const resetAllInputFields = () => {
  const titleInput = document.getElementById("titelInputContainer");
  const descriptionInput = document.getElementById("descriptionInput");
  const dueDateInput = document.getElementById("dueDateInputContainer");
  const assignedInput = document.getElementById("assignedToContainer");
  const contactIcons = document.getElementById("contactListIcons");
  const subtasksContainer = document.getElementById("subTasksContainer");
  const categoryText = document.getElementById("categoryText");

  if (titleInput) titleInput.value = "";
  if (descriptionInput) descriptionInput.value = "";
  if (dueDateInput) dueDateInput.value = "";
  if (assignedInput) assignedInput.value = "";
  if (contactIcons) contactIcons.innerHTML = "";
  if (subtasksContainer) subtasksContainer.innerHTML = "";
  if (categoryText) categoryText.innerHTML = "Select task category";
};

/**
 * Clears stored variables and removes priority selection colors.
 */
const clearVariables = () => {
  resetTaskVariables();

  if (typeof window.removePrio === "function") {
    window.removePrio();
  }
  if (typeof window.removeWhiteImg === "function") {
    window.removeWhiteImg();
  }
};

/**
 * Resets all task-related variables.
 */
const resetTaskVariables = () => {
  window.selectedTitle = "";
  window.selectedDescription = "";
  window.selectedAssignedTo = [];
  window.selectedDueDate = "";
  window.selectedPrio = "";
  window.selectedCategory = "";
  window.subtasks = [];
};

/**
 * Clears the value from the subtask input field.
 */
window.clearSubtaskInputfield = () => {
  const input = document.getElementById("subTaskInputfieldText");
  if (!input) return;

  input.value = "";
  resetSubtaskMenu();
  removeSubtaskBorder();
};

/**
 * Resets subtask menu to default state.
 */
const resetSubtaskMenu = () => {
  const container = document.getElementById("subTaskInputfieldMenu");
  if (container) {
    container.innerHTML = '<img src="../assets/img/add_task/task_add.svg" />';
  }
};

/**
 * Removes border from subtask container.
 */
const removeSubtaskBorder = () => {
  const border = document.getElementById("subTaskInputContainer");
  if (border) border.classList.remove("borderColor");
};
