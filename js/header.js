/**
 * Opens the header submenu popup.
 */
function toggleHeaderSubMenu() {
  let headerSubMenu = document.getElementById("headerSubMenu");
  headerSubMenu.style.display = "flex";
}

/**
 * Hides the header submenu popup.
 */
function closeHeaderSubMenu() {
  let headerSubMenu = document.getElementById("headerSubMenu");
  headerSubMenu.style.display = "none";
}

/**
 * Adds an event listener to close the submenu when clicking outside of it.
 */
function preparePopupEvent() {
  document.addEventListener("click", function (event) {
    if (userClicksOutsideOfPopup(event)) {
      closeHeaderSubMenu();
    }
  });
}

/**
 * Checks if the user clicked outside the popup.
 * @param {Event} event - The click event.
 * @returns {boolean} True if the click occurred outside the popup, otherwise false.
 */
function userClicksOutsideOfPopup(event) {
  let headerSubMenu = document.getElementById("headerSubMenu");
  return (
    !headerSubMenu.contains(event.target) &&
    !document.getElementById("headerProfile").contains(event.target)
  );
}

/**
 * Logs out the current user by clearing stored data and redirecting to the login page.
 */
async function logOut() {
  localStorage.removeItem("currentUserId");
  sessionStorage.removeItem("showedLoginGreeting");
  localStorage.removeItem("rememberMe");
  window.location.assign("../index.html");
}

/**
 * Removes an item from the specified collection in the database.
 * @param {string} collection - The name of the collection.
 * @param {string} id - The ID of the item to be removed.
 * @returns {Promise<object>} The response from the server.
 */
async function removeItem(collection, id) {
  const response = await fetch(`${BASE_URL}/${collection}/${id}.json`, {
    method: "DELETE",
  });

  return response.json();
}

/**
 * Changes the header info image on hover.
 * @param {HTMLElement} element - The element containing the image to animate.
 */
function changeInfoImage(element) {
  const img = element.querySelector(".headerInfoAnimateProgramm");
  img.classList.contains("InfoImage");
  img.src = "../assets/img/header/helpHover.svg";
}

/**
 * Reverts the header info image to its original state.
 * @param {HTMLElement} element - The element containing the image to reset.
 */
function changeInfoImageBack(element) {
  const img = element.querySelector(".headerInfoAnimateProgramm");
  img.classList.contains("editImage");
  img.src = "../assets/img/header/help.svg";
}

/**
 * Generates and displays the user's initials as an icon.
 * Extracts the first letter of each name part and converts it to uppercase.
 */
function createUserSignatureIcon() {
  let container = document.getElementById(`userSignature`);
  let nameParts = user.name.split(" ");
  let initials = "";
  for (let i = 0; i < nameParts.length && initials.length < 2; i++) {
    initials += nameParts[i].charAt(0).toUpperCase();
  }
  container.innerHTML = initials;
}
