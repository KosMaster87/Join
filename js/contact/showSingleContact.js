/**
 * This function is the first function when open the page
 */
async function loadShowSingleContact(contactId) {
  await getCurrentContact(contactId);
  await fillAllVariables(contactId);
  await setContactId(contactId);
  await getContactId();
}

/**
 * This function makes the email all available 
 *
 * @param {string} email - is the email from the current contact
 */
async function setCurrentContactEmail(email) {
  await setItem("currentContactEmail", email);
}

/**
 * This function calls up the available email from the current contact
 */
async function getCurrentContactEmail() {
  return await getItem('currentContactEmail');
}

/**
 * This function renders all contact infos from current contact 
 * @param {string} contactId - is the id from current contact
 */
async function getCurrentContact(contactId) {
  let contacts = user.contacts;
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    if (contact.contactId === contactId) {
      return user.contacts[i];
    } else {
    }
  }
}

/**
 * This function fills all variables for show single contact
 *@param {string} contactId - is the current used contact id
 */
async function fillAllVariables(contactId) {
  let contact = await getCurrentContact(contactId);
  document.getElementById('singleContactName').innerText = contact.name;
  
  importExistentVariable('singleContactPhone', 'innerText', contact.phone);
  importExistentVariable('singleContactEmail', 'innerText', contact.email);
  document.getElementById('singleContactSignature').innerText = contact.signature;
  document.getElementById('singleContactSignature').style.backgroundColor = contact.userColor;

  if (contact.email) {
    setCurrentContactEmail(contact.email);
  }
}

/**
 * This function opens the email programme with stored email address
 */
async function openEmailProgram() {
  let email = await getCurrentContactEmail();
  window.open('mailto: ' + email);
}

/**
 * This function creates id's, css rules and input for html-id's 
 * @param {string} id - implements the id where information is transferred 
 * @param {string} variableHtml - defines html-variables  
 * @param {string} input - defines the information to transfer
 */
async function importExistentVariable(id, variableHtml, input) {
  if (input) {
    document.getElementById(id)[variableHtml] = input;
  }
}

/**
 * This function initializes list contact after closing single contact
 */
async function goFromSingleContactToListContactContainer() {
  await initListContact();
  await setContactId([]);
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("addContactContainer").style.display = "none";
  document.getElementById("listContactContainer").style.display = "flex";
  document.getElementById("mobileBtnAddContact").style.display = "block";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("mobileBtnThreePoints").style.display = "none";
}

/**
 * This function initializes all templates for editing contacts
 */
async function goFromShowSingleContactToEditContact() {
  let contactId = await getContactId();
  initEditContact(contactId);
  document.getElementById("mobileBtnThreePoints").style.display = "none";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("listContactContainer").style.display = "none";
  document.getElementById("editContactContainer").style.display = "block";
  document.getElementById("editOverlayFrame").style.display = "flex";
}

/**
 * This function closes single contact container and initializes mobile button for adding contacts
 */
function closeShowSingleContactContainer() {
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "block";
}

/**
 * This function initializes templates for changing button from three point button to select options
 */
function showMobileSelectBtns() {
  document.getElementById("mobileBtnThreePoints").style.display = "none";
  document.getElementById("mobileBtnSelectOptions").style.display = "block";
}

/**
 * This function initializes all templates for opening edit contact container
 */
async function openEditContactContainer() {
  await initEditContact()
  document.getElementById("editContactContainer").style.display = "block";
  document.getElementById("editOverlayFrame").style.display = "block";
  document.getElementById("mobileBtnAddContact").style.display = "none";
}

/**
 * This function initializes deleting process and shown templates
 */
async function deleteContactAtSingleContactDestkop() {
  await deleteContact();
  await initListContact();
  document.getElementById("mobileBtnThreePoints").style.display = "none";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("showSingleContactContainer").style.display = "flex";
  document.getElementById("listContactContainer").style.display = "flex";
  document.getElementById("singleContactCol").style.display = "none";
}

/**
 * This function initializes templates for opening edit contact 
 */
async function openEditContactAtSingleContactDesktop() {
  await initEditContact();
  document.getElementById("editContactContainer").style.display = "block";
  document.getElementById("editOverlayFrame").style.display = "block";
  document.getElementById("mobileBtnAddContact").style.display = "none";
}

/**
 * This function initializes shown templates after deleting contact
 */
async function deleteContactAtShowSingleContactMobile() {
  await getContactId();
  await deleteContact();
  startPageUpdate();
  await initListContact();
  document.getElementById("mobileBtnThreePoints").style.display = "none";
  document.getElementById("mobileBtnSelectOptions").style.display = "none";
  document.getElementById("showSingleContactContainer").style.display = "none";
  document.getElementById("listContactContainer").style.display = "flex";
  document.getElementById("singleContactCol").style.display = "none";
}
