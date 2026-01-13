/**
 * @fileoverview Contact validation module.
 * Handles all form validation logic for contact creation and editing.
 * @module contact-validation
 */

/**
 * Validates email format using regex.
 * @param {string} email - Email to validate.
 * @returns {boolean} True if valid email format.
 */
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Validates phone format using regex.
 * Allows digits, spaces, parentheses, plus, and minus.
 * @param {string} phone - Phone to validate.
 * @returns {boolean} True if valid phone format.
 */
const isValidPhoneFormat = (phone) => /^[\d ()+-]+$/.test(phone);

/**
 * Shows name validation error.
 * @param {string} siteInitial - Template identifier ("add" or "edit").
 */
const showNameError = (siteInitial) => {
  showInputMessage(siteInitial + "ContactMessageName", "Please enter a name");
  removeFocusBorder(siteInitial, "Name");
  showAlertBorder(siteInitial + "ContactInputContainerName");
};

/**
 * Clears name validation error.
 * @param {string} siteInitial - Template identifier.
 */
const clearNameError = (siteInitial) => {
  resetInputMessage(siteInitial + "ContactMessageName");
  resetAlertBorder(siteInitial + "ContactInputContainerName");
};

/**
 * Validates contact name input.
 * Shows error if name is empty.
 * @param {string} siteInitial - Template identifier.
 * @param {string} name - Contact name to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
const checkInputName = (siteInitial, name) => {
  if (name === "") {
    showNameError(siteInitial);
    return false;
  }
  clearNameError(siteInitial);
  return true;
};

/**
 * Shows email validation error.
 * @param {string} siteInitial - Template identifier.
 */
const showEmailError = (siteInitial) => {
  showInputMessage(
    siteInitial + "ContactMessageEmail",
    "Please enter a valid e-mail address"
  );
  removeFocusBorder(siteInitial, "Email");
  showAlertBorder(siteInitial + "ContactInputContainerEmail");
};

/**
 * Clears email validation error.
 * @param {string} siteInitial - Template identifier.
 */
const clearEmailError = (siteInitial) => {
  resetInputMessage(siteInitial + "ContactMessageEmail");
  resetAlertBorder(siteInitial + "ContactInputContainerEmail");
};

/**
 * Validates contact email input.
 * Empty email is valid, invalid format shows error.
 * @param {string} siteInitial - Template identifier.
 * @param {string} email - Email to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
const checkInputEmail = (siteInitial, email) => {
  if (email === "") return true;
  if (!validateEmail(email)) {
    showEmailError(siteInitial);
    return false;
  }
  clearEmailError(siteInitial);
  return true;
};

/**
 * Shows phone validation error.
 * @param {string} siteInitial - Template identifier.
 */
const showPhoneError = (siteInitial) => {
  removeFocusBorder(siteInitial, "Phone");
  showInputMessage(
    siteInitial + "ContactMessagePhone",
    "Phone number ist not valid"
  );
  showAlertBorder(siteInitial + "ContactInputContainerPhone");
};

/**
 * Clears phone validation error.
 * @param {string} siteInitial - Template identifier.
 */
const clearPhoneError = (siteInitial) => {
  resetInputMessage(siteInitial + "ContactMessagePhone");
  resetAlertBorder(siteInitial + "ContactInputContainerPhone");
};

/**
 * Validates contact phone input.
 * Empty phone is valid, invalid format shows error.
 * @param {string} siteInitial - Template identifier.
 * @param {string} phone - Phone to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
const checkInputPhone = (siteInitial, phone) => {
  if (phone === "") return true;
  if (!isValidPhoneFormat(phone)) {
    showPhoneError(siteInitial);
    return false;
  }
  clearPhoneError(siteInitial);
  return true;
};

/**
 * Checks if all input fields are valid.
 * @param {string} siteInitial - Template identifier.
 * @param {string} name - Contact name.
 * @param {string} email - Contact email.
 * @param {string} phone - Contact phone.
 * @returns {boolean} True if all fields valid.
 */
const areAllFieldsValid = (siteInitial, name, email, phone) =>
  checkInputName(siteInitial, name) &&
  checkInputEmail(siteInitial, email) &&
  checkInputPhone(siteInitial, phone);

/**
 * Validates all contact input fields.
 * Main validation entry point.
 * @param {string} siteInitial - Template identifier.
 * @param {string} name - Contact name.
 * @param {string} email - Contact email.
 * @param {string} phone - Contact phone.
 * @returns {boolean} True if all valid, false otherwise.
 */
const checkAllInputFields = (siteInitial, name, email, phone) =>
  areAllFieldsValid(siteInitial, name, email, phone);

window.validateEmail = validateEmail;
window.isValidPhoneFormat = isValidPhoneFormat;
window.checkInputName = checkInputName;
window.checkInputEmail = checkInputEmail;
window.checkInputPhone = checkInputPhone;
window.checkAllInputFields = checkAllInputFields;
