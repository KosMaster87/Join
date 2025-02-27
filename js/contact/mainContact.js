/**
 * Initializes the main contact section by loading users, including HTML,
 * setting the active link, initializing the contact list, creating a user
 * signature icon, and preparing the popup event.
 */
async function initMainContact() {
  await loadUsersAndCurrentUser();
  await includeHTML();
  setActiveLink("navContacts");
  await initListContact();
  createUserSignatureIcon();
  preparePopupEvent();
}

/**
 * Creates a signature for the contact icon.
 *
 * @param {string} name - The name of the contact.
 * @returns {string} The generated signature based on the contact's name.
 */
function getSignature(name) {
  let arrayName = splitName(name);
  let signature = getFirstChars(arrayName);

  return signature;
}

/**
 * Splits the full name into an array of uppercase strings.
 *
 * @param {string} name - The full name of the contact.
 * @returns {Array} An array of name parts (split by spaces).
 */
function splitName(name) {
  let arrayName = [];
  let string = name;
  arrayName = string.toUpperCase().split(" ");

  return arrayName;
}

/**
 * Gets the first letter from each part of the name.
 *
 * @param {Array} arrayName - An array of name parts (e.g., first and last name).
 * @returns {string} The first letters from each part of the name.
 */
function getFirstChars(arrayName) {
  let firstChars = "";
  for (let i = 0; i < arrayName.length; i++) {
    firstChars += arrayName[i][0];
  }

  return firstChars;
}

/**
 * Checks the completeness of the input data for name, email, and phone.
 *
 * @param {string} siteInitial - The initial for the site/template being used.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 * @returns {boolean} Returns true if all fields are valid, otherwise false.
 */
