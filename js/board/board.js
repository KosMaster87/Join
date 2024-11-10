let pupUpPriorityName;

async function initBoard() {
  await includeHTML();
  setActiveLink("navBoard");
  await loadCurrentUserAlsoUsersAsObject();
  createUserSignatureIcon();
  loadTasks();
  preparePopupEvent();
}

/**
 *  Render tasks with status to-do
 */
function loadTasks() {
  for (let i = 0; i < user.tasks.length; i++) {
    if (user.tasks[i].status === "to-do") {
      fillTodo(i);
    }
  }
  loadProgressTasks();
}

/**
 * Render tasks with status progress
 */

function loadProgressTasks() {
  for (let i = 0; i < user.tasks.length; i++) {
    if (user.tasks[i].status === "progress") {
      fillProgress(i);
    }
  }
  loadAwaitTasks();
}

/**
 * Render tasks with status await
 */
function loadAwaitTasks() {
  for (let i = 0; i < user.tasks.length; i++) {
    if (user.tasks[i].status === "await") {
      fillAwait(i);
    }
  }
  loadDoneTasks();
}

/**
 * Render tasks with status done
 */
function loadDoneTasks() {
  for (let i = 0; i < user.tasks.length; i++) {
    if (user.tasks[i].status === "done") {
      fillDone(i);
    }
  }
  checkNofilledTasks();
}

/**
 *
 * open the task when double click the mouse
 *
 * @param {*} i - is the number of the task
 */
function openTask(i) {
  if (!switchTaskTriggered) {
    document.body.style.overflow = "hidden";
    mainContentContainer = document.getElementById(`mainContent`);
    mainContentContainer.innerHTML += openTaskReturn(i);
    renderTaskCategory(i);
    renderTaskValues(i);
    renderTaskAssigneds(i);
    renderTaskSubtasks(i);
  } else {
    switchTaskTriggered = false;
  }
}

/**
 *
 * render the category with the right background color in the task
 *
 * @param {*} i - is the number of the task
 */
function renderTaskCategory(i) {
  let popUpCategory = document.getElementById(`popUpTaskCategory`);
  popUpCategory.innerHTML = user.tasks[i].category;
  if (popUpCategory.textContent === "User Story") {
    popUpCategory.style.backgroundColor = "#0038FF";
  } else if (popUpCategory.textContent === "Technical Task") {
    popUpCategory.style.backgroundColor = "#1FD7C1";
  }
}

/**
 *
 * fill the container with values of title and more
 *
 * @param {*} i - is the number of the task
 */
function renderTaskValues(i) {
  document.getElementById(`popUpTitleId`).innerHTML = user.tasks[i].title;
  document.getElementById(`popUpDescriptionID`).innerHTML = user.tasks[i].description;
  document.getElementById(`popUpDueDate`).innerHTML = user.tasks[i].dueDate
    .split("-")
    .reverse()
    .join("/");
  if (user.tasks[i].prio === "Low") {
    document.getElementById(`popUpPrioImage`).src = "../assets/img/board/board_low.svg";
  } else if (user.tasks[i].prio === "Medium") {
    document.getElementById(`popUpPrioImage`).src = "../assets/img/board/board_medium.svg";
  } else if (user.tasks[i].prio === "Urgent") {
    document.getElementById(`popUpPrioImage`).src = "../assets/img/board/board_urgent.svg";
  }
  popUpPriority.innerHTML = user.tasks[i].prio;
}

/**
 *
 * render the assigned contacts
 *
 * @param {*} i - is the number of the task
 */
function renderTaskAssigneds(i) {
  let MainContainer = document.getElementById(`popUpAssignedToMainContainer`);
  for (let n = 0; n < user.tasks[i].assignedTo.length; n++) {
    let bgColor = user.tasks[i].assignedTo[n].userColor;
    MainContainer.innerHTML += assigned(n);
    document.getElementById(`pupUpIcon${n}`).style.backgroundColor = bgColor;
    document.getElementById(`popUpAssignedTo${n}`).innerHTML = user.tasks[i].assignedTo[n].name;
    let signature = "";
    let words = user.tasks[i].assignedTo[n].name.toUpperCase().split(" ");
    for (let j = 0; j < words.length; j++) {
      signature += words[j].charAt(0);
      document.getElementById(`pupUpIcon${n}`).innerHTML = signature;
    }
  }
}

