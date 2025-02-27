/**
 * Adds an event listener to close lists when clicking outside of the contact or category container.
 */
function closeListener() {
  document.addEventListener("click", function (event) {
    if (userClicksOutsideOfInputField(event, "categorySelectContainer")) {
      closeCategoryWindow();
    }
    if (userClicksOutsideOfInputField(event, "fullContactContainers")) {
      closeContactWindow();
    }
  });
}

/**
 * Checks if the user clicked outside the specified container.
 */
function userClicksOutsideOfInputField(event, containerId) {
  let container = document.getElementById(containerId);
  return !container.contains(event.target);
}

/**
 * Closes the category window.
 */
function closeCategoryWindow() {
  let categoryMenu = document.getElementById("categoryMenu");
  let border = document.getElementById("categorySelectContainer");

  categoryMenu.style.display = "none";
  border.classList.remove("borderColor");
}

/**
 * Closes the contact list window.
 */
function closeContactWindow() {
  let contactList = document.getElementById("contactList");
  let contactListIcons = document.getElementById("contactListIcons");
  let border = document.getElementById("contactSelectContainer");
  let image = document.getElementById("openerAssignedTo");
  contactList.style.display = "none";
  contactListIcons.style.display = "block";
  border.classList.remove("borderColor");
  image.src = "../assets/img/add_task/arrow_drop_down.svg";
}

/**
 * Opens the contact list.
 */
function openContacts() {
  let contactList = document.getElementById("contactList");
  let contactListIcons = document.getElementById("contactListIcons");
  let border = document.getElementById(`contactSelectContainer`);
  let image = document.getElementById(`openerAssignedTo`);
  contactList.style.display = "block";
  contactListIcons.style.display = "none";
  border.classList.add("borderColor");
  image.src = "../assets/img/add_task/arrow_drop_up.svg";
  image.onclick = function () {
    closeContacts();
  };
}

/**
 * Closes the contact list.
 */
function closeContacts() {
  let mainDiv = document.getElementById(`contactList`);
  mainDiv.innerHTML = "";
  mainDiv.style.display = "none";
  let border = document.getElementById(`contactSelectContainer`);
  border.classList.remove("borderColor");
  let image = document.getElementById(`openerAssignedTo`);
  document.getElementById(`contactListIcons`).style.display = "block";
  image.src = "../assets/img/add_task/arrow_drop_down.svg";
  image.onclick = function () {
    loadContacts();
  };
}

/**
 * Loads the assigned contacts when clicking on the arrow.
 */
function loadContacts() {
  closeCategoryMenu();
  let mainDiv = document.getElementById(`contactList`);
  let totalHeight = Math.min(contacts.length * 52, 260);
  mainDiv.style.height = `${totalHeight}px`;
  for (let i = 0; i < Math.min(contacts.length); i++) {
    contactSignature = contacts[i].signature;
    contactName = contacts[i].name;
    let assignedToUser = selectedAssignedTo.find(
      (user) => user.name === contactName
    );
    if (assignedToUser) {
      mainDiv.innerHTML += loadContactsAssignedReturn(i);
      giveOnlyAssignedBg(i);
    } else {
      mainDiv.innerHTML += loadContactsReturn(i);
      iconId = document.getElementById(`ContactSignatureIcon${i}`);
      iconId.style.backgroundColor = contacts[i].userColor;
    }
  }
  if (contacts.length > 5) {
    mainDiv.style.overflowY = "scroll";
  }
  openContacts();
}

/**
 * Adds a background to the assigned contact container.
 *
 * @param {number} i - The index of the selected contact.
 */
function giveOnlyAssignedBg(i) {
  let container = document.getElementById(`assignedContactContainer${i}`);
  container.classList.add("assignedContainerBlack");
  let image = document.getElementById(`assignedContactImage${i}`);
  image.src = "../assets/img/add_task/task_box_check.svg";
  iconId = document.getElementById(`ContactSignatureIcon${i}`);
  iconId.style.backgroundColor = contacts[i].userColor;
  container.onclick = function () {
    removeAssignedToContactBg(i);
  };
}

/**
 * Filters contact names based on input letters.
 */
function filterNamesForAssignedTo() {
  let search = document
    .getElementById("assignedToContainer")
    .value.toLowerCase();
  let list = document.getElementById("contactList");
  list.innerHTML = "";
  openContacts();
  for (let i = 0; i < contacts.length; i++) {
    let name = contacts[i].name.toLowerCase();
    if (name.includes(search)) {
      list.innerHTML += filterNamesForAssignedToReturn(i);
      let iconId = document.getElementById(`ContactSignatureIcon${i}`);
      iconId.style.backgroundColor += contacts[i].userColor;
    }
  }
}

