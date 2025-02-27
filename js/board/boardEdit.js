let switchTaskTriggered = false;

/**
 * Load the assigned contacts for a task.
 *
 * @param {string} i - The number of the task
 */
async function loadContacts(i) {
  let mainDiv = document.getElementById(`contactList`);
  let totalHeight = Math.min(user.contacts.length * 52, 260);
  mainDiv.style.height = `${totalHeight}px`;
  for (let c = 0; c < user.contacts.length; c++) {
    signatureAndIcon(c, i);
    if (user.contacts[c].selected) {
      loadContactsIfSelected(c);
    }
  }
  if (user.contacts.length > 5) {
    mainDiv.style.overflowY = "scroll";
  }
}

/**
 * Load the icon/signature and name of the contact.
 *
 * @param {number} c - The index of the contact
 * @param {string} i - The number of the task
 */
function signatureAndIcon(c, i) {
  let mainDiv = document.getElementById(`contactList`);
  contactSignature = user.contacts[c].signature;
  contactName = user.contacts[c].name;
  mainDiv.innerHTML += loadContactsReturn(c, i);
  iconId = document.getElementById(`ContactSignatureIcon${c}`);
  iconId.style.backgroundColor = user.contacts[c].userColor;
}

/**
 * Type the contact selected when opening the contacts.
 *
 * @param {number} c - The index of the contact
 */
function loadContactsIfSelected(c) {
  let container = document.getElementById(`assignedContactContainer${c}`);
  let contactListIcons = document.getElementById("contactListIconsLine");
  container.classList.add("assignedContainerBlack");
  let image = document.getElementById(`assignedContactImage${c}`);
  image.src = "../assets/img/add_task/task_box_check.svg";
  let signature = document.getElementById(`ContactSignatureIcon${c}`).innerHTML;
  let userColor = user.contacts[c].userColor;
  contactListIcons.innerHTML += `<div id="contactIconNumber${c}" style="background-color: ${userColor};" class="assignedContactLeftSideIcon">${signature}</div>`;
}

/**
 * Close the contacts list.
 *
 * @param {string} i - The number of the task
 */
function closeContacts(i) {
  let contactList = document.getElementById(`contactList`);
  contactList.style.display = "none";
  let border = document.getElementById(`contactSelectContainer`);
  border.classList.remove("borderColor");
  let image = document.getElementById(`openerAssignedTo`);
  image.src = "../assets/img/add_task/arrow_drop_down.svg";
  let contactListIcons = document.getElementById("contactListIcons");
  contactListIcons.style.display = "block";
  setTimeout(function () {
    document.body.click();
  }, 0);
  image.onclick = function () {
    openContacts(i);
  };
}

/**
 * Open the contacts list from the current user.
 *
 * @param {string} i - The number of the task
 */
function openContacts(i) {
  let contactList = document.getElementById("contactList");
  let contactListIcons = document.getElementById("contactListIcons");
  let border = document.getElementById(`contactSelectContainer`);
  let image = document.getElementById(`openerAssignedTo`);
  contactList.style.display = "block";
  contactListIcons.style.display = "none";
  border.classList.add("borderColor");
  image.src = "../assets/img/add_task/arrow_drop_up.svg";
  image.onclick = function () {
    closeContacts(i);
  };
}

/**
 * Change the background color and the image of the selected contact.
 *
 * @param {number} i - The index of the contact
 * @param {number} j - The number of the task
 */
async function assignedToContactBg(i, j) {
  if (user.contacts[i].selected) {
    assignedToContactBgIf(i, j);
  } else {
    assignedToContactBgElse(i, j);
  }
  savedUsersInBackend();
}

/**
 * If the contact is selected, change it to not selected.
 *
 * @param {number} i - The index of the contact
 * @param {number} j - The number of the task
 */
function assignedToContactBgIf(i, j) {
  if (!user.contacts[i]) {
    return;
  }

  user.contacts[i].selected = false;
  let container = document.getElementById(`assignedContactContainer${i}`);
  container?.classList.remove("assignedContainerBlack");
  let image = document.getElementById(`assignedContactImage${i}`);
  if (image) image.src = "../assets/img/add_task/task_box.svg";
  let iconId = document.getElementById(`contactIconNumber${i}`);
  if (iconId) iconId.remove();

  if (!user.tasks[j]) {
    return;
  }

  if (!Array.isArray(user.tasks[j].assignedTo)) {
    return;
  }

  let removeName = user.tasks[j].assignedTo.findIndex(
    (item) => item.name === user.contacts[i].name
  );

  if (removeName !== -1) {
    user.tasks[j].assignedTo.splice(removeName, 1);
  }
}

/**
 * If the contact is not selected, change it to selected.
 *
 * @param {number} i - The index of the contact
 * @param {number} j - The number of the task
 */
function assignedToContactBgElse(i, j) {
  user.contacts[i].selected = true;

  let container = document.getElementById(`assignedContactContainer${i}`);
  let contactListIcons = document.getElementById("contactListIconsLine");
  container.classList.add("assignedContainerBlack");

  let image = document.getElementById(`assignedContactImage${i}`);
  image.src = "../assets/img/add_task/task_box_check.svg";

  let signature = document.getElementById(`ContactSignatureIcon${i}`).innerHTML;
  let userColor = user.contacts[i].userColor;

  contactListIcons.innerHTML += `<div id="contactIconNumber${i}" style="background-color: ${userColor};" class="assignedContactLeftSideIcon">${signature}</div>`;

  if (!user.tasks[j].assignedTo) {
    user.tasks[j].assignedTo = [];
  }

  user.tasks[j].assignedTo.push({
    name: user.contacts[i].name,
    userColor: user.contacts[i].userColor,
  });
}

