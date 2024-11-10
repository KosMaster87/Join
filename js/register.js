let passwordContainer = document.getElementById("registerPasswortDevision");
let confirmPasswordContainer = document.getElementById(
  "registerConfirmPasswortDevision"
);
let emailContainer = document.getElementById("registerEmailDevision");
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
 * The registration of a new user.
 */
async function registerNewUser() {
  registerBtn.disabled = true;

  privacyPolicyCheckedValidate = privacyPolicyCheckedValidateFn();
  console.log("checkbox: " + privacyPolicyCheckedValidate);
  if (!privacyPolicyCheckedValidate) return;

  validatePasswordConfirmation = validatePasswordConfirmationFn();
  if (!validatePasswordConfirmation) return;

  let validateEmailRegister = await validateEmailRegisterFn(emailContainer);
  console.log("eingabe email validierungerfolg: " + validateEmailRegister);
  if (!validateEmailRegister) return;

  await pushRegisteredUserIntoRemote();
}

/**
 * Validate the confirmation password.
 * @returns {boolean} Whether the confirmation password is valid or not.
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
 * Match the email you entered for registration.
 * @returns {boolean} The email you entered matches an already registered user. Or not.
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
 * Compare the email address entered with the users array list to see whether it has not already been used for registration.
 * @returns {boolean} The email you entered matches an already registered user. Or not.
 */
async function emailAlreadyTaken() {
  await loadUsers();
  existingUser = await users.find(
    (searchCurrentEmail) =>
      searchCurrentEmail.email === registerInputEmail.value
  );
  return !!existingUser;
}

/**
 * Just setting or removing the checked attribute.
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
    errorMessage.innerHTML = "U must accept the privacy police";
    confirmedValidation = false;
    checkedElement.removeAttribute("checked", "");
  }
}

/**
 * The attribute of the checkbox is set.
 * @returns {boolean} Whether the checkbox was clicked or not.
 */
function privacyPolicyCheckedValidateFn() {
  let privacyPolicyChecked = document
    .getElementById("privacyCheck")
    .hasAttribute("checked");

  if (!privacyPolicyChecked) {
    errorMessage.innerHTML = "U must accept the privacy police";
    confirmedValidation = false;
  } else {
    confirmedValidation = true;
  }
  return confirmedValidation;
}

/**
 * After validation, the user is saved in remote storage.
 */
async function pushRegisteredUserIntoRemote() {
  try {
    const IndexForUser = users.length + 1;

    users.push({
      index: IndexForUser,
      name: registerInputName.value,
      email: registerInputEmail.value,
      password: registerInputPassword.value,
      colorCode,
      tasks: [],
      contacts: [],
    });

    console.log(users);
    await secondaryFunctions(IndexForUser);
  } catch (error) {
    console.error("Fehler bei der Registrierung:", error);
  }
}

/**
 * Im backand mit dem Schlüssel das Array speichern.
 * @param {object} users
 */
async function secondaryFunctions(IndexForUser) {
  await setItem("users", JSON.stringify(users));
  await setItem("currentIndex", IndexForUser);
  resetForm();
  await signedUpSuccessfullyFn();
}

/**
 * Reset registration form values.
 */
function resetForm() {
  registerInputName.value = "";
  registerInputEmail.value = "";
  registerInputPassword.value = "";
  registerInputPasswordConfirm.value = "";
}

/**
 * After successful registration, confirmation for the user.
 */
async function signedUpSuccessfullyFn() {
  signedUpSuccessfully.style.display = "flex";
  await new Promise((resolve) => setTimeout(resolve, 3000));
  signedUpSuccessfully.style.display = "none";
  redirectToLoin();
}

/**^
 * Switch back from register page to login page.
 */
function redirectToLoin() {
  let registerMain = document.getElementById("registerMain");
  let loginMain = document.getElementById("loginMain");
  loginMain.style.display = "flex";
  registerMain.style.display = "none";
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
 * Change border color from parent element.
 * @param {string} containerId
 */
function changeBorderColor(containerId) {
  let focusContainer = document.getElementById(containerId);
  focusContainer.classList.add("active");
}

/**
 * Change border color from parent element.
 * @param {string} containerId
 */
function resetBorderColor(containerId) {
  let focusContainer = document.getElementById(containerId);
  focusContainer.classList.remove("active");
}
