/**
 * @fileoverview Category selection management for task creation.
 *
 * @description
 * Handles category dropdown menu interactions, selection, and visual feedback.
 * Manages Technical Task and User Story category options.
 *
 * @module add-task-category
 */

/**
 * Opens the category selection menu.
 */
window.openCategorySelect = () => {
  if (typeof window.closeContacts === "function") {
    window.closeContacts();
  }

  const content = document.getElementById("categoryMenu");
  if (!content) return;

  prepareContactListForCategory();
  content.innerHTML += window.openCategorySelectReturn();
  showCategoryMenu();
  categoryImageUp();
};

/**
 * Prepares contact list UI for category selection.
 */
const prepareContactListForCategory = () => {
  const contactList = document.getElementById("contactList");
  const contactListIcons = document.getElementById("contactListIcons");
  const contactSelectContainer = document.getElementById(
    "contactSelectContainer"
  );

  if (contactList) contactList.style.display = "block";
  if (contactListIcons) contactListIcons.style.display = "none";
  if (contactSelectContainer) {
    contactSelectContainer.classList.remove("borderColor");
  }
};

/**
 * Shows category menu and adds border.
 */
const showCategoryMenu = () => {
  const categoryMenu = document.getElementById("categoryMenu");
  const border = document.getElementById("categorySelectContainer");

  if (categoryMenu) categoryMenu.style.display = "block";
  if (border) border.classList.add("borderColor");
};

/**
 * Changes the category menu's image when the category menu is opened.
 */
const categoryImageUp = () => {
  const image = document.getElementById("categoryImage");
  const content = document.getElementById("categorySelectContainer");

  if (image) image.src = "../assets/img/add_task/arrow_drop_up.svg";
  if (content) content.onclick = window.closeCategoryMenu;
};

/**
 * Updates the category name in the field and checks the inputs.
 * @param {string} selectedOption - The selected category name.
 */
window.selectCategory = (selectedOption) => {
  const content = document.getElementById("categoryText");
  const image = document.getElementById("categoryImage");

  if (content) {
    content.innerHTML = selectedOption;
    window.selectedCategory = content.innerText;
  }

  if (image) {
    image.src = "../assets/img/add_task/arrow_drop_up.svg";
  }

  window.closeCategoryMenu();

  if (typeof window.checkInputs === "function") {
    window.checkInputs();
  }
};

/**
 * Closes the category menu.
 */
window.closeCategoryMenu = () => {
  const div = document.getElementById("categoryMenu");
  const border = document.getElementById("categorySelectContainer");

  if (div) div.innerHTML = "";
  if (border) border.classList.remove("borderColor");

  categoryImageDown();
};

/**
 * Changes the category menu image when the category menu is closed.
 */
const categoryImageDown = () => {
  const image = document.getElementById("categoryImage");
  const content = document.getElementById("categorySelectContainer");

  if (image) image.src = "../assets/img/add_task/arrow_drop_down.svg";
  if (content) content.onclick = window.openCategorySelect;
};
