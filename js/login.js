let loginPasswortDivision = document.getElementById("loginPasswortDivision");

/**
 * Attempts to log in a user by checking credentials, handling guest users,
 * and redirecting to the summary page if successful.
 */
async function login() {
  await findUserInUsersArray();

  if (user) {
    let loggedUserId = user.id;
    loginPasswortDivision.classList.remove("wrong");
    rememberUserFn();

    if (user.isGuest) {
      await pushDummyData();
    }

    window.location.assign("pages/summary.html");
  } else {
    loginPasswortDivision.classList.add("wrong");
  }
}

/**
 * Finds a user in the users or guests array based on the entered credentials.
 * If found, the user is stored in localStorage as the current user.
 */
async function findUserInUsersArray() {
  let loginInputMail = document.getElementById("loginInputMail");
  let loginInputPassword = document.getElementById("loginInputPassword");

  await loadUsersAndCurrentUser();

  user = guests.find(
    (g) =>
      g.email === loginInputMail.value &&
      g.password === loginInputPassword.value
  );

  if (!user) {
    user = users.find(
      (u) =>
        u.email === loginInputMail.value &&
        u.password === loginInputPassword.value
    );
  }

  if (user) {
    localStorage.setItem("currentUserId", user.id);
  }
}

/**
 * Adds default contacts and tasks to the guest user's account.
 * Updates the user's data in the appropriate collection.
 */
async function pushDummyData() {
  if (!user) return;

  user.contacts = Array.isArray(backupContacts) ? backupContacts : [];
  user.tasks = Array.isArray(backupTasks) ? backupTasks : [];

  const collection = user.isGuest ? "guests" : "users";
  await setItem(collection, user.id, {
    contacts: user.contacts,
    tasks: user.tasks,
  });
}

/**
 * Logs in as a guest by creating a temporary guest user account.
 * The generated guest credentials are used to automatically log in.
 */
async function loginAsGuest() {
  const userId = generateUserId();
  const guestEmail = `guest_${userId}@mail.de`;
  const guestPassword = "guestPassword1234";

  const newGuest = {
    name: `Guest User ${userId}`,
    email: guestEmail,
    password: guestPassword,
    colorCode: "#000000",
    tasks: [],
    contacts: [],
    isGuest: true,
  };

  try {
    await setItem("guests", userId, newGuest);

    loginInputMail.value = guestEmail;
    loginInputPassword.value = guestPassword;
    loginBtn.click();
  } catch (error) {}
}

/**
 * Saves the user's credentials in localStorage if "Remember Me" is checked.
 * Removes saved credentials if the checkbox is unchecked.
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

/**
 * Redirects the user from the login page to the registration page.
 */
function redirectToRegister() {
  let registerMain = document.getElementById("registerMain");
  let loginMain = document.getElementById("loginMain");
  loginMain.style.display = "none";
  registerMain.style.display = "flex";
}

/**
 * Toggles the visibility of the password input field.
 *
 * @param {string} passwordId - The ID of the password input field.
 * @param {string} imageId - The ID of the image that represents visibility state.
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
 * Toggles the "Remember Me" checkbox state.
 * If checked, it remains checked; otherwise, it gets unchecked.
 */
function handleRememberme() {
  let dasChecketElement = document.getElementById("rememberMe");
  let checked = dasChecketElement.hasAttribute("checked") ? true : false;
  let handelChecked = checked
    ? dasChecketElement.removeAttribute("checked")
    : dasChecketElement.setAttribute("checked", "");
}
