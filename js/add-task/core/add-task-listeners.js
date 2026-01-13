/**
 * @fileoverview Event listeners for task creation page.
 *
 * @description
 * Handles click-outside detection and automatic dropdown closure
 * for category and contact selection menus.
 *
 * @module add-task-listeners
 */

/**
 * Adds an event listener to close lists when clicking outside of the contact or category container.
 */
window.closeListener = () => {
  document.addEventListener("click", function (event) {
    if (userClicksOutsideOfInputField(event, "categorySelectContainer")) {
      closeCategoryWindow();
    }
    if (userClicksOutsideOfInputField(event, "fullContactContainers")) {
      closeContactWindow();
    }
  });
};

/**
 * Checks if the user clicked outside the specified container.
 * @param {Event} event - The click event.
 * @param {string} containerId - The container ID to check.
 * @returns {boolean} - True if clicked outside.
 */
const userClicksOutsideOfInputField = (event, containerId) => {
  const container = document.getElementById(containerId);
  return container && !container.contains(event.target);
};

/**
 * Closes the category window.
 */
const closeCategoryWindow = () => {
  const categoryMenu = document.getElementById("categoryMenu");
  const border = document.getElementById("categorySelectContainer");

  if (categoryMenu) categoryMenu.style.display = "none";
  if (border) border.classList.remove("borderColor");
};

/**
 * Closes the contact list window.
 * Uses functions from add-task-contacts.js module.
 */
const closeContactWindow = () => {
  const contactList = document.getElementById("contactList");
  if (contactList) contactList.style.display = "none";

  const contactListIcons = document.getElementById("contactListIcons");
  if (contactListIcons) contactListIcons.style.display = "block";

  const border = document.getElementById("contactSelectContainer");
  if (border) border.classList.remove("borderColor");

  const image = document.getElementById("openerAssignedTo");
  if (image) image.src = "../assets/img/add_task/arrow_drop_down.svg";
};

/**
 * Adds a blue border around the assigned-to input field when clicked.
 */
window.onclickInputBorder = () => {
  const border = document.getElementById("contactSelectContainer");
  if (border) border.classList.add("borderColor");
};
