/**
 * @fileoverview Contact creation module.
 * Handles adding new contacts with validation and navigation.
 * @description Provides orchestration for contact creation.
 * CRUD operations moved to contact-operations.js
 * Navigation logic moved to contact-navigation.js
 * @module addContact
 */

const contactColors = [
  "var(--red)",
  "var(--yellow)",
  "var(--orangeIcons)",
  "var(--green)",
  "var(--pink)",
  "var(--mintGreen)",
];

/**
 * Initializes the add contact form.
 */
const initAddContact = async () => {
  resetInputFields("add");
  resetAllInputMessages("add");
  resetAllAlertBorders("add");
  editFocusBorder("add", "Name", "Email", "Phone");
  enableAddContactButtons();
  updateSaveButtonState();
  attachInputListeners();
};

/**
 * Gets trimmed input values from form.
 * @returns {Object} Object with name, email, phone.
 */
const getContactInputValues = () => ({
  name: document.getElementById("addContactInputName").value.trim(),
  email: document.getElementById("addContactInputEmail").value.trim(),
  phone: document.getElementById("addContactInputPhone").value.trim(),
});

/**
 * Checks if contact can be saved.
 * @returns {boolean} True if name and (email or phone) filled.
 */
const canSaveContact = () => {
  const { name, email, phone } = getContactInputValues();
  return name.length > 0 && (email.length > 0 || phone.length > 0);
};

/**
 * Enables cancel buttons in form.
 */
const enableAddContactButtons = () => {
  const cancelBtnDesktop = document.getElementById("addCancelBtnDesktop");
  const cancelBtnMobile = document.getElementById("addCancelBtn");
  enableButtons(cancelBtnDesktop, cancelBtnMobile);
};

/**
 * Updates button state based on validity.
 * @param {HTMLElement} btn - Button element.
 * @param {boolean} isValid - Whether input is valid.
 */
const updateButtonState = (btn, isValid) => {
  if (!btn) return;
  if (isValid) {
    enableButton(btn);
  } else {
    disableButton(btn);
  }
};

/**
 * Gets save button elements.
 * @returns {Array<HTMLElement>} Save buttons.
 */
const getSaveButtons = () => [
  document.getElementById("contactBtnSaveDesktop"),
  document.getElementById("contactBtnSave"),
];

/**
 * Updates save button state.
 */
const updateSaveButtonState = () => {
  const isValid = canSaveContact();
  getSaveButtons().forEach((btn) => updateButtonState(btn, isValid));
};

/**
 * Attaches input listeners to fields.
 */
const attachInputListeners = () => {
  const nameInput = document.getElementById("addContactInputName");
  const emailInput = document.getElementById("addContactInputEmail");
  const phoneInput = document.getElementById("addContactInputPhone");
  [nameInput, emailInput, phoneInput].forEach((input) => {
    if (input) {
      input.addEventListener("input", updateSaveButtonState);
    }
  });
};

/**
 * Generates random color from array.
 * @param {Array} colors - Color array.
 * @returns {string} Random color.
 */
const getRandomColor = (colors) => colors[Math.floor(Math.random() * colors.length)];

/**
 * Shows contact created overlay with animation.
 */
const showContactCreatedOverlay = () => {
  const overlay = document.getElementById("overlayContactIsCreated");
  overlay.style.display = "flex";
  overlay.classList.add("slideInAnimation");
  setTimeout(() => {
    overlay.style.display = "none";
  }, 3000);
};

/**
 * Saves contact to backend.
 * @param {string} name - Contact name.
 * @param {string} email - Contact email.
 * @param {string} phone - Contact phone.
 */
const saveContact = async (name, email, phone) => {
  if (window.isSaving || !user) return;
  const contactId = generateRandomId();
  const userColor = getRandomColor(contactColors);
  const contact = createNewContact(name, email, phone, contactId, userColor);
  await saveNewContactToFirestore(contact);
  showContactCreatedOverlay();
};

/**
 * Validates and saves contact.
 */
const validateAndSaveContact = async () => {
  const { name, email, phone } = getContactInputValues();
  if (checkAllInputFields("add", name, email, phone)) {
    await saveContact(name, email, phone);
    resetInputFields("add");
    await navigateFromAddToSingleContact(currentContactId, loadShowSingleContact);
  }
};

/**
 * Resets add contact form.
 */
const resetAddContactForm = () => {
  resetInputFields("add");
  editFocusBorder("add", "Name", "Email", "Phone");
  resetAllInputMessages("add");
  resetAllAlertBorders("add");
};

/**
 * Closes add contact without saving (mobile).
 */
const closeAddContactContainer = async () => {
  resetAddContactForm();
  await initListContact();
  hideAddContactContainer();
  showMobileAddButton();
};

/**
 * Closes add contact without saving (desktop).
 */
const closeAddContactContainerDesktop = async () => {
  resetAddContactForm();
  await initListContact();
  hideAddContactDesktop();
  showSingleContactDesktop();
};

/**
 * Saves contact from desktop view.
 */
const saveContactAtAddContactDesktop = async () => {
  if (!canSaveContact() || window.isSaving) return;
  const cancelBtn = document.getElementById("addCancelBtnDesktop");
  const saveBtn = document.getElementById("contactBtnSaveDesktop");
  disableButtons(cancelBtn, saveBtn);
  await validateAndSaveContact();
  goFromSingleContactToListContactContainer();
};

/**
 * Saves contact from mobile view.
 */
const saveContactAtAddContactMobile = async () => {
  if (!canSaveContact() || window.isSaving) return;
  await validateAndSaveContact();
  goFromSingleContactToListContactContainer();
};

window.initAddContact = initAddContact;
window.saveContactAtAddContactDesktop = saveContactAtAddContactDesktop;
window.saveContactAtAddContactMobile = saveContactAtAddContactMobile;
window.closeAddContactContainerDesktop = closeAddContactContainerDesktop;
window.closeAddContactContainer = closeAddContactContainer;
