/**
 * Function prepare to remove highlight the active link. And put the one active.
 * @param {The ID of the menu items} activeLinkId
 */
function setActiveLink(activeLinkId) {
  removeActiveStyle();

  let activeLink = document.getElementById(activeLinkId);
  if (activeLink) {
    activeLink.classList.add("activeLinkStyle");
  }
}

/**
 * Removes the active style from all menu items.
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
