/**
 * @fileoverview Contact navigation and view management module.
 * Handles view transitions, container visibility, and navigation between contact views.
 * @module contact-navigation
 */

/**
 * Hides edit contact containers.
 */
const hideEditContactContainers = () => {
  document.getElementById("listContactContainer").style.display = "none";
  document.getElementById("editContactContainer").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "none";
};

/**
 * Shows single contact view on mobile.
 */
const showMobileSingleContactView = () => {
  document.getElementById("mobileBtnThreePoints").style.display = "block";
  document.getElementById("showSingleContactContainer").style.display = "block";
};

/**
 * Shows edit view on desktop.
 */
const showDesktopEditView = () => {
  document.getElementById("showSingleContactContainer").style.display = "flex";
  document.getElementById("editContactContainer").style.display = "none";
  document.getElementById("singleContactCol").style.display = "flex";
};

/**
 * Hides edit and single contact containers.
 */
const hideEditAndSingleContact = () => {
  document.getElementById("editContactContainer").style.display = "none";
  document.getElementById("showSingleContactContainer").style.display = "none";
};

/**
 * Hides mobile button select options.
 */
const hideMobileBtnSelectOptions = () => {
  const mobileBtn = document.getElementById("mobileBtnSelectOptions");
  if (mobileBtn) mobileBtn.style.display = "none";
};

/**
 * Shows contact list view with add button.
 */
const showContactListView = () => {
  document.getElementById("listContactContainer").style.display = "flex";
  hideMobileBtnSelectOptions();
  const isMobile = isMobileView();
  document.getElementById("mobileBtnAddContact").style.display = isMobile ? "block" : "none";
};

/**
 * Hides add contact container and overlay.
 */
const hideAddContactContainer = () => {
  const addContainer = document.getElementById("addContactContainer");
  const overlayFrame = document.getElementById("addOverlayFrame");
  if (addContainer) addContainer.style.display = "none";
  if (overlayFrame) overlayFrame.style.display = "none";
};

/**
 * Shows mobile add contact button.
 */
const showMobileAddButton = () => {
  document.getElementById("mobileBtnAddContact").style.display = "block";
};

/**
 * Hides add contact on desktop.
 */
const hideAddContactDesktop = () => {
  document.getElementById("addContactContainer").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "none";
};

/**
 * Shows single contact on desktop.
 */
const showSingleContactDesktop = () => {
  document.getElementById("showSingleContactContainer").style.display = "flex";
  document.getElementById("singleContactCol").style.display = "none";
};

/**
 * Hides all mobile contact containers.
 */
const hideMobileContactContainers = () => {
  document.getElementById("listContactContainer").style.display = "none";
  document.getElementById("addContactContainer").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "none";
};

/**
 * Shows single contact on mobile.
 */
const showMobileSingleContact = () => {
  document.getElementById("mobileBtnThreePoints").style.display = "block";
  document.getElementById("showSingleContactContainer").style.display = "flex";
};

/**
 * Shows desktop contact view with list.
 */
const showDesktopContactView = () => {
  document.getElementById("listContactContainer").style.display = "flex";
  document.getElementById("showSingleContactContainer").style.display = "flex";
  document.getElementById("addContactContainer").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "none";
  document.getElementById("singleContactCol").style.display = "flex";
};

/**
 * Hides single contact containers.
 */
const hideSingleContactContainers = () => {
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("addContactContainer").style.display = "none";
};

/**
 * Hides contact display containers.
 */
const hideContactContainers = () => {
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("listContactContainer").style.display = "none";
};

/**
 * Shows edit contact view.
 */
const showEditContactView = () => {
  document.getElementById("editContactContainer").style.display = "block";
  document.getElementById("editOverlayFrame").style.display = "flex";
};

/**
 * Hides mobile action buttons.
 */
const hideMobileButtons = () => {
  document.getElementById("mobileBtnThreePoints").style.display = "none";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
};

/**
 * Shows desktop view after delete.
 */
const showDesktopAfterDelete = () => {
  hideMobileButtons();
  document.getElementById("showSingleContactContainer").style.display = "flex";
  document.getElementById("listContactContainer").style.display = "flex";
  document.getElementById("singleContactCol").style.display = "none";
};

/**
 * Shows mobile view after delete.
 */
const showMobileAfterDelete = () => {
  hideMobileButtons();
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("listContactContainer").style.display = "flex";
  document.getElementById("singleContactCol").style.display = "none";
};

