/**
 * @fileoverview Contact list display and management module.
 * Handles rendering sorted contact lists with alphabetical grouping.
 * @description This module provides functionality for displaying contacts in
 * alphabetical order, managing contact list UI, and navigating to contact details.
 * @module listContact
 */

let sortedContacts;
let listFirstChars;

/**
 * Shows list contact container.
 */
const showListContainer = () => {
  document.getElementById("listContactContainer").style.display = "flex";
};

/**
 * Initializes contact list page.
 * Sorts contacts, extracts first letters, and renders list.
 */
const initListContact = async () => {
  showListContainer();
  sortAllContactsFromCurrentUserAlphabetical();
  await getListFirstChars();
  renderContainerList();
};

/**
 * Checks if user has no contacts.
 * @returns {boolean} True if no contacts exist.
 */
const hasNoContacts = () =>
  !user.contacts || !Array.isArray(user.contacts) || user.contacts.length === 0;

/**
 * Compares two contact names alphabetically.
 * @param {Object} a - First contact.
 * @param {Object} b - Second contact.
 * @returns {number} Comparison result.
 */
const compareContactNames = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  return nameA.localeCompare(nameB);
};

/**
 * Sorts user contacts alphabetically.
 */
const sortContactsAlphabetically = () => {
  user.contacts.sort(compareContactNames);
  sortedContacts = user.contacts;
};

/**
 * Sorts all contacts alphabetically by name.
 * Sets sortedContacts to empty array if no contacts exist.
 */
const sortAllContactsFromCurrentUserAlphabetical = () => {
  if (hasNoContacts()) {
    sortedContacts = [];
    return;
  }
  sortContactsAlphabetically();
};

/**
 * Extracts first characters from all contact signatures.
 * @returns {Set} Set of unique first characters.
 */
const extractFirstChars = () => {
  const setFirstChars = new Set();
  sortedContacts.forEach((contact) => {
    setFirstChars.add(contact.signature.charAt(0));
  });
  return setFirstChars;
};

/**
 * Creates sorted list of first characters.
 * @param {Set} charSet - Set of unique characters.
 * @returns {Array} Sorted array of characters.
 */
const createSortedCharList = (charSet) => Array.from(charSet).sort();

/**
 * Gets list of unique first characters from contacts.
 * Creates alphabetically sorted list of first letters.
 * @returns {Promise<Array>} Sorted array of first characters.
 */
const getListFirstChars = async () => {
  const charSet = extractFirstChars();
  listFirstChars = createSortedCharList(charSet);
  return listFirstChars;
};

/**
 * Gets list contact container element.
 * @returns {HTMLElement} List container element.
 */
const getListContainer = () => document.getElementById("listContactContainer");

/**
 * Renders add contact button HTML.
 * @returns {string} HTML for add contact button.
 */
const renderAddContactButton = () => `
  <div class="centerDesktopAdd">
    <a id="desktopBtnAddContact" onclick="desktopOpenAddContactContainer()">
      <div class="desktopBtnIntern">
        <span class="desktopBtnAddContactText">Add new contact</span>
        <img class="desktopBtnAddContactIcon" src="../assets/img/addContact/person_add.svg">
      </div>
    </a>
  </div>
`;

/**
 * Renders alphabetical section header.
 * @param {string} char - Character for section header.
 * @returns {string} HTML for alphabetical section.
 */
const renderAlphabeticalSection = (char) => `
  <div class="alphabeticalRow">
    <div class="firstChartSort">${char}</div>
  </div>
  <div class="styleHr"></div>
`;

/**
 * Renders contact list container.
 * Displays add button and contacts grouped alphabetically.
 */
const renderContainerList = () => {
  const charRow = getListContainer();
  charRow.innerHTML = renderAddContactButton();

  listFirstChars.forEach((char) => {
    charRow.innerHTML += renderAlphabeticalSection(char);
    renderContactCards(charRow, char);
  });
};

/**
 * Checks if contact name starts with character.
 * @param {Object} contact - Contact object.
 * @param {string} char - Character to match.
 * @returns {boolean} True if contact matches character.
 */
