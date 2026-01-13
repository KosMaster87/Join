/**
 * @fileoverview Main contact page initialization.
 * Entry point for contact module, orchestrates initialization.
 * @description This module initializes the contact page and coordinates
 * with contact core modules for validation, UI, and operations.
 * All validation, UI management, and helper functions have been moved to:
 * - contact-helpers.js: Signature generation, ID creation
 * - contact-ui.js: Form resets, borders, focus, messages
 * - contact-validation.js: Email, phone, name validation
 * @module mainContact
 */

/**
 * Initializes main contact page.
 * Loads users, HTML, and prepares contact interface.
 */
const initMainContact = async () => {
  await loadUsersAndCurrentUser();
  await includeHTML();
  setActiveLink("navContacts");
  await initListContact();
  createUserSignatureIcon();
  preparePopupEvent();
  setupMobileButtonListener();
};

/**
 * Updates mobile button visibility on window resize.
 */
const updateMobileButtonVisibility = () => {
  const mobileBtn = document.getElementById("mobileBtnAddContact");
  if (mobileBtn) {
    mobileBtn.style.display = isMobileView() ? "block" : "none";
  }
};

/**
 * Sets up window resize listener for mobile button.
 */
const setupMobileButtonListener = () => {
  window.addEventListener("resize", updateMobileButtonVisibility);
  updateMobileButtonVisibility();
};

window.initMainContact = initMainContact;
