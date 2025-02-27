/**
 * Initializes the contact edit process when the site is first opened.
 * This is the entry point for setting up the contact editing interface.
 */
async function initEditContact() {
  await initializeAllVariables();
}

/**
 * Initializes all necessary variables and populates the contact form with current contact information.
 */
async function initializeAllVariables() {
  let contact = await getCurrentContactNew();
  let signature = contact.signature;
  document.getElementById("editContactInputName").value = contact.name;
  document.getElementById("editContactInputEmail").value = contact.email;
  document.getElementById("editContactInputPhone").value = contact.phone;
  document.getElementById("editContactHeaderSignature").innerText = signature;
  document.getElementById("editContactHeaderSignature").style.backgroundColor =
    contact.userColor;
  document.getElementById("editContactBodySignature").innerText = signature;
  document.getElementById("editContactBodySignature").style.backgroundColor =
    contact.userColor;
}

/**
 * Retrieves the current contact based on the current contact ID.
 * @returns {Object|null} The current contact object or null if not found.
 */
async function getCurrentContactNew() {
  let contacts = user.contacts || [];
  let contact = contacts.find((c) => c.contactId === currentContactId);

  return contact || null;
}

/**
 * Saves the changes made to the contact form and updates the contact information in the user’s contacts.
 */
async function saveChangesAtEditContact() {
  let inputName = document.getElementById("editContactInputName").value.trim();
  let inputEmail = document
    .getElementById("editContactInputEmail")
    .value.trim();
  let inputPhone = document
    .getElementById("editContactInputPhone")
    .value.trim();
  let inputSignature = getSignature(inputName);

  if (!checkAllInputFields("edit", inputName, inputEmail, inputPhone)) {
    return;
  }

  const collection = user.isGuest ? "guests" : "users";
  let currentContact = user.contacts.find(
    (contact) => contact.contactId === currentContactId
  );

  if (!currentContact) {
    return;
  }

  let inputUserColor = currentContact.userColor || "var(--default-color)";
  currentContact.name = inputName;
  currentContact.email = inputEmail;
  currentContact.phone = inputPhone;
  currentContact.signature = inputSignature;
  currentContact.userColor = inputUserColor;

  await setItem(collection, user.id, { contacts: user.contacts });
  await editContactIsSavedGoToSingleContact();
}

/**
 * Initializes the process to navigate to the single contact view after saving changes.
 * Adjusts the display based on the screen width.
 */
async function editContactIsSavedGoToSingleContact() {
  let contactId = currentContactId;
  let screenWidth = window.innerWidth;

  await loadShowSingleContact(contactId);
  if (screenWidth < 1200) {
    document.getElementById("listContactContainer").style.display = "none";
    document.getElementById("editContactContainer").style.display = "none";
    document.getElementById("mobileBtnAddContact").style.display = "none";
    document.getElementById("mobileBtnThreePoints").style.display = "block";
    document.getElementById("showSingleContactContainer").style.display =
      "block";
  } else {
    await initListContact();
    document.getElementById("showSingleContactContainer").style.display =
      "flex";
    document.getElementById("editContactContainer").style.display = "none";
    document.getElementById("singleContactCol").style.display = "flex";
  }
}

/**
 * Deletes a contact by finding it in the user’s contacts and removing it.
 * @param {string} currentContactId - The ID of the contact to delete.
 */
async function deleteContact(currentContactId) {
  let contacts = user.contacts;
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].contactId === currentContactId) {
      contacts.splice(i, 1);
    }
  }
  await setItem(user.isGuest ? "guests" : "users", user.id, { contacts });
}

/**
 * Navigates from the contact deletion process back to the contact list view.
 */
async function goFromDeleteContactToListContact() {
  await deleteContact();
  await initListContact();
  document.getElementById("editContactContainer").style.display = "none";
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("listContactContainer").style.display = "flex";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "block";
}

/**
 * Closes the edit contact window and returns to the contact list view.
 */
async function closeEditContactWindow() {
  document.getElementById("editContactContainer").style.display = "none";
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("listContactContainer").style.display = "flex";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "block";
}

/**
 * Closes the add contact form without saving any changes.
 */
async function desktopCloseAddContactContainerWithoutAddingNewContact() {
  document.getElementById("editContactContainer").style.display = "none";
  document.getElementById("showSingleContactContainer").style.display = "flex";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "none";
}

/**
 * Saves the changes made to the contact when the save button is clicked on a desktop.
 */
async function saveChangesDesktop() {
  await saveChangesAtEditContact();
  let finalId = "singleContactBtn" + currentContactId;
  document.getElementById(finalId).classList.add("active");
  goFromSingleContactToListContactContainer();
}

/**
 * Saves the changes made to the contact when the save button is clicked on a mobile.
 */
async function saveChangesAtEditContactMobile() {
  await saveChangesAtEditContact();
  goFromSingleContactToListContactContainer();
}

/**
 * Deletes a contact from the edit screen and prepares the templates for the list contact view.
 * @param {string} currentContactId - The ID of the contact to delete.
 */
async function deleteAtEditContactDesktop(currentContactId) {
  await deleteContact(currentContactId);
  await initListContact();
  document.getElementById("editContactContainer").style.display = "none";
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("listContactContainer").style.display = "flex";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "block";
}
