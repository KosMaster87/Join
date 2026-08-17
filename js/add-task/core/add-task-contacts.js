/**
 * @fileoverview Contact selection and assignment for task creation.
 *
 * @description
 * Handles contact loading, filtering, selection, and assignment to tasks.
 * Manages contact list rendering and user selection state.
 *
 * @module add-task-contacts
 */

/**
 * Loads the assigned contacts when clicking on the arrow.
 */
window.loadContacts = () => {
  if (typeof window.closeCategoryMenu === "function") {
    window.closeCategoryMenu();
  }

  const mainDiv = document.getElementById("contactList");
  if (!mainDiv) return;

  setContactListHeight(mainDiv);
  renderAllContacts(mainDiv);
  enableScrollIfNeeded(mainDiv);
  openContacts();
};

/**
 * Sets the height of contact list based on number of contacts.
 * @param {HTMLElement} mainDiv - The contact list container.
 */
const setContactListHeight = (mainDiv) => {
  const totalHeight = Math.min(window.contacts.length * 52, 260);
  mainDiv.style.height = `${totalHeight}px`;
};

/**
 * Renders all contacts in the list.
 * @param {HTMLElement} mainDiv - The contact list container.
 */
const renderAllContacts = (mainDiv) => {
  for (let i = 0; i < window.contacts.length; i++) {
    renderSingleContact(mainDiv, i);
  }
};

/**
 * Renders a single contact item.
 * @param {HTMLElement} mainDiv - The contact list container.
 * @param {number} i - The contact index.
 */
const renderSingleContact = (mainDiv, i) => {
  const contactName = window.contacts[i].name;
  const assignedToUser = window.selectedAssignedTo.find((user) => user.name === contactName);

  assignedToUser ? renderAssignedContact(mainDiv, i) : renderUnassignedContact(mainDiv, i);
};

/**
 * Renders an assigned contact.
 * @param {HTMLElement} mainDiv - The contact list container.
 * @param {number} i - The contact index.
 */
const renderAssignedContact = (mainDiv, i) => {
  mainDiv.innerHTML += window.loadContactsAssignedReturn(i);
  giveOnlyAssignedBg(i);
};

/**
 * Renders an unassigned contact.
 * @param {HTMLElement} mainDiv - The contact list container.
 * @param {number} i - The contact index.
 */
const renderUnassignedContact = (mainDiv, i) => {
  mainDiv.innerHTML += window.loadContactsReturn(i);
  const iconId = document.getElementById(`ContactSignatureIcon${i}`);
  if (iconId) iconId.style.backgroundColor = window.contacts[i].userColor;
};

/**
 * Enables scroll if there are more than 5 contacts.
 * @param {HTMLElement} mainDiv - The contact list container.
 */
const enableScrollIfNeeded = (mainDiv) => {
  if (window.contacts.length > 5) {
    mainDiv.style.overflowY = "scroll";
  }
};

/**
 * Adds a background to the assigned contact container.
 * @param {number} i - The index of the selected contact.
 */
const giveOnlyAssignedBg = (i) => {
  const container = document.getElementById(`assignedContactContainer${i}`);
  if (!container) return;

  container.classList.add("assignedContainerBlack");
  setCheckboxChecked(i);
  setContactIconColor(i);
  container.onclick = () => window.removeAssignedToContactBg(i);
};

/**
 * Sets checkbox to checked state.
 * @param {number} i - The contact index.
 */
const setCheckboxChecked = (i) => {
  const image = document.getElementById(`assignedContactImage${i}`);
  if (image) image.src = "../assets/img/add_task/task_box_check.svg";
};

/**
 * Sets contact icon background color.
 * @param {number} i - The contact index.
 */
const setContactIconColor = (i) => {
  const iconId = document.getElementById(`ContactSignatureIcon${i}`);
  if (iconId) iconId.style.backgroundColor = window.contacts[i].userColor;
};

/**
 * Filters contact names based on input letters.
 */
window.filterNamesForAssignedTo = () => {
  const search = getSearchValue();
  const list = document.getElementById("contactList");
  if (!list) return;

  list.innerHTML = "";
  openContacts();
  renderFilteredContacts(list, search);
};

/**
 * Gets the search value from input field.
 * @returns {string} - Lowercase search value.
 */
const getSearchValue = () => {
  const input = document.getElementById("assignedToContainer");
  return input ? input.value.toLowerCase() : "";
};

/**
 * Renders filtered contacts based on search.
 * @param {HTMLElement} list - The contact list container.
 * @param {string} search - The search string.
 */
const renderFilteredContacts = (list, search) => {
  for (let i = 0; i < window.contacts.length; i++) {
    const name = window.contacts[i].name.toLowerCase();
    if (name.includes(search)) {
      renderFilteredContact(list, i);
    }
  }
};

/**
 * Renders a single filtered contact.
 * @param {HTMLElement} list - The contact list container.
 * @param {number} i - The contact index.
 */
const renderFilteredContact = (list, i) => {
  list.innerHTML += window.filterNamesForAssignedToReturn(i);
  const iconId = document.getElementById(`ContactSignatureIcon${i}`);
  if (iconId) iconId.style.backgroundColor = window.contacts[i].userColor;
};

/**
 * Changes the background color of the selected contact and creates an icon in the icon box.
 * @param {number} i - The index of the selected contact.
 * @param {string} userName - The name of the contact.
 */
window.assignedToContactBg = (i, userName) => {
  addContactToSelection(i, userName);
  updateContactUI(i);
  addContactIcon(i);
  attachRemoveHandler(i);
};

/**
 * Adds contact to selection array.
 * @param {number} i - The contact index.
 * @param {string} userName - The contact name.
 */
