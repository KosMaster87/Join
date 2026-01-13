/**
 * @fileoverview User registration module with Firebase Authentication integration.
 *
 * @description
 * Handles user registration with Firebase Authentication, including form validation,
 * password confirmation, privacy policy acceptance, and guest user creation.
 * Integrates with the global state store and Firestore service for user data management.
 *
 * Key features:
 * - Firebase Authentication for regular users
 * - Guest user registration (legacy flow without Auth)
 * - Email uniqueness validation
 * - Password confirmation validation
 * - Privacy policy checkbox validation
 * - Real-time form field validation with visual feedback
 * - Success message display and automatic redirect to login
 *
 * @module register
 * @requires services/auth.service
 * @requires services/firestore.service
 * @requires services/store
 */

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
 * Handles guest and regular user registration separately. Updates the store.
 * @returns {Promise<void>} - A promise that resolves when the user is successfully registered.
 */
const registerUser = async () => {
  if (!areInputsValid()) return;

  try {
    const isGuest = registerInputEmail.value === "guest@mail.de";
    isGuest ? await registerGuestUser() : await registerRegularUser();
    resetForm();
    await signedUpSuccessfullyFn();
  } catch (error) {
    handleRegistrationError(error);
  } finally {
    registerBtn.disabled = false;
  }
};

/**
 * Validates if all required input fields have values.
 * @returns {boolean} - True if all inputs are valid, false otherwise.
 */
const areInputsValid = () => {
  return (
    !!registerInputName.value &&
    !!registerInputEmail.value &&
    !!registerInputPassword.value
  );
};

/**
 * Registers a guest user without Firebase Authentication.
 * @returns {Promise<void>} - A promise that resolves when the guest is registered.
 */
const registerGuestUser = async () => {
  const userId = generateUserId();
  const newGuest = {
    name: `Guest User ${userId}`,
    email: `guest_${userId}@mail.de`,
    colorCode,
    tasks: [],
    contacts: [],
    isGuest: true,
  };
  await setItem("guests", userId, newGuest);
  const updatedGuests = [...store.getGuests(), { id: userId, ...newGuest }];
  store.setGuests(updatedGuests);
};

/**
 * Registers a regular user with Firebase Authentication.
 * @returns {Promise<void>} - A promise that resolves when the user is registered.
 */
const registerRegularUser = async () => {
  const authUser = await registerWithAuth(
    registerInputEmail.value,
    registerInputPassword.value
  );
  const newUser = createUserObject();
  await setItem("users", authUser.uid, newUser);
  const updatedUsers = [...store.getUsers(), { id: authUser.uid, ...newUser }];
  store.setUsers(updatedUsers);
};

/**
 * Creates a user object from form inputs.
 * @returns {Object} - The user object.
 */
const createUserObject = () => ({
  name: registerInputName.value,
  email: registerInputEmail.value,
  colorCode,
  tasks: [],
  contacts: [],
  isGuest: false,
});

/**
 * Handles registration errors by logging and displaying error message.
 * @param {Error} error - The error object.
 */
const handleRegistrationError = (error) => {
  console.error("Registration error:", error);
  errorMessage.innerHTML = error.message || "Registration failed";
};

/**
 * Generates a unique user ID.
 * @returns {string} - A unique user ID.
 */
