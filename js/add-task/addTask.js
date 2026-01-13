/**
 * @fileoverview Task creation orchestration module.
 *
 * @description
 * Main entry point for task creation page. Coordinates initialization,
 * state management, and delegates to specialized core modules.
 *
 * Architecture:
 * - Orchestrates initialization flow
 * - Manages global state variables
 * - Delegates to core modules for specific functionality
 *
 * @module addTask
 * @requires add-task-operations
 * @requires add-task-priority
 * @requires add-task-validation
 * @requires add-task-category
 * @requires add-task-subtasks
 * @requires add-task-ui
 * @requires shared/task-helpers
 */

window.selectedTitle = "";
window.selectedDescription = "";
window.selectedAssignedTo = [];
window.selectedDueDate = "";
window.selectedPrio = "";
window.selectedCategory = "";
window.subtasks = [];
window.statusInfo = "to-do";
window.mobilVersion = false;
window.contacts = [];

/**
 * Initializes the task creation page by loading required resources.
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
const initAddTask = async () => {
  await loadPageResources();
  initializePageState();
  window.setupEventListeners();
};

/**
 * Loads required page resources.
 * @returns {Promise<void>}
 */
const loadPageResources = async () => {
  await includeHTML();
  await loadUsersAndCurrentUser();
  createUserSignatureIcon();
  setActiveLink("navAddTask");
};

/**
 * Initializes page state and variables.
 */
const initializePageState = () => {
  window.checkWidth();
  window.contacts = user.contacts || [];
  window.setTaskStatus();
  const prioMediumContainer = document.getElementById("prioMediumContainer");
  if (prioMediumContainer) window.whatsPrio(prioMediumContainer);
};