const addContactToSelection = (i, userName) => {
  const assignetToArray = {
    name: userName,
    userColor: window.contacts[i].userColor,
  };
  if (user.contacts[i]) {
    user.contacts[i].selected = true;
  }
  window.selectedAssignedTo.push(assignetToArray);
};

/**
 * Updates contact container UI to selected state.
 * @param {number} i - The contact index.
 */
const updateContactUI = (i) => {
  const container = document.getElementById(`assignedContactContainer${i}`);
  if (container) {
    container.classList.add("assignedContainerBlack");
    setCheckboxChecked(i);
  }
};

/**
 * Adds contact icon to icon container.
 * @param {number} i - The contact index.
 */
const addContactIcon = (i) => {
  const contactListIcons = document.getElementById("contactListIconsLine");
  if (!contactListIcons) return;

  const signatureElement = document.getElementById(`ContactSignatureIcon${i}`);
  if (!signatureElement) return;

  const signature = signatureElement.innerHTML;
  const userColor = window.contacts[i].userColor;
  contactListIcons.innerHTML += `<div id="contactIconNumber${i}" style="background-color: ${userColor};" class="assignedContactLeftSideIcon">${signature}</div>`;
};

/**
 * Attaches remove handler to contact container.
 * @param {number} i - The contact index.
 */
const attachRemoveHandler = (i) => {
  const container = document.getElementById(`assignedContactContainer${i}`);
  if (container) {
    container.onclick = () => window.removeAssignedToContactBg(i);
  }
};

/**
 * Removes the background color and checked icon of the selected contact.
 * @param {number} i - The index of the contact.
 */
window.removeAssignedToContactBg = (i) => {
  resetContactUI(i);
  removeContactIcon(i);
  removeFromSelection(i);
  attachAssignHandler(i);
};

/**
 * Resets contact UI to unselected state.
 * @param {number} i - The contact index.
 */
const resetContactUI = (i) => {
  const container = document.getElementById(`assignedContactContainer${i}`);
  if (container) {
    container.classList.remove("assignedContainerBlack");
    setCheckboxUnchecked(i);
  }
};

/**
 * Sets checkbox to unchecked state.
 * @param {number} i - The contact index.
 */
const setCheckboxUnchecked = (i) => {
  const image = document.getElementById(`assignedContactImage${i}`);
  if (image) image.src = "../assets/img/add_task/task_box.svg";
};

/**
 * Removes contact icon from icon container.
 * @param {number} i - The contact index.
 */
const removeContactIcon = (i) => {
  const iconId = document.getElementById(`contactIconNumber${i}`);
  if (iconId) iconId.remove();
};

/**
 * Removes contact from selection array.
 * @param {number} i - The contact index.
 */
const removeFromSelection = (i) => {
  const index = window.selectedAssignedTo.findIndex(
    (user) => user.name === window.contacts[i].name
  );
  if (index !== -1) {
    window.selectedAssignedTo.splice(index, 1);
  }
};

/**
 * Attaches assign handler to contact container.
 * @param {number} i - The contact index.
 */
const attachAssignHandler = (i) => {
  const container = document.getElementById(`assignedContactContainer${i}`);
  if (container) {
    container.onclick = () => window.assignedToContactBg(i);
  }
};

/**
 * Opens the contact list.
 */
const openContacts = () => {
  showContactListDropdown();
  hideContactIconsContainer();
  addBorderToContactContainer();
  setDropdownArrowUp();
  attachCloseContactsHandler();
};

/**
 * Shows the contact list dropdown.
 */
const showContactListDropdown = () => {
  const contactList = document.getElementById("contactList");
  if (contactList) contactList.style.display = "block";
};

/**
 * Hides contact icons container.
 */
const hideContactIconsContainer = () => {
  const contactListIcons = document.getElementById("contactListIcons");
  if (contactListIcons) contactListIcons.style.display = "none";
};

/**
 * Adds border color to contact container.
 */
const addBorderToContactContainer = () => {
  const border = document.getElementById("contactSelectContainer");
  if (border) border.classList.add("borderColor");
};

/**
 * Sets dropdown arrow to up position.
 */
const setDropdownArrowUp = () => {
  const image = document.getElementById("openerAssignedTo");
  if (image) image.src = "../assets/img/add_task/arrow_drop_up.svg";
};

/**
 * Attaches close handler to dropdown arrow.
 */
const attachCloseContactsHandler = () => {
  const image = document.getElementById("openerAssignedTo");
  if (image) image.onclick = window.closeContacts;
};

/**
 * Closes the contact list.
 */
window.closeContacts = () => {
  clearContactList();
  removeBorderFromContactContainer();
  showContactIcons();
  setDropdownArrowDown();
  attachLoadContactsHandler();
};

/**
 * Clears and hides contact list.
 */
const clearContactList = () => {
  const mainDiv = document.getElementById("contactList");
  if (mainDiv) {
    mainDiv.innerHTML = "";
    mainDiv.style.display = "none";
  }
};

/**
 * Removes border color from contact container.
 */
const removeBorderFromContactContainer = () => {
  const border = document.getElementById("contactSelectContainer");
  if (border) border.classList.remove("borderColor");
};

/**
 * Shows contact icons container.
 */
const showContactIcons = () => {
  const contactListIcons = document.getElementById("contactListIcons");
  if (contactListIcons) contactListIcons.style.display = "block";
};

/**
 * Sets dropdown arrow to down position.
 */
const setDropdownArrowDown = () => {
  const image = document.getElementById("openerAssignedTo");
  if (image) image.src = "../assets/img/add_task/arrow_drop_down.svg";
};

/**
 * Attaches load handler to dropdown arrow.
 */
const attachLoadContactsHandler = () => {
  const image = document.getElementById("openerAssignedTo");
  if (image) image.onclick = window.loadContacts;
};
