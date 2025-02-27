let sortedContacts;
let listFirstChars;

/**
 * This function is the first function called when the page is opened.
 * It initializes the contact list container, sorts the contacts alphabetically,
 * and retrieves the first characters of all contacts' names.
 */
async function initListContact() {
  document.getElementById("listContactContainer").style.display = "flex";
  sortAllContactsFromCurrentUserAlphabetical();
  await getListFirstChars();
  renderContainerList();
}

/**
 * This function sorts all contacts of the current user alphabetically by name.
 */
function sortAllContactsFromCurrentUserAlphabetical() {
  if (
    !user.contacts ||
    !Array.isArray(user.contacts) ||
    user.contacts.length === 0
  ) {
    sortedContacts = [];
    return;
  }

  user.contacts.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    return nameA.localeCompare(nameB);
  });

  sortedContacts = user.contacts;
}

/**
 * This function creates a list of the first characters from all contacts' names.
 * It generates a unique set of first characters and sorts them alphabetically.
 *
 * @returns {Promise} Resolves once the list of first characters is created.
 */
async function getListFirstChars() {
  let setFirstChars = new Set();
  listFirstChars = [];
  for (let i = 0; i < sortedContacts.length; i++) {
    let signs = sortedContacts[i]["signature"];
    setFirstChars.add(signs.charAt(0));
  }
  return (listFirstChars = Array.from(setFirstChars).sort());
}

/**
 * This function renders the contact list container, including the desktop button
 * to add a new contact. It iterates through the first characters of contact names
 * and renders them alphabetically.
 */
function renderContainerList() {
  let charRow = document.getElementById("listContactContainer");
  charRow.innerHTML = "";
  charRow.innerHTML = `
  <div class="centerDesktopAdd">
  <a id="desktopBtnAddContact" onclick="desktopOpenAddContactContainer()">
        <div class="desktopBtnIntern">
          <span class="desktopBtnAddContactText">Add new contact</span>
          <img class="desktopBtnAddContactIcon" src="../assets/img/addContact/person_add.svg">
        </div>
      </a>
      </div>
  `;

  for (let i = 0; i < listFirstChars.length; i++) {
    let char = listFirstChars[i];
    charRow.innerHTML += `
            <div class="alphabeticalRow">
                <div class="firstChartSort">
                    ${char}
                </div>
            </div>
            <div class="styleHr"></div>
         `;
    renderContactCards(charRow, char);
  }
}

/**
 * This function renders the individual contact cards for each contact.
 * It matches contacts to their corresponding first letter and creates HTML elements
 * for each contact with all relevant information.
 *
 * @param {HTMLElement} contactCard - The container element where contact cards will be rendered.
 * @param {string} char - The first character of the contact's name used to categorize contacts.
 */
async function renderContactCards(contactCard, char) {
  let sign = char;
  for (let i = 0; i < user.contacts.length; i++) {
    let contact = user.contacts[i];
    if (contact["name"].charAt(0).toUpperCase() === sign) {
      contactCard.innerHTML += `
            <a id="singleContactBtn${contact["contactId"]}" class="singleContact" onclick="goFromListContactToShowSingleContact('${contact["contactId"]}')">
                <div class="contactSignatureIcon" style="background-color:  ${contact["userColor"]}">
                    <span class="contactSignatureIconLetter">
                        ${contact["signature"]}
                    </span>
                </div>
                <div id="contactData">
                  <div class="contactName">
                    ${contact["name"]}
                </div>
                <div class="contactEmail">
                    ${contact["email"]}
                </div>
            </div>
        </div>`;
    }
  }
}

/**
 * This function initializes the loading process for a single contact container.
 * It displays the contact's details and updates the user interface based on screen size.
 *
 * @param {string} contactId - The ID of the contact to be displayed.
 */
async function goFromListContactToShowSingleContact(contactId) {
  currentContactId = contactId;
  document.getElementById("mobileBtnAddContact").style.display = "none";
  const allButtons = document.querySelectorAll(".singleContact");
  allButtons.forEach((button) => {
    button.classList.remove("active");
  });

  let id = "singleContactBtn" + contactId;
  document.getElementById(id).classList.add("active");
  let screenwidth = window.innerWidth;

  if (screenwidth < 1200) {
    await loadShowSingleContact(contactId);
    document.getElementById(`mobileBtnThreePoints`).style.display = "block";
    document.getElementById("singleContactCol").classList.remove("slide-in");
    document.getElementById("singleContactCol").style.display = "flex";
    document.getElementById("showSingleContactContainer").style.display =
      "flex";
    document.getElementById("listContactContainer").style.display = "none";
  } else {
    await loadShowSingleContact(contactId);
    document.getElementById("showSingleContactContainer").style.display =
      "flex";
    let singleContactCol = document.getElementById("singleContactCol");
    singleContactCol.classList.add("slide-in");
    singleContactCol.style.display = "flex";
  }
}

/**
 * This function initializes the templates that should be shown when the "Add Contact" container is opened.
 */
async function openAddContactContainer() {
  document.getElementById("mobileBtnAddContact").style.display = "none";
  document.getElementById("addContactContainer").style.display = "block";
  document.getElementById("addOverlayFrame").style.display = "flex";
}

/**
 * This function opens the "Add Contact" container when triggered from the desktop button.
 */
function desktopOpenAddContactContainer() {
  document.getElementById("mobileBtnAddContact").style.display = "none";
  document.getElementById("addContactContainer").style.display = "block";
  document.getElementById("addOverlayFrame").style.display = "flex";
}
