/**
 * @fileoverview Board contact list navigation.
 * Handles opening, closing, and toggling contact selection lists.
 * @module board-contact-navigation
 */

/**
 * Resets contact opener image to closed state.
 * @returns {HTMLElement} Image element.
 */
const resetContactOpenerImage = () => {
  const image = document.getElementById(`openerAssignedTo`);
  if (image) image.src = "../assets/img/add_task/arrow_drop_down.svg";
  return image;
};

/**
 * Hides contact list and shows icons.
 */
const hideContactListShowIcons = () => {
  const contactList = document.getElementById(`contactList`);
  const contactIcons = document.getElementById("contactListIcons");
  const container = document.getElementById(`contactSelectContainer`);
  if (contactList) contactList.style.display = "none";
  if (contactIcons) contactIcons.style.display = "block";
  if (container) container.classList.remove("borderColor");
};

/**
 * Shows contact list and hides icons.
 */
const showContactListHideIcons = () => {
  const contactList = document.getElementById("contactList");
  const contactIcons = document.getElementById("contactListIcons");
  const container = document.getElementById(`contactSelectContainer`);
  if (contactList) contactList.style.display = "block";
  if (contactIcons) contactIcons.style.display = "none";
  if (container) container.classList.add("borderColor");
};

/**
 * Sets contact opener image to close state.
 * @param {number} i - Task index.
 */
const setContactOpenerToClose = (i) => {
  const image = document.getElementById(`openerAssignedTo`);
  if (image) {
    image.src = "../assets/img/add_task/arrow_drop_up.svg";
    image.onclick = () => closeContactList(i);
  }
};

/**
 * Closes contacts list.
 * @param {number} i - Task index.
 */
const closeContactList = (i) => {
  hideContactListShowIcons();
  const image = resetContactOpenerImage();
  triggerDelayedBodyClick();
  if (image) image.onclick = () => openContactList(i);
};

/**
 * Opens contacts list.
 * @param {number} i - Task index.
 */
const openContactList = (i) => {
  showContactListHideIcons();
  setContactOpenerToClose(i);
};

/**
 * Checks if click is outside input field.
 * @param {Event} event - Click event.
 * @param {string} containerId - Container ID.
 * @returns {boolean} True if outside.
 */
const userClicksOutsideOfInputField = (event, containerId) => {
  const container = document.getElementById(containerId);
  return container && !container.contains(event.target);
};

/**
 * Resets contact opener image.
 * @param {number} i - Task index.
 */
const resetContactOpener = (i) => {
  const opener = document.getElementById(`contactOpener${i}`);
  if (opener) {
    opener.src = "../assets/img/add_task/arrow_drop_down.svg";
    opener.onclick = () => openContactList(i);
  }
};

/**
 * Closes contact window for task.
 * @param {number} i - Task index.
 */
const closeContactWindow = (i) => {
  hideContactListShowIcons();
  resetContactOpener(i);
};

/**
 * Creates close listener for contact window.
 * @param {number} i - Task index.
 * @returns {Function} Listener function.
 */
const closeListener = (i) => {
  return (event) => {
    if (userClicksOutsideOfInputField(event, `assignedToContainer${i}`)) {
      closeContactWindow(i);
      removeClickListener(listener);
    }
  };
};

/**
 * Removes click listener from body.
 * @param {Function} listener - Listener to remove.
 */
const removeClickListener = (listener) => {
  document.body.removeEventListener("click", listener);
};

window.resetContactOpenerImage = resetContactOpenerImage;
window.hideContactListShowIcons = hideContactListShowIcons;
window.showContactListHideIcons = showContactListHideIcons;
window.setContactOpenerToClose = setContactOpenerToClose;
window.closeContactList = closeContactList;
window.openContactList = openContactList;
window.userClicksOutsideOfInputField = userClicksOutsideOfInputField;
window.resetContactOpener = resetContactOpener;
window.closeContactWindow = closeContactWindow;
window.closeListener = closeListener;
window.removeClickListener = removeClickListener;
