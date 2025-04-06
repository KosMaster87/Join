let passwordContainer = document.getElementById("registerPasswortDevision");
let confirmPasswordContainer = document.getElementById(
  "registerConfirmPasswortDevision"
);
let emailContainer = document.getElementById("registerEmailDivision");
let registerInputName = document.getElementById("registerInputName");
let registerInputEmail = document.getElementById("registerInputEmail");
let registerInputPassword = document.getElementById("registerInputPassword");
let registerInputPasswordConfirm = document.getElementById(
  "registerInputPasswordConfirm"
);
let errorMessage = document.getElementById("registerError");
let registerBtn = document.getElementById("registerBtn");
let colorCode = "#ff3d00";
let signedUpSuccessfully = document.getElementById("signedUpSuccessfully");

let confirmedValidation = true;
let privacyPolicyCheckedValidate = false;
let validatePasswordConfirmation = false;

/**
 * Registers a new user by validating inputs, checking if the email is already taken,
 * and creating a new user in the database. Disables the register button during the process.
 * @returns {Promise<void>} - A promise that resolves when the registration process is complete.
 */
async function registerNewUser() {
  registerBtn.disabled = true;

  privacyPolicyCheckedValidate = privacyPolicyCheckedValidateFn();
  if (!privacyPolicyCheckedValidate) return;

  validatePasswordConfirmation = validatePasswordConfirmationFn();
  if (!validatePasswordConfirmation) return;

  let validateEmailRegister = await validateEmailRegisterFn(emailContainer);
  if (!validateEmailRegister) return;

  await registerUser();
}

/**
 * Validates if the email is already taken by checking the existing users.
 * Displays an error message if the email is already in use.
 * @param {HTMLElement} emailContainer - The container element for the email input.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the email is valid, otherwise `false`.
 */
async function validateEmailRegisterFn(emailContainer) {
  let emailTaken = await emailAlreadyTaken();

  if (emailTaken) {
    users = [];
    errorMessage.innerHTML = "A Account with this Email already exists";
    registerBtn.disabled = false;
    confirmedValidation = false;
    emailContainer.classList.add("wrong");
    return false;
  }
  emailContainer.classList.remove("wrong");
  return true;
}

/**
 * Checks if the email provided during registration is already taken by an existing user.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the email is taken, otherwise `false`.
 */
async function emailAlreadyTaken() {
  await loadUsersAndCurrentUser();

  if (!users) return false;

  return Object.values(users).some(
    (user) => user.email === registerInputEmail.value
  );
}

/**
 * Registers a new user by creating a user object and saving it to the database.
 * Handles guest and regular user registration separately.
 * @returns {Promise<void>} - A promise that resolves when the user is successfully registered.
 */
async function registerUser() {
  const isGuest = registerInputEmail.value === "guest@mail.de";
  const userId = generateUserId();

  if (
    !registerInputName.value ||
    !registerInputEmail.value ||
    !registerInputPassword.value
  ) {
    return;
  }

  const newUser = {
    name: isGuest ? `Guest User ${userId}` : registerInputName.value,
    email: isGuest ? `guest_${userId}@mail.de` : registerInputEmail.value,
    password: registerInputPassword.value,
    colorCode,
    tasks: [],
    contacts: [],
    isGuest,
  };

  try {
    const collection = isGuest ? "guests" : "users";
    await setItem(collection, userId, newUser);

    resetForm();
    await signedUpSuccessfullyFn();
  } catch (error) {
  } finally {
    registerBtn.disabled = false;
  }
}

/**
 * Generates a unique user ID.
 * @returns {string} - A unique user ID.
 */
function generateUserId() {
  return `user_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validates if the password and confirmation password match.
 * Displays an error message if they do not match.
 * @returns {boolean} - `true` if the passwords match, otherwise `false`.
 */
function validatePasswordConfirmationFn() {
  let password = registerInputPassword.value;
  let passwordConfirm = registerInputPasswordConfirm.value;

  if (password !== passwordConfirm) {
    errorMessage.innerHTML = "Passwords do not match";
    passwordContainer.classList.add("wrong");
    confirmPasswordContainer.classList.add("wrong");
    confirmedValidation = false;
    registerBtn.disabled = false;
    return false;
  } else {
    errorMessage.innerHTML = "";
    passwordContainer.classList.remove("wrong");
    confirmPasswordContainer.classList.remove("wrong");
    confirmedValidation = true;
    return true;
  }
}

/**
 * Toggles the privacy policy checkbox and updates the UI accordingly.
 */
function checkedPrivacy() {
  let checkedElement = document.getElementById("privacyCheck");
  let checkedBox = checkedElement.checked;

  if (checkedBox) {
    errorMessage.innerHTML = "";
    confirmedValidation = true;
    checkedElement.setAttribute("checked", "checked");
    registerBtn.disabled = false;
  } else {
    errorMessage.innerHTML = "U must accept the privacy policy";
    confirmedValidation = false;
    checkedElement.removeAttribute("checked", "");
  }
}

/**
 * Validates if the privacy policy checkbox is checked.
 * @returns {boolean} - `true` if the checkbox is checked, otherwise `false`.
 */
function privacyPolicyCheckedValidateFn() {
  let privacyPolicyChecked = document
    .getElementById("privacyCheck")
    .hasAttribute("checked");

  if (!privacyPolicyChecked) {
    errorMessage.innerHTML = "U must accept the privacy policy";
    confirmedValidation = false;
  } else {
    confirmedValidation = true;
  }
  return confirmedValidation;
}

/**
 * Resets the registration form inputs to their default values.
 */
function resetForm() {
  registerInputName.value = "";
  registerInputEmail.value = "";
  registerInputPassword.value = "";
  registerInputPasswordConfirm.value = "";
}

/**
 * Displays a success message after successful registration and redirects to the login page.
 * @returns {Promise<void>} - A promise that resolves after the success message is displayed.
 */
async function signedUpSuccessfullyFn() {
  signedUpSuccessfully.style.display = "flex";
  await new Promise((resolve) => setTimeout(resolve, 3000));
  signedUpSuccessfully.style.display = "none";
  redirectToLoin();
}

/**
 * Redirects the user from the registration page to the login page.
 */
function redirectToLoin() {
  let registerMain = document.getElementById("registerMain");
  let loginMain = document.getElementById("loginMain");
  loginMain.style.display = "flex";
  registerMain.style.display = "none";
}

/**
 * Toggles the visibility of the password in the input field.
 * @param {string} passwordId - The ID of the password input field.
 * @param {string} imageId - The ID of the image element used to toggle visibility.
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
 * Adds an active border color to the specified container.
 * @param {string} containerId - The ID of the container to change the border color.
 */
function changeBorderColor(containerId) {
  let focusContainer = document.getElementById(containerId);
  focusContainer.classList.add("active");
}

/**
 * Removes the active border color from the specified container.
 * @param {string} containerId - The ID of the container to reset the border color.
 */
function resetBorderColor(containerId) {
  let focusContainer = document.getElementById(containerId);
  focusContainer.classList.remove("active");
}
