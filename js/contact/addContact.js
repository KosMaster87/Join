const contactColors = [
  "var(--red)",
  "var(--yellow)",
  "var(--orangeIcons)",
  "var(--green)",
  "var(--pink)",
  "var(--mintGreen)",
];

/**
 * This function is the first function when you open the page
 */
async function initAddContact() {
  await setContactId([]);
  resetInputFields();
  resetAllInputMessages();
  resetAllAlertBorders();
  editFocusBorder("add", "Name", "Email", "Phone");
} 

/**
 * This function initialize the saving Process
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
 * This function provides all contacts from current User
 */
async function getAllContactsFromCurrentUser() {
  return await getAllContactsFromCurrentUserSorted();
}

/**
 * This function initializes the template 'overlayContactIsCreated'
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
 * This function saves the new added contact at the backend
 */
async function saveContactAddContact(name, email, phone) {
  let contactId = generateRandomId();
  let userColor = getRandomColor(contactColors);
  let signature = getSignature(name);
  let currentusers = users;
  for (let i = 0; i < currentusers.length; i++) {
    if (currentusers[i].email === user.email) {
      let contact = {
        userId: user.email,
        contactId: contactId,
        name: name,
        email: email,
        phone: phone,
        userColor: userColor,
        signature: signature,
      };
      user.contacts.push(contact);
    }
  }
  await setItem("users", users);
  await setContactId(contactId);
  initializeOverlayContactIsCreated();
}

/**
 * This function creates a random color
 */
function getRandomColor(userColors) {
  let randomIndex = Math.floor(Math.random() * userColors.length);
  let randomColor = userColors[randomIndex];

  return randomColor;
}

/**
 * This function creates an randomId for contacts
 */
function generateRandomId() {
  let id = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!/%?";
  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    id += chars[randomIndex];
  }

  return id;
}

/**
 * This function shows the form add contact, if saving process is disabled
 */
function disableSaveProcess() {
  document.getElementById("addContactContainer").style.display = "block";
}

/**
 * This function generates all necessary templates for display
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
 * This function generates all necessary templates for display after close addContactContainer without saving
 */
async function closeAddContactContainerWithoutAddingNewContact() {
  await initListContact();
  document.getElementById("addContactContainer").style.display = "none";
  document.getElementById("mobileBtnAddContact").style.display = "block";
  document.getElementById("overlayFrame").style.display = "none";
}

/**
 * This function generates all necessary 
 * templates for display after close addContactContainer without saving
 * from the desktop button
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
 * This function generates all necessary 
 * templates for display after close addContactContainer without saving
 * from the desktop button
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
 * This function initializes saving process from the desktop button
 */
async function saveContactAtAddContactDesktop() {
  await initSaveProcess();
}

/**
 * This function initialize saving process from the mobile button
 */
async function saveContactAtAddContactMobile() {
  await initSaveProcess();
}

/**
 * This function generates all necessary 
 * templates for display after saving contact and initialising next template function
 */
async function addContactIsSavedGoToSingleContact() {
  let contactId = await getContactId();
  let screenwidth = window.innerWidth;
  await loadShowSingleContact(contactId);
  if (screenwidth < 1200) {
    document.getElementById("listContactContainer").style.display = "none";
    document.getElementById("addContactContainer").style.display = "none";
    document.getElementById("mobileBtnAddContact").style.display = "none";
    document.getElementById("mobileBtnThreePoints").style.display = "block";
    document.getElementById("showSingleContactContainer").style.display = "flex";

  } else {
    await initListContact();
    document.getElementById("listContactContainer").style.display = "flex";
    document.getElementById("showSingleContactContainer").style.display = "flex";
    document.getElementById("addContactContainer").style.display = "none";
    document.getElementById("mobileBtnAddContact").style.display = "none";
    document.getElementById("singleContactCol").style.display = "flex";
  }
}