const contactMatchesChar = (contact, char) =>
  contact.name.charAt(0).toUpperCase() === char;

/**
 * Creates HTML for single contact card.
 * @param {Object} contact - Contact object.
 * @returns {string} HTML for contact card.
 */
const createContactCardHTML = (contact) => `
  <a id="singleContactBtn${contact.contactId}" class="singleContact"
     onclick="goFromListContactToShowSingleContact('${contact.contactId}')">
    <div class="contactSignatureIcon" style="background-color: ${contact.userColor}">
      <span class="contactSignatureIconLetter">${contact.signature}</span>
    </div>
    <div id="contactData">
      <div class="contactName">${contact.name}</div>
      <div class="contactEmail">${contact.email}</div>
    </div>
  </a>
`;

/**
 * Renders contact cards for specific character.
 * Filters and displays contacts matching first letter.
 * @param {HTMLElement} contactCard - Container element.
 * @param {string} char - First character to filter by.
 */
const renderContactCards = (contactCard, char) => {
  user.contacts.forEach((contact) => {
    if (contactMatchesChar(contact, char)) {
      contactCard.innerHTML += createContactCardHTML(contact);
    }
  });
};

/**
 * Sets current contact ID globally.
 * @param {string} contactId - Contact ID to set.
 */
const setCurrentContactId = (contactId) => {
  currentContactId = contactId;
};

/**
 * Removes active class from all contact buttons.
 */
const removeActiveFromAllContacts = () => {
  const allButtons = document.querySelectorAll(".singleContact");
  allButtons.forEach((button) => button.classList.remove("active"));
};

/**
 * Activates specific contact button.
 * @param {string} contactId - ID of contact button to activate.
 */
const activateContactButtonInList = (contactId) => {
  const id = "singleContactBtn" + contactId;
  document.getElementById(id).classList.add("active");
};

/**
 * Hides mobile add contact button.
 */
const hideMobileAddButton = () => {
  document.getElementById("mobileBtnAddContact").style.display = "none";
};

/**
 * Shows contact on mobile view.
 */
const showMobileContactView = () => {
  document.getElementById("mobileBtnThreePoints").style.display = "block";
  document.getElementById("singleContactCol").classList.remove("slide-in");
  document.getElementById("singleContactCol").style.display = "flex";
  document.getElementById("showSingleContactContainer").style.display = "flex";
  document.getElementById("listContactContainer").style.display = "none";
};

/**
 * Shows contact on desktop view.
 */
const showListDesktopContactView = () => {
  document.getElementById("showSingleContactContainer").style.display = "flex";
  const singleContactCol = document.getElementById("singleContactCol");
  singleContactCol.classList.add("slide-in");
  singleContactCol.style.display = "flex";
};

/**
 * Navigates from list to single contact view.
 * Loads contact details and adapts layout for screen size.
 * @param {string} contactId - ID of contact to display.
 */
const goFromListContactToShowSingleContact = async (contactId) => {
  setCurrentContactId(contactId);
  hideMobileAddButton();
  removeActiveFromAllContacts();
  activateContactButtonInList(contactId);

  const screenwidth = window.innerWidth;
  await loadShowSingleContact(contactId);

  if (screenwidth < 1200) {
    showMobileContactView();
  } else {
    showListDesktopContactView();
  }
};

/**
 * Shows add contact container and overlay.
 */
const showAddContactContainer = async () => {
  document.getElementById("mobileBtnAddContact").style.display = "none";
  document.getElementById("addContactContainer").style.display = "block";
  document.getElementById("addOverlayFrame").style.display = "flex";
};

/**
 * Opens add contact container from mobile.
 */
const openAddContactContainer = async () => {
  await showAddContactContainer();
  await initAddContact();
};

/**
 * Opens add contact container from desktop button.
 */
const desktopOpenAddContactContainer = async () => {
  await showAddContactContainer();
  await initAddContact();
};

window.initListContact = initListContact;
window.goFromListContactToShowSingleContact =
  goFromListContactToShowSingleContact;
window.openAddContactContainer = openAddContactContainer;
window.desktopOpenAddContactContainer = desktopOpenAddContactContainer;
