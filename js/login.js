let loginPasswortDevision = document.getElementById("loginPasswortDevision");

/**
 * The current user will be logged in.
 */
async function login() {
  await findUserInUsersArray();
  if (user) {
    console.log(user);
    let globalUserId = user.email;
    loginPasswortDevision.classList.remove("wrong");
    await setGlobalUserId("currentUserId", globalUserId);
    rememberUserFn();
    if (user.name === "guest user") {
      await saveBackupContactsToStorage();
    }
    window.location.assign("pages/summary.html");
  } else {
    loginPasswortDevision.classList.add("wrong");
    console.log("Benutzer nicht gefunden");
  }
}

/**
 * Matching the entries in the "Users" array.
 */
async function findUserInUsersArray() {
  let loginInputMail = document.getElementById("loginInputMail");
  let loginInputPassword = document.getElementById("loginInputPassword");

  await loadUsers();

  user = users.find(
    (userIndex) =>
      userIndex.email === loginInputMail.value && userIndex.password === loginInputPassword.value
  );
}

/**
 * Den Schlüssel im Backend setzen, um nach der Weiterleitung auf die main-page, den Benutzer als ein Objekt matchen zu können.
 * Set the key in the backend in order to be able to match the user as an object after redirection to the main page.
 * @param {The key is intended for remote storage.} currentUserId
 * @param {The user's email for use as an identification} globalUserId
 */
async function setGlobalUserId(currentUserId, globalUserId) {
  await setItem(currentUserId, globalUserId);
}

/**
 * Switch back from login page to register page. (Into index.html)
 */
function redirectToRegister() {
  let registerMain = document.getElementById("registerMain");
  let loginMain = document.getElementById("loginMain");
  loginMain.style.display = "none";
  registerMain.style.display = "flex";
}

/**
 * To hide or show currentpassword in any fild.
 * @param {each input from origin HTML-element} passwordId
 * @param {each inputImage from origin HTML-element} imageId
 */
function changeToShowCurrentPassword(passwordId, imageId) {
  let hideThePassword = document.getElementById(passwordId);
  let hideThePasswordImage = document.getElementById(imageId);

  if (hideThePassword.type == "password") {
    hideThePassword.type = "text";
    hideThePasswordImage.src = "/assets/img/login/visibilityOff.svg";
  } else {
    hideThePassword.type = "password";
    hideThePasswordImage.src = "/assets/img/login/lock.svg";
  }
}

/**
 * Guest access to test the application.
 */
function loginAsGuest() {
  let loginInputMail = document.getElementById("loginInputMail");
  let loginInputPassword = document.getElementById("loginInputPassword");
  let loginBtn = document.getElementById("loginBtn");
  loginInputMail.value = "guest@mail.de";
  loginInputPassword.value = "guestPassword1234";
  loginBtn.click();
}

/**
 * Stores the `backup Contacts` array in remote storage.
 */
async function saveBackupContactsToStorage() {
  user.contacts = backupContacts;
  user.tasks = backupTasks;
  await setItem("users", users);
}

/**
 * Remember checked for last / currently user.
 */
function handleRememberme() {
  let dasChecketElement = document.getElementById("rememberMe");
  let checked = dasChecketElement.hasAttribute("checked") ? true : false;
  let handelChecked = checked
    ? dasChecketElement.removeAttribute("checked")
    : dasChecketElement.setAttribute("checked", "");
}

/**
 * Whether the user should stay logged in or not.
 */
function rememberUserFn() {
  let rememberMeCheckbox = document.getElementById("rememberMe");
  if (rememberMeCheckbox.checked && user) {
    const userData = {
      userId: user.email,
      password: user.password,
    };

    localStorage.setItem("rememberMe", JSON.stringify(userData));
  } else {
    localStorage.removeItem("rememberMe");
  }
}
