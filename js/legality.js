/**
 * Opens the privacy policy page without requiring the user to be logged in.
 */
function offlineLegality() {
  window.location.assign("./pages/legality.html");
}

/**
 * Initializes the legal notice page.
 * Loads user data, includes HTML content, and sets the active menu item.
 * If a user is logged in, it generates the user icon and prepares the popup event.
 * Otherwise, it adjusts the UI elements for non-logged-in users.
 */
async function initLegalNotice() {
  await loadUsersAndCurrentUser();
  await includeHTML();
  setActiveLink("navLegalNotice");

  if (user) {
    createUserSignatureIcon();
    preparePopupEvent();
  } else {
    users = [];
    user = [];
    let menuItemBox = document.getElementById("menuItemBox");
    let menuItemBoxDummy = document.getElementById("menuItemBoxDummy");
    let userSymbolContainerID = document.getElementById(
      "userSymbolContainerID"
    );
    menuItemBox.style.display = "none";
    menuItemBoxDummy.style.display = "block";
    userSymbolContainerID.style.display = "none";
  }
}
