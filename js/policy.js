/**
 * Redirects the user to the privacy policy page without requiring them to be logged in.
 * This function is used to allow users to read the privacy policy offline or without authentication.
 */
function offlinePolicy() {
  window.location.assign("./pages/policy.html");
}

/**
 * Initializes the privacy policy page by loading necessary data and setting up the UI.
 * This includes loading users, including HTML templates, setting active navigation links,
 * and displaying user-specific elements if a user is logged in.
 * If no user is logged in, it hides user-specific UI elements.
 * @returns {Promise<void>} - A promise that resolves when the initialization is complete.
 */
async function initPolicy() {
  await loadUsersAndCurrentUser();
  await includeHTML();
  setActiveLink("navPrivacyPolicy");

  if (user) {
    createUserSignatureIcon();
    preparePopupEvent();
  } else {
    users = [];
    user = [];
    let menuItemBox = document.getElementById("menuItemBox");
    let userSymbolContainerID = document.getElementById(
      "userSymbolContainerID"
    );
    menuItemBox.style.display = "none";
    userSymbolContainerID.style.display = "none";
  }
}
