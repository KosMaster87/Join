/**
 * @fileoverview Contact UI management module.
 * Handles form field resets, borders, focus states, and validation messages.
 * @module contact-ui
 */

/**
 * Resets all input field values.
 * @param {string} siteInitial - Template identifier ("add" or "edit").
 */
const resetInputFields = (siteInitial) => {
  document.getElementById(siteInitial + "ContactInputName").value = "";
  document.getElementById(siteInitial + "ContactInputEmail").value = "";
  document.getElementById(siteInitial + "ContactInputPhone").value = "";
};

/**
 * Displays validation message.
 * @param {string} inputField - Input field ID.
 * @param {string} message - Message to display.
 */
const showInputMessage = (inputField, message) => {
  document.getElementById(inputField).innerText = message;
};

/**
 * Clears validation message.
 * @param {string} inputField - Input field ID.
 */
const resetInputMessage = (inputField) => {
  document.getElementById(inputField).innerText = "";
};

/**
 * Resets all validation messages.
 * @param {string} siteInitial - Template identifier.
 */
const resetAllInputMessages = (siteInitial) => {
  resetInputMessage(siteInitial + "ContactMessageName");
  resetInputMessage(siteInitial + "ContactMessageEmail");
  resetInputMessage(siteInitial + "ContactMessagePhone");
};

/**
 * Shows alert border on input container.
 * @param {string} inputContainer - Container ID.
 */
const showAlertBorder = (inputContainer) => {
  document.getElementById(inputContainer).classList.add("alertBorder");
};

/**
 * Removes alert border from input container.
 * @param {string} inputContainer - Container ID.
 */
const resetAlertBorder = (inputContainer) => {
  document.getElementById(inputContainer).classList.remove("alertBorder");
};

/**
 * Resets all alert borders.
 * @param {string} siteInitial - Template identifier.
 */
const resetAllAlertBorders = (siteInitial) => {
  resetAlertBorder(siteInitial + "ContactInputContainerName");
  resetAlertBorder(siteInitial + "ContactInputContainerEmail");
  resetAlertBorder(siteInitial + "ContactInputContainerPhone");
};

/**
 * Gets input container element.
 * @param {string} siteInitial - Template identifier.
 * @param {string} containerId - Container ID.
 * @returns {HTMLElement} Input container element.
 */
const getInputContainer = (siteInitial, containerId) =>
  document.getElementById(siteInitial + "ContactInputContainer" + containerId);

/**
 * Adds focus border to input field.
 * @param {string} siteInitial - Template identifier.
 * @param {string} containerId - Container ID.
 */
const addFocusBorder = (siteInitial, containerId) => {
  const input = getInputContainer(siteInitial, containerId);
  if (input) input.classList.add("focus");
};

/**
 * Removes focus border from input field.
 * @param {string} siteInitial - Template identifier.
 * @param {string} containerId - Container ID.
 */
const removeFocusBorder = (siteInitial, containerId) => {
  const input = getInputContainer(siteInitial, containerId);
  if (input && input.classList.contains("focus")) {
    input.classList.remove("focus");
  }
};

/**
 * Manages focus borders on input fields.
 * Adds focus to one field, removes from others.
 * @param {string} siteInitial - Template identifier.
 * @param {string} idFocus - Field to focus.
 * @param {string} idRemoveFocus - First field to unfocus.
 * @param {string} idDeleteFocus - Second field to unfocus.
 */
const editFocusBorder = (siteInitial, idFocus, idRemoveFocus, idDeleteFocus) => {
  addFocusBorder(siteInitial, idFocus);
  removeFocusBorder(siteInitial, idRemoveFocus);
  removeFocusBorder(siteInitial, idDeleteFocus);
};

/**
 * Sets element property if input exists.
 * @param {string} id - Element ID.
 * @param {string} property - Property to set.
 * @param {string} value - Value to set.
 */
const setElementProperty = (id, property, value) => {
  const element = document.getElementById(id);
  if (element && value) {
    element[property] = value;
  }
};

window.resetInputFields = resetInputFields;
window.showInputMessage = showInputMessage;
window.resetInputMessage = resetInputMessage;
window.resetAllInputMessages = resetAllInputMessages;
window.showAlertBorder = showAlertBorder;
window.resetAlertBorder = resetAlertBorder;
window.resetAllAlertBorders = resetAllAlertBorders;
window.addFocusBorder = addFocusBorder;
window.removeFocusBorder = removeFocusBorder;
window.editFocusBorder = editFocusBorder;
window.setElementProperty = setElementProperty;
