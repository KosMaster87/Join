/**
 * @fileoverview Board contact assignment management.
 * Handles contact selection, rendering, and filtering for tasks.
 * @module board-contact-management
 */

/**
 * Calculates contact list height.
 * @returns {number} Container height in pixels.
 */
const getContactListHeight = () => Math.min(user.contacts.length * 52, 260);

/**
 * Sets up contact list container.
 * @param {HTMLElement} mainDiv - Container element.
 */
const setupContactListContainer = (mainDiv) => {
  const totalHeight = getContactListHeight();
  mainDiv.style.height = `${totalHeight}px`;
  if (user.contacts.length > 5) {
    mainDiv.style.overflowY = "scroll";
  }
};

/**
 * Sets contact icon background color.
 * @param {number} c - Contact index.
 */
const setContactIconColor = (c) => {
  const iconId = document.getElementById(`ContactSignatureIcon${c}`);
  if (iconId) iconId.style.backgroundColor = user.contacts[c].userColor;
};

/**
 * Renders contact signature and icon.
 * @param {number} c - Contact index.
 * @param {number} i - Task index.
 */
const renderContactSignatureAndIcon = (c, i) => {
  const mainDiv = document.getElementById(`contactList`);
  contactSignature = user.contacts[c].signature;
  contactName = user.contacts[c].name;
  mainDiv.innerHTML += loadContactsReturn(c, i);
  setContactIconColor(c);
};

/**
 * Adds contact icon to icon line.
 * @param {number} c - Contact index.
 */
const addContactIconToLine = (c) => {
  const contactListIcons = document.getElementById("contactListIconsLine");
  const signature = document.getElementById(
    `ContactSignatureIcon${c}`
  ).innerHTML;
  const userColor = user.contacts[c].userColor;
  contactListIcons.innerHTML += `<div id="contactIconNumber${c}" style="background-color: ${userColor};" class="assignedContactLeftSideIcon">${signature}</div>`;
};

/**
 * Marks contact as visually selected.
 * @param {number} c - Contact index.
 */
const markContactSelected = (c) => {
  const container = document.getElementById(`assignedContactContainer${c}`);
  if (container) container.classList.add("assignedContainerBlack");
  const image = document.getElementById(`assignedContactImage${c}`);
  if (image) image.src = "../assets/img/add_task/task_box_check.svg";
};

/**
 * Loads contact if already selected.
 * @param {number} c - Contact index.
 */
const loadSelectedContact = (c) => {
  markContactSelected(c);
  addContactIconToLine(c);
};

/**
 * Renders all contacts for task.
 * @param {number} i - Task index.
 */
const renderAllTaskContacts = (i) => {
  user.contacts.forEach((contact, c) => {
    renderContactSignatureAndIcon(c, i);
    if (contact.selected) loadSelectedContact(c);
  });
};

/**
 * Loads assigned contacts for a task.
 * @param {number} i - Task index.
 */
const loadTaskContacts = async (i) => {
  const mainDiv = document.getElementById(`contactList`);
  setupContactListContainer(mainDiv);
  renderAllTaskContacts(i);
};

/**
 * Removes contact from task assignees.
 * @param {number} i - Contact index.
 * @param {number} j - Task index.
 */
const removeContactFromTaskAssignees = (i, j) => {
  if (!user.tasks[j]?.assignedTo) return;
  const removeIndex = user.tasks[j].assignedTo.findIndex(
    (item) => item.name === user.contacts[i].name
  );
  if (removeIndex !== -1) {
    user.tasks[j].assignedTo.splice(removeIndex, 1);
  }
};

/**
 * Marks contact as visually deselected.
 * @param {number} i - Contact index.
 */
const markContactDeselected = (i) => {
  const container = document.getElementById(`assignedContactContainer${i}`);
  container?.classList.remove("assignedContainerBlack");
  const image = document.getElementById(`assignedContactImage${i}`);
  if (image) image.src = "../assets/img/add_task/task_box.svg";
  const iconId = document.getElementById(`contactIconNumber${i}`);
  if (iconId) iconId.remove();
};

/**
 * Deselects contact.
 * @param {number} i - Contact index.
 * @param {number} j - Task index.
 */
const deselectContact = (i, j) => {
  if (!user.contacts[i]) return;
  user.contacts[i].selected = false;
  markContactDeselected(i);
  removeContactFromTaskAssignees(i, j);
};

/**
 * Adds contact to task assignees.
 * @param {number} i - Contact index.
 * @param {number} j - Task index.
 */
const addContactToTaskAssignees = (i, j) => {
  if (!user.tasks[j].assignedTo) {
    user.tasks[j].assignedTo = [];
  }
  user.tasks[j].assignedTo.push({
    name: user.contacts[i].name,
    userColor: user.contacts[i].userColor,
  });
};

/**
 * Selects contact.
 * @param {number} i - Contact index.
 * @param {number} j - Task index.
 */
const selectContact = (i, j) => {
  user.contacts[i].selected = true;
  markContactSelected(i);
  addContactIconToLine(i);
  addContactToTaskAssignees(i, j);
};

/**
 * Gets search input value.
 * @returns {string} Lowercase search term.
 */
const getContactSearchValue = () => {
  return document.getElementById("assignedToContainer").value.toLowerCase();
};

/**
 * Renders filtered contact.
 * @param {number} i - Contact index.
 * @param {HTMLElement} list - List container.
 */
const renderFilteredContact = (i, list) => {
  list.innerHTML += filterNamesForAssignedToReturn(i);
  const iconId = document.getElementById(`ContactSignatureIcon${i}`);
  if (iconId) iconId.style.backgroundColor += user.contacts[i].userColor;
};

/**
 * Loads contacts when clicking arrow.
 * @param {number} i - Task index.
 */
const loadContacts = (i) => {
  const mainDiv = document.getElementById("contactList");
  if (!mainDiv) return;
  setupContactListContainer(mainDiv);
  renderAllTaskContacts(i);
  openContactList(i);
};

/**
 * Handles input border on click.
 */
const onclickInputBorder = () => {
  addContactInputBorder();
};

/**
 * Opens contacts list.
 * @param {number} i - Task index.
 */
const openContacts = (i) => {
  openContactList(i);
};

window.getContactListHeight = getContactListHeight;
window.setupContactListContainer = setupContactListContainer;
window.setContactIconColor = setContactIconColor;
window.renderContactSignatureAndIcon = renderContactSignatureAndIcon;
window.addContactIconToLine = addContactIconToLine;
window.markContactSelected = markContactSelected;
window.loadSelectedContact = loadSelectedContact;
window.renderAllTaskContacts = renderAllTaskContacts;
window.loadTaskContacts = loadTaskContacts;
window.removeContactFromTaskAssignees = removeContactFromTaskAssignees;
window.markContactDeselected = markContactDeselected;
window.deselectContact = deselectContact;
window.addContactToTaskAssignees = addContactToTaskAssignees;
window.selectContact = selectContact;
window.getContactSearchValue = getContactSearchValue;
window.renderFilteredContact = renderFilteredContact;
window.loadContacts = loadContacts;
window.onclickInputBorder = onclickInputBorder;
window.openContacts = openContacts;