function checkAllInputFields(siteInitial, name, email, phone) {
  if (
    checkInputName(siteInitial, name) === true &&
    checkInputEmail(siteInitial, email) === true &&
    checkInputPhone(siteInitial, phone) === true
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * Checks if the name is provided and initializes feedback on the form.
 *
 * @param {string} siteInitial - Defines the template being used.
 * @param {string} name - The name of the current contact.
 * @returns {boolean} Returns true if the name is valid, otherwise false.
 */
function checkInputName(siteInitial, name) {
  if (name == "") {
    showInputMessage(siteInitial + "ContactMessageName", "Please enter a name");
    removeFocusBorder(siteInitial, "Name");
    showAlertBorder(siteInitial + "ContactInputContainerName");
  } else {
    resetInputMessage(siteInitial + "ContactMessageName");
    resetAlertBorder(siteInitial + "ContactInputContainerName");
    return true;
  }
}

/**
 * Checks if the email is provided and valid, and initializes form feedback.
 *
 * @param {string} siteInitial - Defines the template being used.
 * @param {string} email - The email of the current contact.
 * @returns {boolean} Returns true if the email is valid, otherwise false.
 */
function checkInputEmail(siteInitial, email) {
  if (email === "") {
    return true;
  } else if (validateEmail(email) === false) {
    showInputMessage(
      siteInitial + "ContactMessageEmail",
      "Please enter a valid e-mail address"
    );
    removeFocusBorder(siteInitial, "Email");
    showAlertBorder(siteInitial + "ContactInputContainerEmail");
    return false;
  } else {
    resetInputMessage(siteInitial + "ContactMessageEmail");
    resetAlertBorder(siteInitial + "ContactInputContainerEmail");
    return true;
  }
}

/**
 * Validates the email format.
 *
 * @param {string} email - The email to be validated.
 * @returns {boolean} Returns true if the email format is valid, otherwise false.
 */
function validateEmail(email) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(email)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Checks if the phone number is provided and valid, and initializes form feedback.
 *
 * @param {string} siteInitial - Defines the template being used.
 * @param {string} phone - The phone number of the current contact.
 * @returns {boolean} Returns true if the phone number is valid, otherwise false.
 */
function checkInputPhone(siteInitial, phone) {
  const regex = /^[\d ()+-]+$/;

  if (phone === "") {
    return true;
  } else if (regex.test(phone)) {
    resetInputMessage(siteInitial + "ContactMessagePhone");
    resetAlertBorder(siteInitial + "ContactInputContainerPhone");
    return true;
  } else {
    removeFocusBorder(siteInitial, "Phone");
    showInputMessage(
      siteInitial + "ContactMessagePhone",
      "Phone number ist not valid"
    );
    showAlertBorder(siteInitial + "ContactInputContainerPhone");
    return false;
  }
}

/**
 * Resets the values entered in the input fields.
 *
 * @param {string} siteInitial - Defines the template being used.
 */
function resetInputFields(siteInitial) {
  document.getElementById(siteInitial + "ContactInputName").value = "";
  document.getElementById(siteInitial + "ContactInputEmail").value = "";
  document.getElementById(siteInitial + "ContactInputPhone").value = "";
}

/**
 * Displays a feedback message on the form input.
 *
 * @param {string} inputField - The id of the input field for the message.
 * @param {string} message - The feedback message to be shown.
 */
function showInputMessage(inputField, message) {
  document.getElementById(inputField).innerText = message;
}

/**
 * Resets the feedback message on the form input.
 *
 * @param {string} inputField - The id of the input field for the message.
 */
function resetInputMessage(inputField) {
  document.getElementById(inputField).innerText = "";
}

/**
 * Resets all feedback messages on the form.
 *
 * @param {string} siteInitial - Defines the template being used.
 */
function resetAllInputMessages(siteInitial) {
  resetInputMessage(siteInitial + "ContactMessageName");
  resetInputMessage(siteInitial + "ContactMessageEmail");
  resetInputMessage(siteInitial + "ContactMessagePhone");
}

/**
 * Initializes the alert border on the input field that requires attention.
 *
 * @param {string} inputContainer - The id of the input container to be highlighted.
 */
function showAlertBorder(inputContainer) {
  document.getElementById(inputContainer).classList.add("alertBorder");
}

/**
 * Resets the alert border on a specific input field.
 *
 * @param {string} inputContainer - The id of the input container to reset.
 */
function resetAlertBorder(inputContainer) {
  document.getElementById(inputContainer).classList.remove("alertBorder");
}

/**
 * Resets all alert borders on the form input fields.
 *
 * @param {string} siteInitial - Defines the template being used.
 */
function resetAllAlertBorders(siteInitial) {
  resetAlertBorder(siteInitial + "ContactInputContainerName");
  resetAlertBorder(siteInitial + "ContactInputContainerEmail");
  resetAlertBorder(siteInitial + "ContactInputContainerPhone");
}

/**
 * Manages the focus border on the input fields, adding focus to one field
 * and removing focus from others.
 *
 * @param {string} siteInitial - Defines the template being used.
 * @param {string} idFocus - The id of the input field to receive focus.
 * @param {string} idRemoveFocus - The id of the input field to remove focus.
 * @param {string} idDeleteFocus - The id of the input field to remove focus.
 */
function editFocusBorder(siteInitial, idFocus, idRemoveFocus, idDeleteFocus) {
  addFocusBorder(siteInitial, idFocus);
  removeFocusBorder(siteInitial, idRemoveFocus);
  removeFocusBorder(siteInitial, idDeleteFocus);
}

/**
 * Adds a focus border to the input field.
 *
 * @param {string} siteInitial - Defines the template being used.
 * @param {string} containerId - The id of the input container to focus.
 */
function addFocusBorder(siteInitial, containerId) {
  let input = document.getElementById(
    siteInitial + "ContactInputContainer" + containerId
  );
  if (input) {
    input.classList.add("focus");
  }
}

/**
 * Removes the focus border from the input field.
 *
 * @param {string} siteInitial - Defines the template being used.
 * @param {string} containerId - The id of the input container to remove focus.
 */
function removeFocusBorder(siteInitial, containerId) {
  let input = document.getElementById(
    siteInitial + "ContactInputContainer" + containerId
  );
  if (input.classList.contains("focus")) {
    input.classList.remove("focus");
  }
}