/**
 * Adds a blue border around the assigned-to input field when clicked.
 */
function onclickInputBorder() {
  let border = document.getElementById(`contactSelectContainer`);
  border.classList.add("borderColor");
}

/**
 * Changes the background color of the selected contact and creates an icon in the icon box.
 *
 * @param {number} i - The index of the selected contact.
 * @param {string} userName - The name of the contact.
 */
function assignedToContactBg(i, userName) {
  let assignetToArray = {
    name: userName,
    userColor: contacts[i].userColor,
  };
  user.contacts[i].selected = true;
  selectedAssignedTo.push(assignetToArray);
  let container = document.getElementById(`assignedContactContainer${i}`);
  let contactListIcons = document.getElementById("contactListIconsLine");
  container.classList.add("assignedContainerBlack");
  let image = document.getElementById(`assignedContactImage${i}`);
  image.src = "../assets/img/add_task/task_box_check.svg";
  let signature = document.getElementById(`ContactSignatureIcon${i}`).innerHTML;
  let userColor = contacts[i].userColor;
  contactListIcons.innerHTML += `<div id="contactIconNumber${i}" style="background-color: ${userColor};" class="assignedContactLeftSideIcon">${signature}</div>`;
  container.onclick = function () {
    removeAssignedToContactBg(i);
  };
}

/**
 * Removes the background color and checked icon of the selected contact.
 *
 * @param {number} i - The index of the contact.
 */
function removeAssignedToContactBg(i) {
  let container = document.getElementById(`assignedContactContainer${i}`);
  container.classList.remove("assignedContainerBlack");
  let image = document.getElementById(`assignedContactImage${i}`);
  image.src = "../assets/img/add_task/task_box.svg";
  let iconId = document.getElementById(`contactIconNumber${i}`);
  iconId.remove();
  let index = selectedAssignedTo.findIndex(
    (user) => user.name === contacts[i].name
  );
  if (index !== -1) {
    selectedAssignedTo.splice(index, 1);
  }
  container.onclick = function () {
    assignedToContactBg(i);
  };
}

/**
 * Clears all input fields.
 */
function clearInputs() {
  document.getElementById("titelInputContainer").value = "";
  document.getElementById("descriptionInput").value = "";
  document.getElementById("dueDateInputContainer").value = "";
  document.getElementById("assignedToContainer").value = "";
  document.getElementById("contactListIcons").innerHTML = "";
  document.getElementById("subTasksContainer").innerHTML = "";
  document.getElementById("categoryText").innerHTML = `Select task category`;
  clearVariables();
}

/**
 * Clears stored variables and removes priority selection colors.
 */
function clearVariables() {
  selectedTitle = "";
  selectedDescription = "";
  selectedAssignedTo = [];
  selectedDueDate = "";
  selectedPrio = "";
  selectedCategory = "";
  subtasks = [];
  removePrio();
  removeWhiteImg();
}

/**
 * Clears the value from the subtask input field.
 */
function clearSubtaskInputfield() {
  let input = document.getElementById(`subTaskInputfieldText`);
  input.value = "";
  container = document.getElementById(`subTaskInputfieldMenu`);
  container.innerHTML = `
  <img src="../assets/img/add_task/task_add.svg" />`;
  let border = document.getElementById(`subTaskInputContainer`);
  border.classList.remove("borderColor");
}

/**
 * Checks if required fields have values and displays the create task button if valid.
 */
function checkInputs() {
  if (mobilVersion == false) {
    let dueDateValue = document.getElementById("dueDateInputContainer").value;
    let titleValue = document.getElementById("titelInputContainer").value;
    let isCategoryValid = checkCategory();
    let createTaskButton = document.getElementById("createTaskButton");
    let placeholder = document.getElementById(`placeholder`);
    if (
      dueDateValue.trim() !== "" &&
      titleValue.trim() !== "" &&
      isCategoryValid
    ) {
      createTaskButton.style.display = "block";
      placeholder.style.display = "none";
    } else {
      createTaskButton.style.display = "none";
      placeholder.style.display = "block";
    }
  }
}

/**
 * Creates the footer for the desktop version.
 */
function footer() {
  let content = document.getElementById(`taskMainContainer`);
  footer.remove;
  content.innerHTML += footerReturn();
}

/**
 * Creates the footer for the mobile version.
 */
function footerMobile() {
  let content = document.getElementById(`taskMainContainer`);
  footer.remove;
  content.innerHTML += footerMobileReturn();
}
