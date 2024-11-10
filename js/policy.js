/**
 * Ohne sich angemeldet zu haben, die privat-policy lesen.
 */
function offlinePolicy() {
  window.location.assign("./pages/policy.html");
}

/**
 * Load the content of the privacy-policy.
 */
async function initPolicy() {
  await loadCurrentUserAlsoUsersAsObject();
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
