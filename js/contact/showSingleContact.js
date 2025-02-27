let currentContactId = null;

/**
 * Initializes the page by loading the specified contact's information.
 *
 * @async
 * @function loadShowSingleContact
 * @param {string} contactId - The ID of the contact to be loaded.
 */
async function loadShowSingleContact(contactId) {
  await getCurrentContact(contactId);
  await fillAllVariables(contactId);
}

/**
 * Sets the current contact's email for either guests or users.
 *
 * @async
 * @function setCurrentContactEmail
 * @param {string} email - The email address of the current contact.
 */
async function setCurrentContactEmail(email) {
  if (user.isGuest) {
    await setItem("guests", user.id, { currentContactEmail: email });
  } else {
    await setItem("users", user.id, { currentContactEmail: email });
  }
}

/**
 * Retrieves the current contact based on the given contact ID.
 *
 * @async
 * @function getCurrentContact
 * @param {string} contactId - The ID of the contact to retrieve.
 * @returns {Object|null} The contact object if found, otherwise null.
 */
async function getCurrentContact(contactId) {
  if (!user || !user.contacts) {
    return null;
  }

  let contacts = user.contacts;
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    if (contact.contactId === contactId) {
      return contact;
    }
  }

  return null;
}

/**
 * Fills the necessary HTML elements with the current contact's information.
 *
 * @async
 * @function fillAllVariables
 * @param {string} contactId - The ID of the contact to fill the information for.
 */
async function fillAllVariables(contactId) {
  if (!contactId) {
    return;
  }

  let contact = user.contacts?.find((c) => c.contactId === contactId);

  if (!contact) {
    return;
  }

  document.getElementById("singleContactName").innerText =
    contact.name || "Unbekannt";

  importExistentVariable(
    "singleContactPhone",
    "innerText",
    contact.phone || "Keine Nummer"
  );
  importExistentVariable(
    "singleContactEmail",
    "innerText",
    contact.email || "Keine E-Mail"
  );

  document.getElementById("singleContactSignature").innerText =
    contact.signature || "";
  document.getElementById("singleContactSignature").style.backgroundColor =
    contact.userColor || "#ccc";
}

/**
 * Opens the email program with the current contact's email address.
 *
 * @async
 * @function openEmailProgram
 * @param {string} currentContactId - The ID of the current contact.
 */
async function openEmailProgram(currentContactId) {
  let email = await getCurrentContactEmail(currentContactId);

  if (!email) {
    return;
  }

  window.open("mailto:" + email);
}

/**
 * Retrieves the current contact's email address based on the contact ID.
 *
 * @async
 * @function getCurrentContactEmail
 * @param {string} currentContactId - The ID of the current contact.
 * @returns {string|null} The email address of the current contact if found, otherwise null.
 */
async function getCurrentContactEmail(currentContactId) {
  if (!user || !user.contacts) {
    return null;
  }

  let contact = user.contacts.find((c) => c.contactId === currentContactId);

  if (!contact || !contact.email) {
    return null;
  }

  return contact.email;
}

/**
 * Imports an existing variable into the specified HTML element.
 *
 * @async
 * @function importExistentVariable
 * @param {string} id - The ID of the HTML element to update.
 * @param {string} variableHtml - The HTML property to set (e.g., 'innerText').
 * @param {string} input - The information to transfer to the HTML element.
 */
async function importExistentVariable(id, variableHtml, input) {
  if (input) {
    document.getElementById(id)[variableHtml] = input;
  }
}

/**
 * Initializes the contact list after closing the single contact view.
 *
 * @async
 * @function goFromSingleContactToListContactContainer
 */
async function goFromSingleContactToListContactContainer() {
  await initListContact();

  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("addContactContainer").style.display = "none";
  document.getElementById("listContactContainer").style.display = "flex";
  document.getElementById("mobileBtnAddContact").style.display = "block";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("mobileBtnThreePoints").style.display = "none";
}

/**
 * Initializes all templates for editing contacts.
 *
 * @async
 * @function goFromShowSingleContactToEditContact
 */
async function goFromShowSingleContactToEditContact() {
  document.getElementById("mobileBtnThreePoints").style.display = "none";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("listContactContainer").style.display = "none";
  document.getElementById("editContactContainer").style.display = "block";
  document.getElementById("editOverlayFrame").style.display = "flex";
}

/**
 * Closes the single contact container and shows the mobile button for adding contacts.
 *
 * @function closeShowSingleContactContainer
 */
function closeShowSingleContactContainer() {
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "block";
}

/**
 * Initializes templates for changing the button from the three-point button to select options.
 *
 * @function showMobileSelectBtns
 */
function showMobileSelectBtns() {
  document.getElementById("mobileBtnThreePoints").style.display = "none";
  document.getElementById("mobileBtnSelectOptions").style.display = "block";
}

/**
 * Initializes all templates for opening the edit contact container.
 *
 * @async
 * @function openEditContactContainer
 */
async function openEditContactContainer() {
  await initEditContact();
  document.getElementById("editContactContainer").style.display = "block";
  document.getElementById("editOverlayFrame").style.display = "block";
  document.getElementById("mobileBtnAddContact").style.display = "none";
}

/**
 * Initializes the deleting process and shows relevant templates.
 *
 * @async
 * @function deleteContactAtSingleContactDesktop
 * @param {string} currentContactId - The ID of the contact to be deleted.
 */
async function deleteContactAtSingleContactDesktop(currentContactId) {
  await deleteContact(currentContactId);
  await initListContact();

  document.getElementById("mobileBtnThreePoints").style.display = "none";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("showSingleContactContainer").style.display = "flex";
  document.getElementById("listContactContainer").style.display = "flex";
  document.getElementById("singleContactCol").style.display = "none";

  goFromSingleContactToListContactContainer();
}

/**
 * Initializes templates for opening the edit contact view from single contact.
 *
 * @async
 * @function openEditContactAtSingleContactDesktop
 * @param {string} contactId - The ID of the contact to be edited.
 */
async function openEditContactAtSingleContactDesktop(contactId) {
  if (!contactId) {
    return;
  }

  currentContactId = contactId; // Speichere die aktuelle Kontakt-ID

  await initEditContact();
  document.getElementById("editContactContainer").style.display = "block";
  document.getElementById("editOverlayFrame").style.display = "block";
  document.getElementById("mobileBtnAddContact").style.display = "none";
}

/**
 * Initializes templates shown after deleting a contact.
 *
 * @async
 * @function deleteContactAtShowSingleContactMobile
 * @param {string} currentContactId - The ID of the contact to be deleted.
 */
async function deleteContactAtShowSingleContactMobile(currentContactId) {
  await deleteContact(currentContactId);
  await initListContact();
  document.getElementById("mobileBtnThreePoints").style.display = "none";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("listContactContainer").style.display = "flex";
  document.getElementById("singleContactCol").style.display = "none";

  goFromSingleContactToListContactContainer();
}
