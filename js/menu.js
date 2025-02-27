/**
 * Sets the active link by removing the active style from all menu items
 * and applying it to the specified link.
 * 
 * @param {string} activeLinkId - The ID of the menu item to be activated.
 */
function setActiveLink(activeLinkId) {
  removeActiveStyle();

  let activeLink = document.getElementById(activeLinkId);
  if (activeLink) {
    activeLink.classList.add("activeLinkStyle");
  }
}

/**
 * Removes the active style from all menu items and extra menu items.
 */
function removeActiveStyle() {
  let menuItems = document.querySelectorAll(".menuItem");
  menuItems.forEach((menuItem) => {
    menuItem.classList.remove("activeLinkStyle");
  });

  let menuExtras = document.querySelectorAll(".menuItemExtra");
  menuExtras.forEach((menuExtra) => {
    menuExtra.classList.remove("activeLinkStyle");
  });
}
