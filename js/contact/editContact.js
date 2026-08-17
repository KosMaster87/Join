/**
 * @fileoverview Contact editing module.
 * Handles editing existing contacts and managing edit form state.
 * @description This module provides edit-specific orchestration.
 * CRUD operations moved to contact-operations.js
 * Navigation logic moved to contact-navigation.js
 * @module editContact
 */

/**
 * Initializes the contact edit interface.
 * Loads and populates form with current contact data.
 */
const initEditContact = async () => {
  enableEditButtons();
  await initializeAllVariables();
  updateEditSaveButtonState();
  attachEditInputListeners();
};

/**
 * Gets contact by ID from user contacts.
 * @returns {Object|null} Contact object or null if not found.
 */
const getContactById = () => findContactById(currentContactId);

/**
 * Checks if edit form can be saved.
 * @returns {boolean} True if name and (email or phone) are filled.
 */
const canSaveEdit = () => {
  const name = document.getElementById("editContactInputName").value.trim();
  const email = document.getElementById("editContactInputEmail").value.trim();
  const phone = document.getElementById("editContactInputPhone").value.trim();
  return name.length > 0 && (email.length > 0 || phone.length > 0);
};

/**
 * Sets save button state based on validity.
 * @param {HTMLElement} btn - Button element.
 * @param {boolean} isValid - Whether input is valid.
 */
const setSaveButtonState = (btn, isValid) => {
  if (!btn) return;
  if (isValid) {
    enableButton(btn);
  } else {
    disableButton(btn);
  }
};

/**
 * Updates edit save button disabled state.
 */
const updateEditSaveButtonState = () => {
  const isValid = canSaveEdit();
  const saveBtn = document.getElementById("editContactSaveBtnDesktop");
  const mobileSaveBtn = document.getElementById("editContactSaveBtnMobile");
  [saveBtn, mobileSaveBtn].forEach((btn) => setSaveButtonState(btn, isValid));
};

/**
 * Attaches input listeners to edit form fields.
 */
const attachEditInputListeners = () => {
  const nameInput = document.getElementById("editContactInputName");
  const emailInput = document.getElementById("editContactInputEmail");
  const phoneInput = document.getElementById("editContactInputPhone");
  [nameInput, emailInput, phoneInput].forEach((input) => {
    if (input) {
      input.removeEventListener("input", updateEditSaveButtonState);
      input.addEventListener("input", updateEditSaveButtonState);
    }
  });
};

/**
 * Populates name input field.
 * @param {Object} contact - Contact object.
 */
const populateNameField = (contact) => {
  document.getElementById("editContactInputName").value = contact.name;
};

/**
 * Populates email input field.
 * @param {Object} contact - Contact object.
 */
const populateEmailField = (contact) => {
  document.getElementById("editContactInputEmail").value = contact.email;
};

/**
 * Populates phone input field.
 * @param {Object} contact - Contact object.
 */
const populatePhoneField = (contact) => {
  document.getElementById("editContactInputPhone").value = contact.phone;
};

/**
 * Sets signature display in header and body.
 * @param {string} signature - Contact signature.
 * @param {string} userColor - Contact color.
 */
const setSignatureDisplay = (signature, userColor) => {
  const headerSig = document.getElementById("editContactHeaderSignature");
  const bodySig = document.getElementById("editContactBodySignature");
  headerSig.innerText = signature;
  headerSig.style.backgroundColor = userColor;
  bodySig.innerText = signature;
  bodySig.style.backgroundColor = userColor;
};

/**
 * Initializes form with contact data.
 */
const initializeAllVariables = async () => {
  const contact = getContactById();
  populateNameField(contact);
  populateEmailField(contact);
  populatePhoneField(contact);
  setSignatureDisplay(contact.signature, contact.userColor);
};

/**
 * Gets trimmed input values from edit form.
 * @returns {Object} Object with name, email, and phone.
 */
const getEditInputValues = () => ({
  name: document.getElementById("editContactInputName").value.trim(),
  email: document.getElementById("editContactInputEmail").value.trim(),
  phone: document.getElementById("editContactInputPhone").value.trim(),
});

/**
 * Finds current contact in user contacts.
 * @returns {Object|null} Current contact or null.
 */
const findCurrentContact = () => findContactById(currentContactId);

/**
 * Validates edit form inputs.
 * @param {Object} inputs - Input values to validate.
 * @returns {boolean} True if all inputs are valid.
 */
const validateEditInputs = (inputs) =>
  checkAllInputFields("edit", inputs.name, inputs.email, inputs.phone);

/**
 * Callback after contact save completes.
 */
const afterContactSave = async () => {
  await navigateToSingleContactAfterSave(currentContactId, loadShowSingleContact, initListContact);
};

/**
 * Saves edited contact changes.
 */
const saveChangesAtEditContact = async () => {
  if (window.isSaving) return;
  const inputs = getEditInputValues();
  if (!validateEditInputs(inputs)) return;
  const currentContact = findCurrentContact();
  if (!currentContact) return;
  updateContactData(currentContact, inputs, currentContactId);
  await saveContactChanges(afterContactSave);
};

/**
 * Disables edit contact buttons.
 */
const disableEditButtons = () => {
  const saveBtn = document.getElementById("editContactSaveBtnDesktop");
  const deleteBtn = document.getElementById("editContactCancelBtnDesktop");
  disableButtons(saveBtn, deleteBtn);
};

/**
 * Enables edit contact buttons.
 */
const enableEditButtons = () => {
  const saveBtn = document.getElementById("editContactSaveBtnDesktop");
  const deleteBtn = document.getElementById("editContactCancelBtnDesktop");
  enableButtons(saveBtn, deleteBtn);
};

/**
 * Saves contact changes on desktop.
 */
const saveChangesDesktop = async () => {
  if (!canSaveEdit() || window.isSaving) return;
  disableEditButtons();
  await saveChangesAtEditContact();
  activateContactButton(currentContactId);
  goFromSingleContactToListContactContainer();
};

/**
 * Saves contact changes on mobile.
 */
const saveChangesAtEditContactMobile = async () => {
  if (!canSaveEdit() || window.isSaving) return;
  await saveChangesAtEditContact();
  goFromSingleContactToListContactContainer();
};

/**
 * Deletes contact from desktop edit view.
 * @param {string} contactId - ID of contact to delete.
 */
const deleteAtEditContactDesktop = async (contactId) => {
  if (window.isSaving) return;
  disableEditButtons();
  await deleteContact(contactId);
  await navigateFromDeleteToList(initListContact);
};

/**
 * Closes edit contact and shows list.
 */
const closeEditContactWindow = async () => {
  closeEditAndShowList();
};

/**
 * Closes edit form on desktop.
 */
const desktopCloseAddContactContainerWithoutAddingNewContact = async () => {
  closeEditOnDesktop();
};

/**
 * Navigates from delete to list view.
 */
const goFromDeleteContactToListContact = async () => {
  await deleteContact(currentContactId);
  await navigateFromDeleteToList(initListContact);
};

window.initEditContact = initEditContact;
window.saveChangesDesktop = saveChangesDesktop;
window.saveChangesAtEditContactMobile = saveChangesAtEditContactMobile;
window.deleteAtEditContactDesktop = deleteAtEditContactDesktop;
window.closeEditContactWindow = closeEditContactWindow;
window.desktopCloseAddContactContainerWithoutAddingNewContact =
  desktopCloseAddContactContainerWithoutAddingNewContact;
window.goFromDeleteContactToListContact = goFromDeleteContactToListContact;
