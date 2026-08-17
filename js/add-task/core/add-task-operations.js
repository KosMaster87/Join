/**
 * @fileoverview Task creation and persistence operations.
 *
 * @description
 * Handles task object creation, validation checks, and Firestore synchronization.
 * Manages the complete task creation flow with isSaving protection.
 *
 * @module add-task-operations
 */

/**
 * Assigns a task to the user by updating the user's task list in the backend and store.
 * @returns {Promise<void>} A promise that resolves when the task is assigned.
 */
window.assignTaskToUser = async () => {
  if (window.isSaving) {
    return;
  }

  ensureUserTasksArray();
  const newTask = createTaskObject();
  store.addTask(newTask);
  await saveTaskToFirestore();
};

/**
 * Ensures user has a tasks array.
 */
const ensureUserTasksArray = () => {
  if (!user.tasks) user.tasks = [];
};

/**
 * Creates a task object from selected values.
 * @returns {Object} - The task object.
 */
const createTaskObject = () => ({
  status: window.statusInfo,
  title: window.selectedTitle,
  description: window.selectedDescription,
  assignedTo: window.selectedAssignedTo,
  dueDate: window.selectedDueDate,
  prio: window.selectedPrio,
  category: window.selectedCategory,
  subtasks: window.subtasks,
});

/**
 * Saves task to Firestore and navigates to board.
 * @returns {Promise<void>}
 */
const saveTaskToFirestore = async () => {
  const collection = user.isGuest ? "guests" : "users";

  if (typeof window.setIsSaving === "function") {
    window.setIsSaving(true);
  }

  try {
    await setItem(collection, user.id, { tasks: user.tasks });
    await includeContentHTML("board");
  } finally {
    if (typeof window.setIsSaving === "function") {
      window.setIsSaving(false);
    }
  }
};

/**
 * Checks if the required fields are filled before assigning a task to the user.
 * @returns {Promise<void>} A promise that resolves when the required fields are validated.
 */
window.requiredFields = async () => {
  if (window.isSaving) {
    return;
  }

  window.validateAllFields();

  if (window.areAllFieldsValid()) {
    disableAllFormElements();
    window.disableTaskButtons();
    try {
      await window.assignTaskToUser();
    } finally {
      enableAllFormElements();
      window.enableTaskButtons();
    }
  }
};

/**
 * Disables all form input elements and interactive elements.
 */
const disableAllFormElements = () => {
  // Disable all input fields
  const inputs = document.querySelectorAll("#taskMainContainer input, #taskMainContainer textarea");
  inputs.forEach((input) => {
    input.disabled = true;
    input.style.pointerEvents = "none";
    input.style.opacity = "0.6";
  });

  // Disable all clickable divs (priority, category, contacts)
  const clickableContainers = [
    "prioUrgentContainer",
    "prioMediumContainer",
    "prioLowContainer",
    "categorySelectContainer",
    "contactSelectContainer",
    "openerAssignedTo",
  ];

  clickableContainers.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.pointerEvents = "none";
      element.style.opacity = "0.6";
    }
  });

  // Disable subtask menu images
  const subtaskMenu = document.getElementById("subTaskInputfieldMenu");
  if (subtaskMenu) {
    const images = subtaskMenu.querySelectorAll("img");
    images.forEach((img) => {
      img.style.pointerEvents = "none";
      img.style.opacity = "0.6";
    });
  }

  // Disable subtask actions
  const subtaskContainer = document.getElementById("subTasksContainer");
  if (subtaskContainer) {
    const subtaskImages = subtaskContainer.querySelectorAll("img");
    subtaskImages.forEach((img) => {
      img.style.pointerEvents = "none";
      img.style.opacity = "0.6";
    });
  }
};

/**
 * Enables all form input elements and interactive elements.
 */
const enableAllFormElements = () => {
  // Enable all input fields
  const inputs = document.querySelectorAll("#taskMainContainer input, #taskMainContainer textarea");
  inputs.forEach((input) => {
    input.disabled = false;
    input.style.pointerEvents = "auto";
    input.style.opacity = "1";
  });

  // Enable all clickable divs
  const clickableContainers = [
    "prioUrgentContainer",
    "prioMediumContainer",
    "prioLowContainer",
    "categorySelectContainer",
    "contactSelectContainer",
    "openerAssignedTo",
  ];

  clickableContainers.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.pointerEvents = "auto";
      element.style.opacity = "1";
    }
  });

  // Enable subtask menu images
  const subtaskMenu = document.getElementById("subTaskInputfieldMenu");
  if (subtaskMenu) {
    const images = subtaskMenu.querySelectorAll("img");
    images.forEach((img) => {
      img.style.pointerEvents = "auto";
      img.style.opacity = "1";
    });
  }

  // Enable subtask actions
  const subtaskContainer = document.getElementById("subTasksContainer");
  if (subtaskContainer) {
    const subtaskImages = subtaskContainer.querySelectorAll("img");
    subtaskImages.forEach((img) => {
      img.style.pointerEvents = "auto";
      img.style.opacity = "1";
    });
  }
};
