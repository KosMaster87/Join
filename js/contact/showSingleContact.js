/**
 * @fileoverview Single contact display module.
 * Handles displaying individual contact details.
 * @description Provides orchestration for viewing contact details.
 * Navigation logic moved to contact-navigation.js
 * UI helpers moved to contact-ui.js
 * @module showSingleContact
 */

let currentContactId = null;

/**
 * Loads and displays single contact.
 * @param {string} contactId - Contact ID to load.
 */
const loadShowSingleContact = async (contactId) => {
  await getCurrentContact(contactId);
  await fillAllVariables(contactId);
};

/**
 * Checks if user has no contacts.
 * @returns {boolean} True if no contacts exist.
 */
const hasNoUserContacts = () => !user || !user.contacts;

/**
 * Retrieves contact by ID.
 * @param {string} contactId - Contact ID to retrieve.
 * @returns {Object|null} Contact object or null.
 */
const getCurrentContact = async (contactId) => {
  if (hasNoUserContacts()) return null;
  return findContactById(contactId);
};

/**
 * Sets contact name in UI.
 * @param {Object} contact - Contact object.
 */
const setContactName = (contact) => {
  document.getElementById("singleContactName").innerText = contact.name || "Unbekannt";
};

/**
 * Sets contact phone in UI.
 * @param {Object} contact - Contact object.
 */
const setContactPhone = (contact) => {
  setElementProperty("singleContactPhone", "innerText", contact.phone || "Keine Nummer");
};

/**
 * Sets contact email in UI.
 * @param {Object} contact - Contact object.
 */
const setContactEmail = (contact) => {
  setElementProperty("singleContactEmail", "innerText", contact.email || "Keine E-Mail");
};

/**
 * Sets contact signature and color in UI.
 * @param {Object} contact - Contact object.
 */
const setContactSignature = (contact) => {
  const sigElement = document.getElementById("singleContactSignature");
  sigElement.innerText = contact.signature || "";
  sigElement.style.backgroundColor = contact.userColor || "#ccc";
};

/**
 * Fills UI with contact information.
 * @param {string} contactId - Contact ID to display.
 */
const fillAllVariables = async (contactId) => {
  if (!contactId) return;
  const contact = findContactById(contactId);
  if (!contact) return;
  setContactName(contact);
  setContactPhone(contact);
  setContactEmail(contact);
  setContactSignature(contact);
};

/**
 * Gets contact email by ID.
 * @param {string} contactId - Contact ID.
 * @returns {string|null} Contact email or null.
 */
const getCurrentContactEmail = async (contactId) => {
  if (hasNoUserContacts()) return null;
  const contact = findContactById(contactId);
  return contact?.email || null;
};

/**
 * Opens email program with contact email.
 * @param {string} contactId - Current contact ID.
 */
const openEmailProgram = async (contactId) => {
  const email = await getCurrentContactEmail(contactId);
  if (email) window.open("mailto:" + email);
};

/**
 * Navigates from single contact to list view.
 */
const goFromSingleContactToListContactContainer = async () => {
  await initListContact();
  hideSingleContactContainers();
  showContactListView();
};

/**
 * Navigates to edit contact view.
 */
const goFromShowSingleContactToEditContact = async () => {
  hideMobileButtons();
  hideContactContainers();
  showEditContactView();
};

/**
 * Shows mobile select options buttons.
 */
const showMobileSelectBtns = () => {
  document.getElementById("mobileBtnThreePoints").style.display = "none";
  document.getElementById("mobileBtnSelectOptions").style.display = "block";
  setupClickOutsideHandler();
};

/**
 * Sets up click outside handler.
 */
const setupClickOutsideHandler = () => {
  setTimeout(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, 0);
};

/**
 * Handles clicks outside mobile select options.
 * @param {Event} event - Click event.
 */
const handleClickOutside = (event) => {
  const selectOptions = document.getElementById("mobileBtnSelectOptions");
  const threePointsBtn = document.getElementById("mobileBtnThreePoints");
  if (!selectOptions || !threePointsBtn) return;
  if (selectOptions.style.display !== "block") {
    document.removeEventListener("click", handleClickOutside, true);
    return;
  }
  if (!selectOptions.contains(event.target) && !threePointsBtn.contains(event.target)) {
    hideMobileBtnSelectOptions();
    threePointsBtn.style.display = "block";
    document.removeEventListener("click", handleClickOutside, true);
  }
};

/**
 * Deletes contact and refreshes list.
 * @param {string} contactId - Contact ID to delete.
 */
const deleteAndRefreshList = async (contactId) => {
  await deleteContact(contactId);
  await initListContact();
};

/**
 * Deletes contact from desktop single view.
 * @param {string} contactId - Contact ID to delete.
 */
const deleteContactAtSingleContactDesktop = async (contactId) => {
  const editBtn = document.getElementById("desktopBtnEdit");
  const deleteBtn = document.getElementById("desktopBtnDelete");
  disableButtons(editBtn, deleteBtn);
  await deleteAndRefreshList(contactId);
  if (typeof window.setIsSaving === "function") {
    window.setIsSaving(false);
  }
  showDesktopAfterDelete();
  goFromSingleContactToListContactContainer();
};

/**
 * Opens edit contact from desktop single view.
 * @param {string} contactId - Contact ID to edit.
 */
const openEditContactAtSingleContactDesktop = async (contactId) => {
  if (!contactId) return;
  hideMobileBtnSelectOptions();
  currentContactId = contactId;
  await initEditContact();
  showEditContactView();
  document.getElementById("mobileBtnAddContact").style.display = "none";
};

/**
 * Deletes contact from mobile single view.
 * @param {string} contactId - Contact ID to delete.
 */
const deleteContactAtShowSingleContactMobile = async (contactId) => {
  hideMobileBtnSelectOptions();
  document.getElementById("showSingleContactContainer").style.display = "none";
  await deleteAndRefreshList(contactId);
  if (typeof window.setIsSaving === "function") {
    window.setIsSaving(false);
  }
  showMobileAfterDelete();
  goFromSingleContactToListContactContainer();
};

window.loadShowSingleContact = loadShowSingleContact;
window.openEmailProgram = openEmailProgram;
window.goFromSingleContactToListContactContainer = goFromSingleContactToListContactContainer;
window.goFromShowSingleContactToEditContact = goFromShowSingleContactToEditContact;
window.showMobileSelectBtns = showMobileSelectBtns;
window.deleteContactAtSingleContactDesktop = deleteContactAtSingleContactDesktop;
window.openEditContactAtSingleContactDesktop = openEditContactAtSingleContactDesktop;
window.deleteContactAtShowSingleContactMobile = deleteContactAtShowSingleContactMobile;
