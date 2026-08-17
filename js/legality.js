/**
 * @fileoverview Legal notice page module.
 *
 * @description
 * Handles the legal notice page initialization and offline access.
 * Provides functionality for users to view the legal notice both
 * with and without authentication.
 *
 * Key features:
 * - Offline legal notice access without login
 * - Authenticated user UI elements
 * - Navigation link highlighting
 * - User signature icon display
 * - Special dummy menu box for unauthenticated users
 *
 * @module legality
 * @requires includeHTML
 * @requires services/store
 */

/**
 * Opens the privacy policy page without requiring the user to be logged in.
 */
const offlineLegality = () => {
  window.location.assign("./pages/legality.html");
};

/**
 * Initializes the legal notice page.
 * Loads user data, includes HTML content, and sets the active menu item.
 * If a user is logged in, it generates the user icon and prepares the popup event.
 * Otherwise, it adjusts the UI elements for non-logged-in users.
 */
const initLegalNotice = async () => {
  await loadUsersAndCurrentUser();
  await includeHTML();
  setActiveLink("navLegalNotice");

  user ? setupAuthenticatedLegalUI() : setupUnauthenticatedLegalUI();
};

/**
 * Sets up UI elements for authenticated users on legal notice page.
 */
const setupAuthenticatedLegalUI = () => {
  createUserSignatureIcon();
  preparePopupEvent();
};

/**
 * Sets up UI elements for unauthenticated users on legal notice page.
 * Hides user-specific elements and shows dummy menu.
 */
const setupUnauthenticatedLegalUI = () => {
  users = [];
  user = [];
  hideLegalUserElements();
  showDummyMenu();
};

/**
 * Hides user-specific UI elements on legal notice page.
 */
const hideLegalUserElements = () => {
  const menuItemBox = document.getElementById("menuItemBox");
  const userSymbolContainerID = document.getElementById("userSymbolContainerID");
  menuItemBox.style.display = "none";
  userSymbolContainerID.style.display = "none";
};

/**
 * Shows dummy menu box for unauthenticated users.
 */
const showDummyMenu = () => {
  const menuItemBoxDummy = document.getElementById("menuItemBoxDummy");
  menuItemBoxDummy.style.display = "block";
};
