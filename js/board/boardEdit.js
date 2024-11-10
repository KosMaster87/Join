let switchTaskTriggered = false;

/**
 *
 * load the assignedTo contacts
 *
 * @param {string} i - is the number of the task
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
 *
 * load the icon/signature and name of the contact
 *
 * @param {*} c - is the number of the contact
 */
function signatureAndIcon(c, i) {
  let mainDiv = document.getElementById(`contactList`);
  contactSignature = user.contacts[c].signature;
  contactName = user.contacts[c].name;
  mainDiv.innerHTML += loadContactsReturn(c, i);
  iconid = document.getElementById(`ContactSignatureIcon${c}`);
  iconid.style.backgroundColor = user.contacts[c].userColor;
}

/**
 *
 * type the contact selected when open the contacts
 *
 * @param {*} c - is the number of the contact
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
 *
 * close the contacts
 *
 * @param {string} i - is the number of the task
 */
function closeContacts(i) {
  let contactList = document.getElementById(`contactList`);
  contactList.style.display = "none";
  let border = document.getElementById(`contactSelectContainer`);
  border.classList.remove("bordercolor");
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
 *
 * open the contactslist from currentuser
 *
 * @param {string} i - is the number of the task
 */
function openContacts(i) {
  let contactList = document.getElementById("contactList");
  let contactListIcons = document.getElementById("contactListIcons");
  let border = document.getElementById(`contactSelectContainer`);
  let image = document.getElementById(`openerAssignedTo`);
  contactList.style.display = "block";
  contactListIcons.style.display = "none";
  border.classList.add("bordercolor");
  image.src = "../assets/img/add_task/arrow_drop_up.svg";
  image.onclick = function () {
    closeContacts(i);
  };
}

/**
 *
 * change backgroundcolor and the image to selcted
 *
 * @param {*} i -is the number of the contact
 * @param {*} j - is the number of the task
 */
async function assignedtoContactBg(i, j) {
  if (user.contacts[i].selected) {
    assignedtoContactBgIf(i, j);
  } else {
    assignedtoContactbgElse(i, j);
  }
  savedUsersInBackend();
}

/**
 *
 * if the contact is selected true change it to not selected
 *
 * @param {*} i -is the number of the contact
 * @param {*} j - is the number of the task
 */
function assignedtoContactBgIf(i, j) {
  user.contacts[i].selected = false;
  let container = document.getElementById(`assignedContactContainer${i}`);
  container.classList.remove("assignedContainerBlack");
  let image = document.getElementById(`assignedContactImage${i}`);
  image.src = "../assets/img/add_task/task_box.svg";
  let iconId = document.getElementById(`contactIconNumber${i}`);
  iconId.remove();
  let removeName = user.tasks[j].assignedTo.findIndex(
    (item) => item.name === user.contacts[i].name
  );
  if (removeName !== -1) {
    user.tasks[j].assignedTo.splice(removeName, 1);
  }
}

/**
 * if the contact is selected true change it to selected
 *
 * @param {*} i -is the number of the contact
 * @param {*} j - is the number of the task
 */
function assignedtoContactbgElse(i, j) {
  user.contacts[i].selected = true;
  let container = document.getElementById(`assignedContactContainer${i}`);
  let contactListIcons = document.getElementById("contactListIconsLine");
  container.classList.add("assignedContainerBlack");
  let image = document.getElementById(`assignedContactImage${i}`);
  image.src = "../assets/img/add_task/task_box_check.svg";
  let signature = document.getElementById(`ContactSignatureIcon${i}`).innerHTML;
  let userColor = user.contacts[i].userColor;
  contactListIcons.innerHTML += `<div id="contactIconNumber${i}" style="background-color: ${userColor};" class="assignedContactLeftSideIcon">${signature}</div>`;
  user.tasks[j].assignedTo.push({
    name: user.contacts[i].name,
    userColor: user.contacts[i].userColor,
  });
}

/**
 * change the border of the clicked field
 */
function onclickInputBorder() {
  let border = document.getElementById(`contactSelectContainer`);
  border.classList.add("bordercolor");
}

/**
 * filter letters in the inputfield and search in contacts for an include
 */
function filterNamesforAssignedTo() {
  let search = document.getElementById("assignedToContainer").value.toLowerCase();
  let list = document.getElementById("contactList");
  list.innerHTML = "";
  openContacts();
  for (let i = 0; i < user.contacts.length; i++) {
    let name = user.contacts[i].name.toLowerCase();
    if (name.includes(search)) {
      list.innerHTML += filterNamesforAssignedToReturn(i);
      let iconid = document.getElementById(`ContactSignatureIcon${i}`);
      iconid.style.backgroundColor += user.contacts[i].userColor;
    }
  }
}

/**
 *
 * save the changes when press the ok button
 *
 * @param {*} i - is the number of the task
 */
async function saveCurrentBoardTask(i) {
  removeClickListener();
  let title = document.getElementById(`titelInputContainer`);
  let description = document.getElementById(`descriptionInput`);
  let date = document.getElementById(`dueDateInputContainer`);

  user.tasks[i].title = title.value;
  user.tasks[i].dueDate = date.value;
  user.tasks[i].description = description.value;
  await setItem("users", users);
  document.getElementById(`popUpMainContainer`).remove();
  document.getElementById(`blurrContainer`).remove();
  openTask(i);
}

/**
 * cant take date in the future
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
 * clear the inputfields in the subtask
 */
function clearSubtaskInputfield() {
  let input = document.getElementById(`subTaskInputfieldText`);
  input.value = "";
  container = document.getElementById(`subTaskInputfieldMenu`);
  container.innerHTML = `
  <img src="../assets/img/add_task/task_add.svg" />`;
  let border = document.getElementById(`subTaskInputcontainer`);
  border.classList.remove("bordercolor");
}

/**
 *
 * This function create a menu for switching the task Status in the MobileVersion.
 *
 * @param {*} i -number of the Task
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
 *
 * Remove the menufield of the current status.
 *
 * @param {*} i -number of the Task
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
 *
 *switch the task to status to-do
 *
 * @param {*} i -number of the Task
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
 *
 *switch the task to status progress
 *
 * @param {*} i -number of the Task
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
 *
 *switch the task to status await
 *
 * @param {*} i -number of the Task
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
 *
 *switch the task to status done
 *
 * @param {*} i -number of the Task
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
 *
 * Close the Status-Switch menu in mobilVersion
 *
 * @param {*} i -number of the Task
 */
function closeMenu(i) {
  switchTaskTriggered = true;
  var menu = document.getElementById("menuForSwitchTask");
  if (menu) {
    // Entferne das Dropdown-Menü
    menu.remove();

    // Aktiviere das Scrollen auf der Seite
    document.querySelector(".boardMainContainer").style.overflow = "auto";
    document
      .getElementById(`switchTaskImage${i}`)
      .querySelector("img")
      .setAttribute("onclick", `switchTask(${i})`);
  }
}
