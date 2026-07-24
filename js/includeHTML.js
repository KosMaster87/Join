/**
 * @fileoverview HTML Inclusion and Navigation Utility
 * @description Provides functions to dynamically include external HTML files (header, menu)
 *              into the current page and handle page navigation with authentication checks
 *              and Firestore save-state management to prevent data loss during navigation.
 * @module includeHTML
 */

/**
 * Includes header and menu content in the current page by loading external HTML files.
 * Elements with the attribute `w3-include-html` will be replaced with the fetched content.
 * If the file is not found, it displays "Page not found".
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * Checks if the user is logged in and redirects accordingly.
 * If the user is logged in, they are redirected to the specified page.
 * If not, they are redirected to the login page.
 * Blocks navigation if a Firestore save operation is in progress.
 *
 * @param {string} changePage - The name of the page to navigate to.
 */
function includeContentHTML(changePage) {
  if (window.isSaving) {
    setTimeout(() => includeContentHTML(changePage), 100);
    return;
  }

  let currentUser = localStorage.getItem("currentUserId");

  if (currentUser) {
    window.location.assign("./" + changePage + ".html");
  } else {
    window.location.assign("./../index.html");
  }
}

/**
 * Redirects to the specified page without checking login status.
 *
 * @param {string} changePage - The name of the page to navigate to.
 */
function includeContentHTMLoffline(changePage) {
  window.location.assign("./" + changePage + ".html");
}
