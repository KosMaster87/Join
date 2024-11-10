/**
 * This function is the first function when open contact and initializes first templates
 */
async function initMainContact() {
  await loadCurrentUserAlsoUsersAsObject();
  await includeHTML();
  setActiveLink("navContacts");
  await initListContact();
  createUserSignatureIcon();
  preparePopupEvent();
}

/**
 * This function makes the contact id all available
 */
async function setContactId(contactId) {
  await setItem('contactId', contactId)
}

/**
 * This function retrieves available contactId
 */
async function getContactId() {
  return await getItem("contactId");
}

/**
 * This function creates signature for icon
 * 
 * @param {string} name - This is name of the contact
 */
function getSignature(name) {
  let arrayName = splitName(name);
  let signature = getFirstChars(arrayName);

  return signature;
}

/**
 * This function takes the first letter of the name
 * 
 *@param {string} name - This is name of the contact
 */
function splitName(name) {
  let arrayName = [];
  let string = name;
  arrayName = string.toUpperCase().split(" ");

  return arrayName;
}

/**
 * This function get the first letters from fullname
 */
function getFirstChars(arrayName) {
  let firstChars = "";
  for (let i = 0; i < arrayName.length; i++) {
    firstChars += arrayName[i][0];
  }

  return firstChars;
}

/**
 * This function checks all data for the specified completeness
 *
 * @param {string} siteInitial - defines the used template
 * @param {string} name - is the name of the current contact
 * @param {string} email - is the email of the current contact
 * @param {string} phone - is the phone number of the current contact
 */
function checkAllInputFields(siteInitial, name, email, phone) {
  if (checkInputName(siteInitial, name) === true && checkInputEmail(siteInitial, email) === true && checkInputPhone(siteInitial, phone) === true) {
    return true
  } else {
    return false;
  }
}

/**
 * This function checks the name for existence an initializes feedback on the form
 *
 * @param {string} siteInitial - defines the used template
 * @param {string} name - is the name of the current contact
 */
function checkInputName(siteInitial, name) {
  if (name == "") {
    showInputMessage(siteInitial + 'ContactMessageName', 'Please enter a name');
    removeFocusBorder(siteInitial, 'Name');
    showAlertBorder(siteInitial + 'ContactInputContainerName');
  } else {
    resetInputMessage(siteInitial + 'ContactMessageName');
    resetAlertBorder(siteInitial + 'ContactInputContainerName');
    return true;
  }
}

/**
 * This function checks the email for existence and initializes email validation and feedback on the form
 *
 * @param {string} siteInitial - defines the used template
 * @param {string} email - is the email of the current contact
 */
function checkInputEmail(siteInitial, email) {
  if (email === "") {
    return true;
  } else if (validateEmail(email) === false) {
    showInputMessage(siteInitial + 'ContactMessageEmail', 'Please enter a valid e-mail address');
    removeFocusBorder(siteInitial, 'Email');
    showAlertBorder(siteInitial + 'ContactInputContainerEmail');
    return false;
  } else {
    resetInputMessage(siteInitial + 'ContactMessageEmail');
    resetAlertBorder(siteInitial + 'ContactInputContainerEmail');
    return true;
  }
}

/**
 * This function valides email for valid parameters
 *
 * @param {string} email - is the email of the current contact
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
 * This function valides phone number for existence and valid parameters and initializes form feedback
 *
 * @param {string} siteInitial - defines the used template
 * @param {string} phone - is the phone number of the current contact
 */
function checkInputPhone(siteInitial, phone) {
  const regex = /^[\d ()+-]+$/;

  if (phone === "") {
    return true;
  } else if (regex.test(phone)) {
    resetInputMessage(siteInitial + 'ContactMessagePhone');
    resetAlertBorder(siteInitial + 'ContactInputContainerPhone');
    return true;
  } else {
    removeFocusBorder(siteInitial, 'Phone');
    showInputMessage(siteInitial + 'ContactMessagePhone', 'Phone number ist not valid');
    showAlertBorder(siteInitial + 'ContactInputContainerPhone');
    return false;
  }
}

/**
 * This function resets values entered in the form
 *
 * @param {string} siteInitial - defines the used template
 */
function resetInputFields(siteInitial) {
  document.getElementById(siteInitial + 'ContactInputName').value = '';
  document.getElementById(siteInitial + 'ContactInputEmail').value = '';
  document.getElementById(siteInitial + 'ContactInputPhone').value = '';
}

/**
 * This function valides phone number for existence and valid parameters and initializes form feedback
 *
 * @param {string} inputField - is the shortcut for the addressed message field
 * @param {string} message - defines the shown feedback
 */
function showInputMessage(inputField, message) {
  document.getElementById(inputField).innerText = message;
}

/**
 * This function resets the shown form feedback
 *
 * @param {string} inputField - defines the addressed message field
 */
function resetInputMessage(inputField) {
  document.getElementById(inputField).innerText = '';
}

/**
 * This function initializes the reset of all feedback messages on the form
 *
 * @param {string} siteInitial - defines the used template
 */
function resetAllInputMessages(siteInitial) {
  resetInputMessage(siteInitial + 'ContactMessageName');
  resetInputMessage(siteInitial + 'ContactMessageEmail');
  resetInputMessage(siteInitial + 'ContactMessagePhone');
}

/**
 * This function initializes alert border on the checked input field
 *
 * @param {string} inputContainer - defines the adressed input field
 */
function showAlertBorder(inputContainer) {
  document.getElementById(inputContainer).classList.add('alertBorder');
}

/**
 * This function initializes the reset of a single alert border
 *
 * @param {string} inputContainer - defines the adressed input field
 */
function resetAlertBorder(inputContainer) {
  document.getElementById(inputContainer).classList.remove('alertBorder');
}

/**
 * This function initializes the reset of a single alert border
 *
 * @param {string} inputContainer - defines the adressed input field
 */
function resetAllAlertBorders(siteInitial) {
  resetAlertBorder(siteInitial + 'ContactInputContainerName');
  resetAlertBorder(siteInitial + 'ContactInputContainerEmail');
  resetAlertBorder(siteInitial + 'ContactInputContainerPhone');
}

/**
 * This function initializes the focus and reset of focus border on the input fields
 *
 * @param {string} siteInitial - defines the addressed template
 * @param {string} idFocus - defines the focussed input field border
 * @param {string} idRemoveFocus - defines the set back input field border
 * @param {string} idDeleteFocus - defines the set back input field border
 */
function editFocusBorder(siteInitial, idFocus, idRemoveFocus, idDeleteFocus) {
  addFocusBorder(siteInitial, idFocus);
  removeFocusBorder(siteInitial, idRemoveFocus);
  removeFocusBorder(siteInitial, idDeleteFocus)
}

/**
 * This function adds focus border on the current used input field
 *
 * @param {string} siteInitial - defines the adressed template
 * @param {string} containerId - defines the adressed input field
 */
function addFocusBorder(siteInitial, containerId) {
  let input = document.getElementById(siteInitial + 'ContactInputContainer' + containerId);
  if (input) {
    input.classList.add('focus');
  } else {
    console.error('Input element not found!');
  }
}

/**
 * This function removes the focus border on the form
 *
 * @param {string} siteInitial - defines the addressed template
 * @param {string} containerId - defines the adressed input field
 * 
 */
function removeFocusBorder(siteInitial, containerId) {
  let input = document.getElementById(siteInitial + 'ContactInputContainer' + containerId);
  if (input.classList.contains('focus')) {
    input.classList.remove('focus');
  }
}
