/**
 * Load the content of help.
 */
async function initHelp() {
  await loadCurrentUserAlsoUsersAsObject();
  await includeHTML();
  preparePopupEvent();
  createUserSignatureIcon();
}
