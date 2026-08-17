/**
 * @fileoverview Privacy policy page module.
 *
 * @description
 * Handles the privacy policy page initialization and offline access.
 * Provides functionality for users to view the privacy policy both
 * with and without authentication.
 *
 * Key features:
 * - Offline policy access without login
 * - Authenticated user UI elements
 * - Navigation link highlighting
 * - User signature icon display
 *
 * @module policy
 * @requires includeHTML
 * @requires services/store
 */

/**
 * Redirects the user to the privacy policy page without requiring them to be logged in.
 * This function is used to allow users to read the privacy policy offline or without authentication.
 */
const offlinePolicy = () => {
  window.location.assign("./pages/policy.html");
};

/**
 * Initializes the privacy policy page by loading necessary data and setting up the UI.
 * This includes loading users, including HTML templates, setting active navigation links,
 * and displaying user-specific elements if a user is logged in.
 * If no user is logged in, it hides user-specific UI elements.
 * @returns {Promise<void>} - A promise that resolves when the initialization is complete.
 */
const initPolicy = async () => {
  await loadUsersAndCurrentUser();
  await includeHTML();
  setActiveLink("navPrivacyPolicy");

  user ? setupAuthenticatedUI() : setupUnauthenticatedUI();
};

/**
 * Sets up UI elements for authenticated users.
 */
const setupAuthenticatedUI = () => {
  createUserSignatureIcon();
  preparePopupEvent();
};

/**
 * Sets up UI elements for unauthenticated users.
 * Hides user-specific elements.
 */
const setupUnauthenticatedUI = () => {
  users = [];
  user = [];
  hideUserElements();
};

/**
 * Hides user-specific UI elements.
 */
const hideUserElements = () => {
  const menuItemBox = document.getElementById("menuItemBox");
  const userSymbolContainerID = document.getElementById("userSymbolContainerID");
  menuItemBox.style.display = "none";
  userSymbolContainerID.style.display = "none";
};
