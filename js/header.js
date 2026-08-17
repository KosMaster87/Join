/**
 * @fileoverview Header submenu popup and user logout functionality.
 * @description
 * Manages the header submenu popup display and user logout process,
 * including guest user data deletion and redirection to the login page.
 *
 * @module header
 * @requires services/auth.service
 * @requires services/database.service
 * @requires shared/store
 */

/**
 * Opens the header submenu popup.
 */
const toggleHeaderSubMenu = () => {
  const headerSubMenu = document.getElementById("headerSubMenu");
  headerSubMenu.style.display = "flex";
};

/**
 * Hides the header submenu popup.
 */
const closeHeaderSubMenu = () => {
  const headerSubMenu = document.getElementById("headerSubMenu");
  headerSubMenu.style.display = "none";
};

/**
 * Adds an event listener to close the submenu when clicking outside of it.
 */
const preparePopupEvent = () => {
  document.addEventListener("click", handleOutsideClick);
};

/**
 * Handles click events to close submenu when clicking outside.
 * @param {Event} event - The click event.
 */
const handleOutsideClick = (event) => {
  if (userClicksOutsideOfPopup(event)) {
    closeHeaderSubMenu();
  }
};

/**
 * Checks if the user clicked outside the popup.
 * @param {Event} event - The click event.
 * @returns {boolean} True if the click occurred outside the popup, otherwise false.
 */
const userClicksOutsideOfPopup = (event) => {
  const headerSubMenu = document.getElementById("headerSubMenu");
  const headerProfile = document.getElementById("headerProfile");
  return !headerSubMenu.contains(event.target) && !headerProfile.contains(event.target);
};

/**
 * Logs out guest user by deleting data and auth.
 */
const logoutGuestUser = async () => {
  await deleteDocument("guests", user.id);
  await deleteCurrentUser();
};

/**
 * Clears local storage data on logout.
 */
const clearLocalStorageData = () => {
  localStorage.removeItem("currentUserId");
  sessionStorage.removeItem("showedLoginGreeting");
  localStorage.removeItem("rememberMe");
};

/**
 * Redirects user to login page.
 */
const redirectToLogin = () => {
  window.location.assign("../index.html");
};

/**
 * Logs out the current user by clearing stored data and redirecting to the login page.
 */
async function logOut() {
  try {
    if (user && user.isGuest) {
      await logoutGuestUser();
    } else {
      await signOutUser();
    }
    clearLocalStorageData();
    store.clear();
    redirectToLogin();
  } catch (error) {
    console.error("Logout error:", error);
    redirectToLogin();
  }
}

/**
 * Removes an item from the specified collection in the database.
 * @param {string} collection - The name of the collection.
 * @param {string} id - The ID of the item to be removed.
 * @returns {Promise<object>} The response from the server.
 */
const removeItem = async (collection, id) => {
  const response = await fetch(`${BASE_URL}/${collection}/${id}.json`, {
    method: "DELETE",
  });
  return response.json();
};

/**
 * Changes the header info image on hover.
 * @param {HTMLElement} element - The element containing the image to animate.
 */
const changeInfoImage = (element) => {
  const img = element.querySelector(".headerInfoAnimateProgramm");
  img.classList.contains("InfoImage");
  img.src = "../assets/img/header/helpHover.svg";
};

/**
 * Reverts the header info image to its original state.
 * @param {HTMLElement} element - The element containing the image to reset.
 */
const changeInfoImageBack = (element) => {
  const img = element.querySelector(".headerInfoAnimateProgramm");
  img.classList.contains("editImage");
  img.src = "../assets/img/header/help.svg";
};

/**
 * Gets user initials from name.
 * @param {string} name - User name.
 * @returns {string} User initials (max 2 letters).
 */
const getUserInitials = (name) => {
  const nameParts = name.split(" ");
  let initials = "";
  for (let i = 0; i < nameParts.length && initials.length < 2; i++) {
    initials += nameParts[i].charAt(0).toUpperCase();
  }
  return initials;
};

/**
 * Generates and displays the user's initials as an icon.
 * Extracts the first letter of each name part and converts it to uppercase.
 */
const createUserSignatureIcon = () => {
  const container = document.getElementById("userSignature");
  if (!container) return;

  if (!user || !user.name) {
    container.innerHTML = "?";
    return;
  }

  container.innerHTML = getUserInitials(user.name);
};