/**
 * Closes single contact view.
 */
const closeShowSingleContactContainer = () => {
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "block";
};

/**
 * Opens edit contact container.
 */
const openEditContactContainer = async () => {
  await initEditContact();
  document.getElementById("editContactContainer").style.display = "block";
  document.getElementById("editOverlayFrame").style.display = "block";
  document.getElementById("mobileBtnAddContact").style.display = "none";
};

/**
 * Navigates from add to single contact view.
 * @param {string} contactId - Contact ID to display.
 * @param {Function} loadContact - Function to load contact.
 */
const navigateFromAddToSingleContact = async (contactId, loadContact) => {
  await loadContact(contactId);
  if (isMobileView()) {
    hideMobileContactContainers();
    showMobileSingleContact();
  } else {
    showDesktopContactView();
  }
};

/** * Shows single contact on desktop.
 */
const showDesktopSingleContact = () => {
  document.getElementById("showSingleContactContainer").style.display = "flex";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "none";
};

/**
 * Activates contact button in list.
 * @param {string} contactId - Contact ID to activate.
 */
const activateContactButton = (contactId) => {
  const btnId = "singleContactBtn" + contactId;
  const btn = document.getElementById(btnId);
  if (btn) btn.classList.add("active");
};

/**
 * Navigates to mobile single contact view.
 */
const navigateToMobileSingleContact = () => {
  hideEditContactContainers();
  showMobileSingleContactView();
};

/**
 * Navigates to desktop single contact view.
 * @param {Function} initList - List initialization function.
 */
const navigateToDesktopSingleContact = async (initList) => {
  if (initList) await initList();
  showDesktopEditView();
};

/**
 * Navigates to single contact after save.
 * Adapts layout based on screen size.
 * @param {string} contactId - Contact ID to show.
 * @param {Function} loadContact - Function to load contact.
 * @param {Function} initList - List initialization function.
 */
const navigateToSingleContactAfterSave = async (contactId, loadContact, initList) => {
  await loadContact(contactId);
  const screenWidth = window.innerWidth;
  if (screenWidth < 1200) {
    navigateToMobileSingleContact();
  } else {
    await navigateToDesktopSingleContact(initList);
  }
};

/**
 * Navigates from delete to list view.
 * @param {Function} initList - List initialization function.
 */
const navigateFromDeleteToList = async (initList) => {
  if (initList) await initList();
  hideEditAndSingleContact();
  showContactListView();
};

/**
 * Closes edit contact and shows list.
 */
const closeEditAndShowList = () => {
  hideEditAndSingleContact();
  showContactListView();
};

/**
 * Closes edit form on desktop.
 */
const closeEditOnDesktop = () => {
  document.getElementById("editContactContainer").style.display = "none";
  showDesktopSingleContact();
};

window.hideEditContactContainers = hideEditContactContainers;
window.showMobileSingleContactView = showMobileSingleContactView;
window.showDesktopEditView = showDesktopEditView;
window.hideEditAndSingleContact = hideEditAndSingleContact;
window.showContactListView = showContactListView;
window.hideAddContactContainer = hideAddContactContainer;
window.hideMobileBtnSelectOptions = hideMobileBtnSelectOptions;
window.showMobileAddButton = showMobileAddButton;
window.hideAddContactDesktop = hideAddContactDesktop;
window.showSingleContactDesktop = showSingleContactDesktop;
window.hideMobileContactContainers = hideMobileContactContainers;
window.showMobileSingleContact = showMobileSingleContact;
window.showDesktopContactView = showDesktopContactView;
window.hideSingleContactContainers = hideSingleContactContainers;
window.hideContactContainers = hideContactContainers;
window.showEditContactView = showEditContactView;
window.hideMobileButtons = hideMobileButtons;
window.showDesktopAfterDelete = showDesktopAfterDelete;
window.showMobileAfterDelete = showMobileAfterDelete;
window.closeShowSingleContactContainer = closeShowSingleContactContainer;
window.openEditContactContainer = openEditContactContainer;
window.navigateFromAddToSingleContact = navigateFromAddToSingleContact;
window.showDesktopSingleContact = showDesktopSingleContact;
window.activateContactButton = activateContactButton;
window.navigateToSingleContactAfterSave = navigateToSingleContactAfterSave;
window.navigateFromDeleteToList = navigateFromDeleteToList;
window.closeEditAndShowList = closeEditAndShowList;
window.closeEditOnDesktop = closeEditOnDesktop;
