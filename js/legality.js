/**
 * Ohne sich angemeldet zu haben, die privat-policy lesen.
 */
function offlineLegality() {
  window.location.assign("./pages/legality.html");
}

/**
 * Load the content of the legal-notice.
 */
async function initLegalNotice() {
  await loadCurrentUserAlsoUsersAsObject();
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
