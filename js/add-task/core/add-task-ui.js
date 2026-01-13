/**
 * @fileoverview UI and layout management for task creation.
 *
 * @description
 * Handles responsive layout switching between mobile and desktop views.
 * Manages window resize events and dynamic content rendering.
 *
 * @module add-task-ui
 */

/**
 * Checks if the screen width is over 1219px or lower and adjusts the layout accordingly.
 */
window.checkWidth = () => {
  const screenWidth = window.getScreenWidth();
  window.mobilVersion = screenWidth <= 1219;
  loadContent();
};

/**
 * Loads HTML content based on the screen width for the desktop or mobile version.
 */
const loadContent = () => {
  const screenWidth = window.getScreenWidth();
  const content = document.getElementById("taskMainContainer");
  if (!content) return;

  content.innerHTML = "";

  screenWidth <= 1219 && window.mobilVersion
    ? renderMobileLayout(content)
    : renderDesktopLayout(content, screenWidth);
};

/**
 * Renders mobile layout.
 * @param {HTMLElement} content - The main container element.
 */
const renderMobileLayout = (content) => {
  window.mobilVersion = true;
  content.innerHTML = window.renderAddTaskMobileHTML();

  if (typeof window.footerMobile === "function") {
    window.footerMobile();
  }
};

/**
 * Renders desktop layout.
 * @param {HTMLElement} content - The main container element.
 * @param {number} screenWidth - The current screen width.
 */
const renderDesktopLayout = (content, screenWidth) => {
  if (screenWidth > 1219 && window.mobilVersion === false) {
    window.mobilVersion = false;
    content.innerHTML = window.renderAddTaskHTML();

    if (typeof window.footer === "function") {
      window.footer();
    }
  }
};

/**
 * Sets task status from session storage or default.
 */
window.setTaskStatus = () => {
  const requestedStatus = sessionStorage.getItem("addTaskStatus");

  if (requestedStatus) {
    window.statusInfo = requestedStatus;
    sessionStorage.removeItem("addTaskStatus");
  } else {
    window.statusInfo = "to-do";
  }
};

/**
 * Sets up event listeners for the page.
 */
window.setupEventListeners = () => {
  if (typeof window.preparePopupEvent === "function") {
    window.preparePopupEvent();
  }
  if (typeof window.closeListener === "function") {
    window.closeListener();
  }
};

/**
 * Event listener that triggers when the window is resized.
 */
window.addEventListener("resize", function () {
  window.checkWidth();
});
