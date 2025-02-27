/**
 * Initializes the help page.
 * Loads user data, includes HTML content, prepares the popup event, 
 * and generates the user signature icon.
 */
async function initHelp() {
  await loadUsersAndCurrentUser();
  await includeHTML();
  preparePopupEvent();
  createUserSignatureIcon();
}
