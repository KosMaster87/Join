/**
 * @fileoverview Form state and button visibility management.
 *
 * @description
 * Handles form validation state checking and dynamic visibility
 * of the Create Task button based on required field completion.
 *
 * @module add-task-form-state
 */

/**
 * Checks if required fields have values and displays the create task button if valid.
 */
window.checkInputs = () => {
  if (window.mobilVersion === false) {
    const isValid = areRequiredFieldsValid();
    toggleCreateTaskButton(isValid);
  }
};

/**
 * Checks if all required fields are valid.
 * @returns {boolean} - True if all required fields are filled.
 */
const areRequiredFieldsValid = () => {
  const dueDateInput = document.getElementById("dueDateInputContainer");
  const titleInput = document.getElementById("titelInputContainer");

  if (!dueDateInput || !titleInput) return false;

  const dueDateValue = dueDateInput.value;
  const titleValue = titleInput.value;
  const isCategoryValid =
    typeof window.checkCategory === "function" ? window.checkCategory() : false;

  return dueDateValue.trim() !== "" && titleValue.trim() !== "" && isCategoryValid;
};

/**
 * Toggles create task button visibility.
 * @param {boolean} isValid - Whether form is valid.
 */
const toggleCreateTaskButton = (isValid) => {
  const createTaskButton = document.getElementById("createTaskButton");
  const placeholder = document.getElementById("placeholder");

  if (createTaskButton) {
    createTaskButton.style.display = isValid ? "block" : "none";
  }
  if (placeholder) {
    placeholder.style.display = isValid ? "none" : "block";
  }
};

/**
 * Creates the footer for the desktop version.
 */
window.footer = () => {
  const content = document.getElementById("taskMainContainer");
  if (content && typeof window.footerReturn === "function") {
    content.innerHTML += window.footerReturn();
  }
};

/**
 * Creates the footer for the mobile version.
 */
window.footerMobile = () => {
  const content = document.getElementById("taskMainContainer");
  if (content && typeof window.footerMobileReturn === "function") {
    content.innerHTML += window.footerMobileReturn();
  }
};