/**
 *
 * render the subtask from the opened task
 *
 * @param {*} i - is the number of the task
 */
function renderTaskSubtasks(i) {
  if (user.tasks[i].subtasks.length === 0) {
    document.getElementById(`boardTaskSubtaskMainContainer`).style.display = "none";
    document.getElementById(`awaitMainContainerId`).style.display = "none";
    document.getElementById(`progressMainContainerId` + i).style.display = "none";
  } else {
    document.getElementById(`boardTaskSubtaskMainContainer`).style.display = "flex";
    let popUpSubtasksContainer = document.getElementById(`popUpSubtasksContainer`);
    for (let s = 0; s < user.tasks[i].subtasks.length; s++) {
      popUpSubtasksContainer.innerHTML += popUpSubtaskReturn(i, s);
      let subtask = document.getElementById(`pupUpSubtaskText${s}`);
      subtask.innerHTML = user.tasks[i].subtasks[s].name;
      if (user.tasks[i].subtasks[s].done === false) {
        image = document.getElementById(`popUpSubtaskImage${s}`).src =
          "../assets/img/board/board_box.svg";
      } else if (user.tasks[i].subtasks[s].done === true) {
        image = document.getElementById(`popUpSubtaskImage${s}`).src =
          "../assets/img/board/board_box_check.svg";
      }
    }
  }
}

/**
 *
 * close the opened task
 *
 * @param {*} i - is the number of the task
 */
async function closeOpenTask(i) {
  clearBoardTasksField();
  document.body.style.overflow = "auto";
  removeOpenedTask(i);
}

/**
 *
 * close the opened task
 *
 * @param {*} i - is the number of the task
 */
function removeOpenedTask(i) {
  let task = document.getElementById(`popUpMainContainer`);
  let blurr = document.getElementById(`blurrContainer`);
  blurr.remove();
  task.remove();
  document.getElementById(`TodoMainContainer`).innerHTML = "";
  loadTasks();
}

/**
 *
 * close the editTask
 *
 * @param {*} i - is the number of the task
 */
function closeEditTask(i) {
  removeClickListener();
  document.getElementById(`popUpMainContainer`).remove();
  document.getElementById(`blurrContainer`).remove();
  openTask(i);
}

/**
 *
 * clear the containers
 *
 * @param {*} i - is the number of the task
 */
async function deleteTaskBoard(i) {
  user.tasks.splice(i, 1);
  document.getElementById("TodoMainContainer").innerHTML = "";
  document.getElementById("progressMainContainer").innerHTML = "";
  document.getElementById("awaitMainContainer").innerHTML = "";
  document.getElementById("doneMainContainer").innerHTML = "";
  await closeOpenTask(i);
  savedUsersInBackend();
  loadTasks();
}

/**
 *
 * change from inputfield to div field after change the text
 *
 * @param {*} i - is the number of the task
 * @param {*} s - is the number of the subtask
 */
async function subtaskFinish(i, s) {
  let imageId = document.getElementById(`popUpSubtaskImage${s}`);
  if (user.tasks[i].subtasks[s].done === false) {
    imageId.src = "../assets/img/board/board_box_check.svg";
    user.tasks[i].subtasks[s].done = true;
  } else if (user.tasks[i].subtasks[s].done === true) {
    imageId.src = "../assets/img/board/board_box.svg";
    user.tasks[i].subtasks[s].done = false;
  }
  savedUsersInBackend();
  updateProgressBar(i);
}

/**
 *
 * open the edit fields when change the task
 *
 * @param {*} i - is the number of the task
 */
