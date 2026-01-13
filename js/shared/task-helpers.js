/**
 * @fileoverview Shared task utilities and helper functions.
 *
 * @description
 * Common utilities for task management including date formatting,
 * button state management, and shared helper functions.
 *
 * @module task-helpers
 */

/**
 * Sets the minimum date for the due date input field to today's date.
 */
window.setMinDate = () => {
  const today = getTodayDateString();
  const dateInput = document.getElementById("dueDateInputContainer");
  if (dateInput) dateInput.min = today;
};

/**
 * Gets today's date in YYYY-MM-DD format.
 * @returns {string} - Today's date string.
 */
const getTodayDateString = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

/**
 * Disables task creation buttons.
 */
window.disableTaskButtons = () => {
  const createBtn = document.getElementById("createTaskButton");
  const clearBtn = document.getElementById("clearTaskButton");

  if (createBtn) {
    createBtn.style.opacity = "0.5";
    createBtn.style.pointerEvents = "none";
    createBtn.style.cursor = "not-allowed";
  }
  if (clearBtn) {
    clearBtn.style.opacity = "0.5";
    clearBtn.style.pointerEvents = "none";
    clearBtn.style.cursor = "not-allowed";
  }
};

/**
 * Enables task creation buttons.
 */
window.enableTaskButtons = () => {
  const createBtn = document.getElementById("createTaskButton");
  const clearBtn = document.getElementById("clearTaskButton");

  if (createBtn) {
    createBtn.style.opacity = "1";
    createBtn.style.pointerEvents = "auto";
    createBtn.style.cursor = "pointer";
  }
  if (clearBtn) {
    clearBtn.style.opacity = "1";
    clearBtn.style.pointerEvents = "auto";
    clearBtn.style.cursor = "pointer";
  }
};

/**
 * Checks the screen width and determines mobile version.
 * @returns {number} - The screen width in pixels.
 */
window.getScreenWidth = () => {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
};
