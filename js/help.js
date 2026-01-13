/**
 * @fileoverview Help page module.
 *
 * @description
 * Handles the help page initialization for authenticated users.
 * Provides functionality to display user-specific UI elements and
 * help documentation.
 *
 * Key features:
 * - User data loading and initialization
 * - HTML template inclusion
 * - User signature icon display
 * - Popup event handling
 *
 * @module help
 * @requires includeHTML
 * @requires services/store
 */

/**
 * Initializes the help page.
 * Loads user data, includes HTML content, prepares the popup event,
 * and generates the user signature icon.
 */
const initHelp = async () => {
  await loadUsersAndCurrentUser();
  await includeHTML();
  preparePopupEvent();
  createUserSignatureIcon();
};
