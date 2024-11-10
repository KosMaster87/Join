/**
 * This function is the first function when open site
 */
async function initEditContact() {
  await getCurrentContactNew();
  await initializeAllVariables();
}

/**
 * This function initializes all variables
 */
async function initializeAllVariables() {
  let contact = await getCurrentContactNew();
  let signature = contact.signature;
  document.getElementById("editContactInputName").value = contact.name;
  document.getElementById("editContactInputEmail").value = contact.email;
  document.getElementById("editContactInputPhone").value = contact.phone;
  document.getElementById("editContactHeaderSignature").innerText = signature;
  document.getElementById("editContactHeaderSignature").style.backgroundColor = contact.userColor;
  document.getElementById("editContactBodySignature").innerText = signature;
  document.getElementById("editContactBodySignature").style.backgroundColor = contact.userColor;
}



/**
 * This function deletes contact
 */
async function deleteContact() {
  let contactId = await getContactId();
  let contacts = await user.contacts;
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    if (contact["contactId"] === contactId) {
      contacts.splice(i, 1);
    }
  }

  await setItem("users", JSON.stringify(users));
  await setContactId([]);
}

/**
 * This function generates all necessary contact infos from current contact
 */
async function getCurrentContactNew() {
  let contactId = await getContactId();
  let contacts = await user.contacts;
  if (contactId) {
    let contact = contacts.find((contact) => contact.contactId === contactId);
    if (contact) {
      return contact;
    } else {
    }
  } else {
  }
}

/**
 * This function saves changed contact
 */
async function saveChangesAtEditContact() {
  let currentContact = await getCurrentContactNew();
  let inputContactId = await getContactId();
  let inputUserId = await user.email;
  let contacts = await user.contacts;
  let inputUserColor = await currentContact.userColor;
  let inputName = document.getElementById("editContactInputName").value.trim();
  let inputPhone = document.getElementById("editContactInputPhone").value.trim();
  let inputEmail = document.getElementById("editContactInputEmail").value.trim();
  let inputSignature = getSignature(inputName);

  if (checkAllInputFields("edit", inputName, inputEmail, inputPhone) === true) {
    if (inputContactId) {
      for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        if (contact.contactId === inputContactId) {
          (user.contacts[i].contactId = inputContactId),
            (user.contacts[i].userId = inputUserId),
            (user.contacts[i].name = inputName),
            (user.contacts[i].email = inputEmail),
            (user.contacts[i].phone = inputPhone),
            (user.contacts[i].signature = inputSignature);
          user.contacts[i].userColor = inputUserColor;

          await setItem("users", JSON.stringify(users));
          await editContactIsSavedGoToSingleContact();
        } else {
        }
      }
    } else {
    }
  }
}

/**
 * This function initializes single contact considering screenwidth 
 */
async function editContactIsSavedGoToSingleContact() {
  let contactId = await getContactId();
  let screenWidth = window.innerWidth;
  await loadShowSingleContact(contactId);
  if (screenWidth < 1200) {
    document.getElementById("listContactContainer").style.display = "none";
    document.getElementById("editContactContainer").style.display = "none";
    document.getElementById("mobileBtnAddContact").style.display = "none";
    document.getElementById("mobileBtnThreePoints").style.display = "block";
    document.getElementById("showSingleContactContainer").style.display = "block";
  } else {
    await initListContact();
    document.getElementById("showSingleContactContainer").style.display = "flex";
    document.getElementById("editContactContainer").style.display = "none";
    document.getElementById("singleContactCol").style.display = "flex";
  }
}

/**
 * This function initialize delete contact and renders necessary templates to display
 */
async function goFromDeleteContactToListContact() {
  await setContactId([]);
  await deleteContact();
  await initListContact();
  document.getElementById("editContactContainer").style.display = "none";
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("listContactContainer").style.display = "flex";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "block";
}

/**
 * This function closes add contact form without saving
 */
async function desktopCloseAddContactContainerWithoutAddingNewContact() {
  document.getElementById("editContactContainer").style.display = "none";
  document.getElementById("showSingleContactContainer").style.display = "flex";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "none";
}

/**
 * This function initializes save process from desktop button
 */
async function saveChangesDesktop() {
  let contactId = await getContactId();
  await saveChangesAtEditContact();
  let finalId = "singleContactBtn" + contactId;
  document.getElementById(finalId).classList.add("active");
}

/**
 * This function initializes delete process and prepares the necessary templates to display
 */
async function deleteAtEditContactDesktop() {
  await deleteContact();
  await initListContact();
  await setContactId([]);
  document.getElementById("editContactContainer").style.display = "none";
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("listContactContainer").style.display = "flex";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "block";
}

/**
 * This function initializes save process from mobile button
 */
async function saveChangesAtEditContactMobile() {
  await saveChangesAtEditContact();
}
