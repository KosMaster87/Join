const contactColors = [
  "var(--red)",
  "var(--yellow)",
  "var(--orangeIcons)",
  "var(--green)",
  "var(--pink)",
  "var(--mintGreen)",
];

/**
 * This function is the first function when you open the page.
 * It initializes the add contact process by resetting the input fields, messages, and alert borders,
 * and setting the focus border to the "Name", "Email", and "Phone" fields.
 */
async function initAddContact() {
  resetInputFields();
  resetAllInputMessages();
  resetAllAlertBorders();
  editFocusBorder("add", "Name", "Email", "Phone");
}

/**
 * This function initializes the saving process when adding a contact.
 * It retrieves the input values for name, email, and phone,
 * checks if all fields are valid, saves the contact, and reloads the tasks list.
 */
async function initSaveProcess() {
  let name = document.getElementById("addContactInputName").value.trim();
  let email = document.getElementById("addContactInputEmail").value.trim();
  let phone = document.getElementById("addContactInputPhone").value.trim();

  if (checkAllInputFields("add", name, email, phone) === true) {
    await saveContactAddContact(name, email, phone);
    await addContactIsSavedGoToSingleContact();
    resetInputFields("add");
  } else {
    disableSaveProcess();
  }
}

/**
 * This function retrieves all contacts for the current user.
 *
 * @returns {Promise} - A promise that resolves with the user's contacts.
 */
async function getAllContactsFromCurrentUser() {
  return await getAllContactsFromCurrentUserSorted();
}

/**
 * This function initializes the template for the 'overlayContactIsCreated' animation.
 * It displays the overlay, adds an animation class, and hides the overlay after 3 seconds.
 */
function initializeOverlayContactIsCreated() {
  let overlay = document.getElementById("overlayContactIsCreated");
  overlay.style.display = "flex";
  overlay.classList.add("slideInAnimation");
  document.getElementById("overlayContactIsCreated").style.display = "flex";
  setTimeout(function () {
    overlay.style.display = "none";
  }, 3000);
}

/**
 * This function saves the newly added contact to the backend.
 * It creates a new contact or updates an existing one based on the provided name, email, and phone.
 *
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 */
async function saveContactAddContact(name, email, phone) {
  if (!user) {
    return;
  }

  if (!user.contacts) {
    user.contacts = [];
  }

  let contact = user.contacts.find((c) => c.email === email);
  let contactId = contact ? contact.contactId : generateRandomId();
  let userColor = contact ? contact.userColor : getRandomColor(contactColors);
  let signature = contact ? contact.signature : getSignature(name);
  let updatedContact = {
    userId: user.email,
    contactId: contactId,
    name: name,
    email: email,
    phone: phone,
    userColor: userColor,
    signature: signature,
  };

  if (contact) {
    let index = user.contacts.findIndex((c) => c.contactId === contactId);
    user.contacts[index] = updatedContact;
  } else {
    user.contacts.push(updatedContact);
  }

  const collection = user.isGuest ? "guests" : "users";

  await setItem(collection, user.id, { contacts: user.contacts });
  initializeOverlayContactIsCreated();
}

/**
 * This function generates a random color from the given array of user colors.
 *
 * @param {Array} userColors - An array of color strings.
 * @returns {string} - A random color from the array.
 */
function getRandomColor(userColors) {
  let randomIndex = Math.floor(Math.random() * userColors.length);
  let randomColor = userColors[randomIndex];

  return randomColor;
}

/**
 * This function generates a random ID for contacts.
 *
 * @returns {string} - A randomly generated ID.
 */
function generateRandomId() {
  let id = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!/%?";
  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    id += chars[randomIndex];
  }

  return id;
}

/**
 * This function disables the save process and shows the add contact form.
 */
function disableSaveProcess() {
  document.getElementById("addContactContainer").style.display = "block";
}

/**
 * This function handles the transition to displaying a single contact view after a contact has been saved.
 *
 * @param {string} contactId - The ID of the contact to display.
 */
async function closeAddContactAndGoToShowSingleContactContainer(contactId) {
  loadShowSingleContact(contactId);
  document.getElementById("addContactContainer").style.display = "none";
  document.getElementById("listContactContainer").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "none";
  document.getElementById("mobileBtnThreePoints").style.display = "block";
  document.getElementById("showSingleContactContainer").style.display = "block";
}

/**
 * This function handles the transition to the list of contacts after closing the add contact container without saving.
 */
async function closeAddContactContainerWithoutAddingNewContact() {
  await initListContact();
  document.getElementById("addContactContainer").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "block";
  document.getElementById("overlayFrame").style.display = "none";
}

/**
 * This function closes the add contact container without saving, updating the display as necessary.
 */
async function closeAddContactContainerDesktop() {
  resetInputFields("add");
  editFocusBorder("add", "Name", "Email", "Phone");
  resetAllInputMessages("add");
  resetAllAlertBorders("add");
  await initListContact();
  document.getElementById("addContactContainer").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "none";
  document.getElementById("showSingleContactContainer").style.display = "flex";
  document.getElementById("singleContactCol").style.display = "none";
}

/**
 * This function closes the add contact container without saving and updates the display for mobile view.
 */
async function closeAddContactContainer() {
  resetInputFields("add");
  editFocusBorder("add", "Name", "Email", "Phone");
  resetAllInputMessages("add");
  resetAllAlertBorders("add");
  await initListContact();
  document.getElementById("addContactContainer").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "block";
}

/**
 * This function initializes the save process from the desktop button and then navigates to the list of contacts.
 */
async function saveContactAtAddContactDesktop() {
  await initSaveProcess();
  goFromSingleContactToListContactContainer();
}

/**
 * This function initializes the save process from the mobile button and then navigates to the list of contacts.
 */
async function saveContactAtAddContactMobile() {
  await initSaveProcess();
  goFromSingleContactToListContactContainer();
}

/**
 * This function handles the transition to displaying a single contact after saving the contact,
 * updating the display depending on the screen size.
 */
async function addContactIsSavedGoToSingleContact() {
  let screenwidth = window.innerWidth;

  await loadShowSingleContact(currentContactId);

  if (screenwidth < 1200) {
    document.getElementById("listContactContainer").style.display = "none";
    document.getElementById("addContactContainer").style.display = "none";
    document.getElementById("mobileBtnAddContact").style.display = "none";
    document.getElementById("mobileBtnThreePoints").style.display = "block";
    document.getElementById("showSingleContactContainer").style.display =
      "flex";
  } else {
    await initListContact();
    document.getElementById("listContactContainer").style.display = "flex";
    document.getElementById("showSingleContactContainer").style.display =
      "flex";
    document.getElementById("addContactContainer").style.display = "none";
    document.getElementById("mobileBtnAddContact").style.display = "none";
    document.getElementById("singleContactCol").style.display = "flex";
  }
}
