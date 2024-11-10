let sortedContacts;
let listFirstChars;

/**
 *This function is the first function when page is open
 */
async function initListContact() {
  document.getElementById("listContactContainer").style.display = "flex";
  sortAllContactsFromCurrentUserAlphabetical();
  await getListFirstChars();
  renderContainerList();
}

/**
 *This function sorts all contacts from current user alphabetical
 */
function sortAllContactsFromCurrentUserAlphabetical() {
  user.contacts.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  sortedContacts = user.contacts;
}

/**
 *This function creates a list from the first chars of all names
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
 *This function renders elements of list container including desktop button
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
 *This function renders single contact cards
 * @param {string} contactCard - This is a single contact element with all informations
 * @param {string} char - This is a single letter and serves as indicator
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
 *This function initializes the loading process for single contact container
  * @param {string} contactId - This id defines the shown contact data 
 */
async function goFromListContactToShowSingleContact(contactId) {
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
    mobileBtnThreePoints;
    document.getElementById(`mobileBtnThreePoints`).style.display = "block";
    document.getElementById("singleContactCol").classList.remove("slide-in");
    document.getElementById("singleContactCol").style.display = "flex";
    document.getElementById("showSingleContactContainer").style.display = "flex";
    document.getElementById("listContactContainer").style.display = "none";
  } else {
    await loadShowSingleContact(contactId);
    document.getElementById("showSingleContactContainer").style.display = "flex";
    let singleContactCol = document.getElementById("singleContactCol");
    singleContactCol.classList.add("slide-in");
    singleContactCol.style.display = "flex";
  }
}

/**
 *This function initializes the shown templates after opening add contact container
 */
async function openAddContactContainer() {
  document.getElementById("mobileBtnAddContact").style.display = "none";
  document.getElementById("addContactContainer").style.display = "block";
  document.getElementById("addOverlayFrame").style.display = "flex";
}

/**
 *This function initializes the shown templates after opening add contact container from the desktop button
 */
function desktopOpenAddContactContainer() {
  document.getElementById("mobileBtnAddContact").style.display = "none";
  document.getElementById("addContactContainer").style.display = "block";
  document.getElementById("addOverlayFrame").style.display = "flex";
}