/**
 * Change the border of the clicked field.
 */
function onclickInputBorder() {
  let border = document.getElementById(`contactSelectContainer`);
  border.classList.add("borderColor");
}

/**
 * Filter letters in the input field and search for contacts that include the search term.
 */
function filterNamesForAssignedTo() {
  let search = document
    .getElementById("assignedToContainer")
    .value.toLowerCase();
  let list = document.getElementById("contactList");
  list.innerHTML = "";
  openContacts();
  for (let i = 0; i < user.contacts.length; i++) {
    let name = user.contacts[i].name.toLowerCase();
    if (name.includes(search)) {
      list.innerHTML += filterNamesForAssignedToReturn(i);
      let iconId = document.getElementById(`ContactSignatureIcon${i}`);
      iconId.style.backgroundColor += user.contacts[i].userColor;
    }
  }
}

/**
 * Save the changes when the "OK" button is pressed.
 *
 * @param {number} i - The number of the task
 */
async function saveCurrentBoardTask(i) {
  removeClickListener();
  let title = document.getElementById(`titelInputContainer`);
  let description = document.getElementById(`descriptionInput`);
  let date = document.getElementById(`dueDateInputContainer`);
  user.tasks[i].title = title.value;
  user.tasks[i].dueDate = date.value;
  user.tasks[i].description = description.value;
  savedUsersInBackend();
  document.getElementById(`popUpMainContainer`).remove();
  document.getElementById(`blurrContainer`).remove();
  openTask(i);
}

/**
 * Prevent selecting a date in the future.
 */
function setMinDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  document.getElementById("dueDateInputContainer").min = today;
}

/**
 * Clear the input fields in the subtask section.
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
 * Create a menu for switching the task status in the mobile version.
 *
 * @param {number} i - The number of the task
 */
function switchTask(i) {
  switchTaskTriggered = true;
  var menu = document.getElementById(`menuForSwitchTask`);
  if (!menu) {
    document.getElementById(`switchTaskImage${i}`).innerHTML += `
      <ul id="menuForSwitchTask" class="menu-options">
        <li class="menuForSwitchTaskMenuHead"> Switch to:</li>
        <li class="menuForSwitchTaskMenu" id="menuForSwitchTaskTodo" onclick="switchTaskTodo(${i})">To Do</li>
        <li class="menuForSwitchTaskMenu" id="menuForSwitchTaskProgress" class="font16400" onclick="switchTaskProgress(${i})">In progress</li>
        <li class="menuForSwitchTaskMenu" id="menuForSwitchTaskAwait" class="font16400" onclick="switchTaskAwait(${i})">Await for Feedback</li>
        <li class="menuForSwitchTaskMenu" id="menuForSwitchTaskDone" class="font16400" onclick="switchTaskDone(${i})">Done</li>
      </ul>
    `;
    cheackCurrentStatus(i);
    document.querySelector(".boardMainContainer").style.overflow = "hidden";
    document
      .getElementById(`switchTaskImage${i}`)
      .querySelector("img")
      .setAttribute("onclick", `closeMenu(${i})`);
  }
}

/**
 * Entfernt das Menü des aktuellen Status.
 *
 * @param {*} i - Nummer der Aufgabe
 */
function cheackCurrentStatus(i) {
  if (user.tasks[i].status === "to-do") {
    document.getElementById(`menuForSwitchTaskTodo`).remove();
  }
  if (user.tasks[i].status === "progress") {
    document.getElementById(`menuForSwitchTaskProgress`).remove();
  }
  if (user.tasks[i].status === "await") {
    document.getElementById(`menuForSwitchTaskAwait`).remove();
  }
  if (user.tasks[i].status === "done") {
    document.getElementById(`menuForSwitchTaskDone`).remove();
  }
}

/**
 * Wechselt den Status der Aufgabe zu "to-do".
 *
 * @param {*} i - Nummer der Aufgabe
 */
function switchTaskTodo(i) {
  switchTaskTriggered = true;
  user.tasks[i].status = "to-do";
  savedUsersInBackend();
  closeMenu(i);
  clearBoardTasksField();
  loadTasks();
}

/**
 * Wechselt den Status der Aufgabe zu "progress".
 *
 * @param {*} i - Nummer der Aufgabe
 */
function switchTaskProgress(i) {
  switchTaskTriggered = true;
  user.tasks[i].status = "progress";
  savedUsersInBackend();
  closeMenu(i);
  clearBoardTasksField();
  loadTasks();
}

/**
 * Wechselt den Status der Aufgabe zu "await".
 *
 * @param {*} i - Nummer der Aufgabe
 */
function switchTaskAwait(i) {
  switchTaskTriggered = true;
  user.tasks[i].status = "await";
  savedUsersInBackend();
  closeMenu(i);
  clearBoardTasksField();
  loadTasks();
}

/**
 * Wechselt den Status der Aufgabe zu "done".
 *
 * @param {*} i - Nummer der Aufgabe
 */
function switchTaskDone(i) {
  switchTaskTriggered = true;
  user.tasks[i].status = "done";
  savedUsersInBackend();
  closeMenu(i);
  clearBoardTasksField();
  loadTasks();
}

/**
 * Schließt das Status-Wechsel-Menü in der mobilen Version.
 *
 * @param {*} i - Nummer der Aufgabe
 */
function closeMenu(i) {
  switchTaskTriggered = true;
  var menu = document.getElementById("menuForSwitchTask");
  if (menu) {
    menu.remove();

    document.querySelector(".boardMainContainer").style.overflow = "auto";
    document
      .getElementById(`switchTaskImage${i}`)
      .querySelector("img")
      .setAttribute("onclick", `switchTask(${i})`);
  }
}
