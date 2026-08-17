/**
 * @fileoverview Form validation for task creation.
 *
 * @description
 * Handles validation of required fields (title, date, category) with error display.
 * Provides validation state checking and error message management.
 *
 * @module add-task-validation
 */

/**
 * Validates all required form fields.
 */
window.validateAllFields = () => {
  inputAbfrage();
  dueDateRequired();
  categoryRequired();
  const description = document.getElementById("descriptionInput");
  if (description) window.selectedDescription = description.value;
};

/**
 * Checks if all required fields are valid.
 * @returns {boolean} - True if all fields are valid.
 */
window.areAllFieldsValid = () => {
  return (
    window.selectedCategory !== "" && window.selectedDueDate !== "" && window.selectedTitle !== ""
  );
};

/**
 * Checks if the title input field is filled.
 */
const inputAbfrage = () => {
  const inputfield = document.getElementById("titelInputContainer");
  const inputRequired = document.getElementById("inputRequiredContainer");

  if (!inputfield || !inputRequired) return;

  if (inputfield.value.trim() === "") {
    showTitleError(inputfield, inputRequired);
  } else {
    clearTitleError(inputfield, inputRequired);
  }
};

/**
 * Shows title validation error.
 * @param {HTMLElement} inputfield - The input field element.
 * @param {HTMLElement} inputRequired - The error message element.
 */
const showTitleError = (inputfield, inputRequired) => {
  inputfield.classList.add("requiredBorder");
  inputRequired.innerHTML = "This field is required";
};

/**
 * Clears title validation error and sets selected title.
 * @param {HTMLElement} inputfield - The input field element.
 * @param {HTMLElement} inputRequired - The error message element.
 */
const clearTitleError = (inputfield, inputRequired) => {
  window.selectedTitle = inputfield.value;
  inputfield.classList.remove("requiredBorder");
  inputRequired.innerHTML = "";
};

/**
 * Checks if the due date input field is filled.
 */
const dueDateRequired = () => {
  const inputfield = document.getElementById("dueDateInputContainer");
  const inputRequired = document.getElementById("dueDateRequiredContainer");

  if (!inputfield || !inputRequired) return;

  if (inputfield.value.trim() === "") {
    showDateError(inputfield, inputRequired);
  } else {
    clearDateError(inputfield, inputRequired);
  }
};

/**
 * Shows date validation error.
 * @param {HTMLElement} inputfield - The input field element.
 * @param {HTMLElement} inputRequired - The error message element.
 */
const showDateError = (inputfield, inputRequired) => {
  inputfield.classList.add("requiredBorder");
  inputRequired.innerHTML = "This field is required";
};

/**
 * Clears date validation error and sets selected date.
 * @param {HTMLElement} inputfield - The input field element.
 * @param {HTMLElement} inputRequired - The error message element.
 */
const clearDateError = (inputfield, inputRequired) => {
  window.selectedDueDate = inputfield.value;
  inputRequired.innerHTML = "";
  inputfield.classList.remove("requiredBorder");
};

/**
 * Checks if the category input field contains a valid value (either 'Technical Task' or 'User Story').
 * @returns {boolean} `true` if the category is valid, otherwise `false`.
 */
window.checkCategory = () => {
  const inputfield = document.getElementById("categoryText");
  if (!inputfield) return false;

  const content = inputfield.textContent || inputfield.innerText;
  return content.trim() === "Technical Task" || content.trim() === "User Story";
};

/**
 * Checks if the category field is filled correctly.
 */
const categoryRequired = () => {
  const border = document.getElementById("categorySelectContainer");
  const inputRequired = document.getElementById("categoryRequiredContainer");

  if (!border || !inputRequired) return;

  const isCategoryValid = window.checkCategory();

  isCategoryValid
    ? clearCategoryError(border, inputRequired)
    : showCategoryError(border, inputRequired);
};

/**
 * Shows category validation error.
 * @param {HTMLElement} border - The border container element.
 * @param {HTMLElement} inputRequired - The error message element.
 */
const showCategoryError = (border, inputRequired) => {
  border.classList.add("requiredBorder");
  inputRequired.innerHTML = "This field is required";
};

/**
 * Clears category validation error.
 * @param {HTMLElement} border - The border container element.
 * @param {HTMLElement} inputRequired - The error message element.
 */
const clearCategoryError = (border, inputRequired) => {
  inputRequired.innerHTML = "";
  border.classList.remove("requiredBorder");
};
