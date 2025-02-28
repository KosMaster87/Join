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
 *
 * @param {string} changePage - The name of the page to navigate to.
 */
function includeContentHTML(changePage) {
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
