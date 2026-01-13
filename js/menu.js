/**
 * @fileoverview Navigation menu module.
 *
 * @description
 * Handles menu navigation link highlighting and active state management.
 * Provides functionality to mark navigation links as active and remove
 * active states from other menu items.
 *
 * Key features:
 * - Active link styling management
 * - Support for regular menu items and extra menu items
 * - Automatic removal of active states from other items
 *
 * @module menu
 */

/**
 * Sets the active link by removing the active style from all menu items
 * and applying it to the specified link.
 *
 * @param {string} activeLinkId - The ID of the menu item to be activated.
 */
const setActiveLink = (activeLinkId) => {
  removeActiveStyle();
  const activeLink = document.getElementById(activeLinkId);

  if (activeLink) {
    activeLink.classList.add("activeLinkStyle");
  }
};

/**
 * Removes the active style from all menu items and extra menu items.
 */
const removeActiveStyle = () => {
  removeActiveFromMenuItems();
  removeActiveFromMenuExtras();
};

/**
 * Removes active style from regular menu items.
 */
const removeActiveFromMenuItems = () => {
  const menuItems = document.querySelectorAll(".menuItem");
  menuItems.forEach((menuItem) => {
    menuItem.classList.remove("activeLinkStyle");
  });
};

/**
 * Removes active style from extra menu items.
 */
const removeActiveFromMenuExtras = () => {
  const menuExtras = document.querySelectorAll(".menuItemExtra");
  menuExtras.forEach((menuExtra) => {
    menuExtra.classList.remove("activeLinkStyle");
  });
};