async function editBoardTask(i) {
  document.getElementById(`popUpMainContainer`).innerHTML = "";
  if (window.innerWidth > 1200) {
    document.getElementById(`popUpMainContainer`).innerHTML = editBoardDesktopTaskReturn(i);
    document.getElementById(`popUpMainContainer`).classList.remove("openwindow");
  } else {
    document.getElementById(`popUpMainContainer`).innerHTML = editBoardMobileTaskReturn(i);
  }
  contactList.style.display = "none";
  contactListIcons.style.display = "block";
  document.getElementById(`titelInputContainer`).value = user.tasks[i].title;
  document.getElementById(`descriptionInput`).value = user.tasks[i].description;
  document.getElementById(`dueDateInputContainer`).value = user.tasks[i].dueDate;
  for (let s = 0; s < user.tasks[i].subtasks.length; s++) {
    document.getElementById(`subTasksContainer`).innerHTML += editBoardTaskReturn(i, s);
  }
  whatsPrio(i, user.tasks[i].prio);
  selectContacts(i);
  savedUsersInBackend();
  loadContacts(i);
  closeListener(i);
}

/**
 *
 * Change the subtask from fiv to a inputfield
 *
 * @param {*} i - is the number of the task
 * @param {*} s - is the number of the subtask
 */
function editBoardSubtask(i, s) {
  let task = document.getElementById("subtask" + s);
  task.innerHTML = "";
  task.innerHTML = editBoardSubtaskReturn(user.tasks[i].subtasks[s].name, s, i);
}

/**
 *
 * change from inputfield to div field after change the text
 *
 * @param {*} i - is the number of the task
 * @param {*} s - is the number of the subtask
 */
async function editBoardSubtaskDone(i, s) {
  let content = document.getElementById("editBoardSubtask" + s).value;
  if (content.length > 0) {
    user.tasks[i].subtasks[s].name = content;
    savedUsersInBackend();
    renderBoardSubtasks(i);
  } else {
    deleteSubtask(s);
  }
  savedUsersInBackend();
}

/**
 *
 * render the subtasks
 *
 * @param {*} i - is the number of the task
 */
function renderBoardSubtasks(i) {
  let subtasksList = document.getElementById("subTasksContainer");
  subtasksList.innerHTML = "";
  for (let l = 0; l < user.tasks[i].subtasks.length; l++) {
    subtasksList.innerHTML += renderBaordSubtasksReturn(i, l);
  }
}

/**
 *
 * create a new subtaks in the tasks and safe it in the backend
 *
 * @param {*} i - is the number of the task
 */
async function addBoardSubtask(i) {
  if (document.getElementById("subTaskInputfieldText").value) {
    console.log(i);
    let subtasksInput = document.getElementById("subTaskInputfieldText");
    let newSubtask = {
      name: subtasksInput.value,
      done: false,
    };
    user.tasks[i].subtasks.push(newSubtask);
    savedUsersInBackend();
    clearSubtaskInputfield();
    renderBoardSubtasks(i);
  }
}

/**
 *
 * change the subtask menubar when edit the subtask
 *
 * @param {*} i - is the number of the task
 */
function changeBoardMenu(i) {
  container = document.getElementById(`subTaskInputfieldMenu`);
  container.innerHTML = changeBoardMenuReturn(i);
  let border = document.getElementById(`subTaskInputcontainer`);
  border.classList.add("bordercolor");
}

/**
 *
 * delete the subtask
 *
 * @param {*} i - is the number of the task
 * @param {*} s - is the number of the subtasks
 */
async function deleteBoardSubtask(i, s) {
  if (user.tasks[i] && user.tasks[i].subtasks) {
    if (user.tasks[i].subtasks[s]) {
      user.tasks[i].subtasks.splice(s, 1);
      renderBoardSubtasks(i);
      savedUsersInBackend();
      renderBoardSubtasks(i);
    }
  }
}

/**
 *
 * give the contact that assignedTo an selected true information
 *
 * @param {*} i - is the number of the task
 */
function selectContacts(i) {
  user.contacts.forEach((contact) => {
    contact.selected = false;
  });
  let assignedTo = user.tasks[i].assignedTo;
  for (let j = 0; j < assignedTo.length; j++) {
    let assignedToName = assignedTo[j].name;
    let matchingContact = user.contacts.find((contact) => contact.name === assignedToName);
    if (matchingContact) {
      matchingContact.selected = true;
    }
  }
}