const generateUserId = () => {
  return `user_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validates if the password and confirmation password match.
 * Displays an error message if they do not match.
 * @returns {boolean} - `true` if the passwords match, otherwise `false`.
 */
const validatePasswordConfirmationFn = () => {
  const password = registerInputPassword.value;
  const passwordConfirm = registerInputPasswordConfirm.value;

  if (password !== passwordConfirm) {
    showPasswordMismatchError();
    return false;
  }
  clearPasswordError();
  return true;
};

/**
 * Displays password mismatch error and updates UI.
 */
const showPasswordMismatchError = () => {
  errorMessage.innerHTML = "Passwords do not match";
  passwordContainer.classList.add("wrong");
  confirmPasswordContainer.classList.add("wrong");
  confirmedValidation = false;
  registerBtn.disabled = false;
};

/**
 * Clears password error styling and message.
 */
const clearPasswordError = () => {
  errorMessage.innerHTML = "";
  passwordContainer.classList.remove("wrong");
  confirmPasswordContainer.classList.remove("wrong");
  confirmedValidation = true;
};

/**
 * Toggles the privacy policy checkbox and updates the UI accordingly.
 */
const checkedPrivacy = () => {
  const checkedElement = document.getElementById("privacyCheck");
  checkedElement.checked
    ? handlePrivacyChecked(checkedElement)
    : handlePrivacyUnchecked(checkedElement);
};

/**
 * Handles UI when privacy policy is checked.
 * @param {HTMLElement} element - The checkbox element.
 */
const handlePrivacyChecked = (element) => {
  errorMessage.innerHTML = "";
  confirmedValidation = true;
  element.setAttribute("checked", "checked");
  registerBtn.disabled = false;
};

/**
 * Handles UI when privacy policy is unchecked.
 * @param {HTMLElement} element - The checkbox element.
 */
const handlePrivacyUnchecked = (element) => {
  errorMessage.innerHTML = "U must accept the privacy policy";
  confirmedValidation = false;
  element.removeAttribute("checked");
};

/**
 * Validates if the privacy policy checkbox is checked.
 * @returns {boolean} - `true` if the checkbox is checked, otherwise `false`.
 */
const privacyPolicyCheckedValidateFn = () => {
  const privacyPolicyChecked = document
    .getElementById("privacyCheck")
    .hasAttribute("checked");

  if (!privacyPolicyChecked) {
    errorMessage.innerHTML = "U must accept the privacy policy";
    confirmedValidation = false;
    return false;
  }
  confirmedValidation = true;
  return true;
};

/**
 * Resets the registration form inputs to their default values.
 */
const resetForm = () => {
  registerInputName.value = "";
  registerInputEmail.value = "";
  registerInputPassword.value = "";
  registerInputPasswordConfirm.value = "";
};

/**
 * Displays a success message after successful registration and redirects to the login page.
 * @returns {Promise<void>} - A promise that resolves after the success message is displayed.
 */
const signedUpSuccessfullyFn = async () => {
  signedUpSuccessfully.style.display = "flex";
  await new Promise((resolve) => setTimeout(resolve, 3000));
  signedUpSuccessfully.style.display = "none";
  redirectToLoin();
};

/**
 * Redirects the user from the registration page to the login page.
 */
const redirectToLoin = () => {
  const registerMain = document.getElementById("registerMain");
  const loginMain = document.getElementById("loginMain");
  loginMain.style.display = "flex";
  registerMain.style.display = "none";
};

/**
 * Toggles the visibility of the password in the input field.
 * @param {string} passwordId - The ID of the password input field.
 * @param {string} imageId - The ID of the image element used to toggle visibility.
 */
const changeToShowCurrentPassword = (passwordId, imageId) => {
  const hideThePassword = document.getElementById(passwordId);
  const hideThePasswordImage = document.getElementById(imageId);

  const isPasswordType = hideThePassword.type === "password";
  hideThePassword.type = isPasswordType ? "text" : "password";
  hideThePasswordImage.src = isPasswordType
    ? "/assets/img/login/visibilityOff.svg"
    : "/assets/img/login/lock.svg";
};

/**
 * Adds an active border color to the specified container.
 * @param {string} containerId - The ID of the container to change the border color.
 */
const changeBorderColor = (containerId) => {
  const focusContainer = document.getElementById(containerId);
  focusContainer.classList.add("active");
};

/**
 * Removes the active border color from the specified container.
 * @param {string} containerId - The ID of the container to reset the border color.
 */
const resetBorderColor = (containerId) => {
  const focusContainer = document.getElementById(containerId);
  focusContainer.classList.remove("active");
};

window.addEventListener("scriptModuleReady", () => {
  // console.log("script.js is ready!");
});
