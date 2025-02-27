let pupUpPriorityName;

/**
 * Initialize the board by including HTML, setting the active link,
 * loading user data, creating the user signature icon, and loading tasks.
 */
async function initBoard() {
  await includeHTML();
  setActiveLink("navBoard");
  await loadUsersAndCurrentUser();
  createUserSignatureIcon();
  loadTasks();
  preparePopupEvent();
}

/**
 * Render tasks with status "to-do".
 */
function loadTasks() {
  if (user.tasks && Array.isArray(user.tasks)) {
    for (let i = 0; i < user.tasks.length; i++) {
      if (user.tasks[i].status === "to-do") {
        fillTodo(i);
      }
    }
    loadProgressTasks();
  }
}

/**
 * Render tasks with status "progress".
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
 * Render tasks with status "await".
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
 * Render tasks with status "done".
 */
function loadDoneTasks() {
  for (let i = 0; i < user.tasks.length; i++) {
    if (user.tasks[i].status === "done") {
      fillDone(i);
    }
  }
  checkNoFilledTasks();
}

/**
 * Open the task when double-clicked on.
 *
 * @param {number} i - The index of the task.
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
 * Render the category of the task with the corresponding background color.
 *
 * @param {number} i - The index of the task.
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
 * Render the task's values (title, description, due date, priority).
 *
 * @param {number} i - The index of the task.
 */
function renderTaskValues(i) {
  document.getElementById(`popUpTitleId`).innerHTML = user.tasks[i].title;
  document.getElementById(`popUpDescriptionID`).innerHTML =
    user.tasks[i].description;
  document.getElementById(`popUpDueDate`).innerHTML = user.tasks[i].dueDate
    .split("-")
    .reverse()
    .join("/");
  if (user.tasks[i].prio === "Low") {
    document.getElementById(`popUpPrioImage`).src =
      "../assets/img/board/board_low.svg";
  } else if (user.tasks[i].prio === "Medium") {
    document.getElementById(`popUpPrioImage`).src =
      "../assets/img/board/board_medium.svg";
  } else if (user.tasks[i].prio === "Urgent") {
    document.getElementById(`popUpPrioImage`).src =
      "../assets/img/board/board_urgent.svg";
  }
  popUpPriority.innerHTML = user.tasks[i].prio;
}

/**
 * Render the contacts assigned to the task.
 *
 * @param {number} i - The index of the task.
 */
function renderTaskAssigneds(i) {
  if (!user.tasks[i] || !Array.isArray(user.tasks[i].assignedTo)) {
    return;
  }

  let MainContainer = document.getElementById(`popUpAssignedToMainContainer`);

  for (let n = 0; n < user.tasks[i].assignedTo.length; n++) {
    let bgColor = user.tasks[i].assignedTo[n].userColor;
    MainContainer.innerHTML += assigned(n);
    document.getElementById(`pupUpIcon${n}`).style.backgroundColor = bgColor;
    document.getElementById(`popUpAssignedTo${n}`).innerHTML =
      user.tasks[i].assignedTo[n].name;

    let signature = "";
    let words = user.tasks[i].assignedTo[n].name.toUpperCase().split(" ");
    for (let j = 0; j < words.length; j++) {
      signature += words[j].charAt(0);
    }
    document.getElementById(`pupUpIcon${n}`).innerHTML = signature;
  }
}

/**
 * Render the subtasks for the task.
 *
 * @param {number} i - The index of the task.
 */
function renderTaskSubtasks(i) {
  if (!user.tasks[i] || !Array.isArray(user.tasks[i].subtasks)) {
    return;
  }

  if (user.tasks[i].subtasks.length === 0) {
    document.getElementById(`boardTaskSubtaskMainContainer`).style.display =
      "none";
    document.getElementById(`awaitMainContainerId`).style.display = "none";
    document.getElementById(`progressMainContainerId` + i).style.display =
      "none";
  } else {
    document.getElementById(`boardTaskSubtaskMainContainer`).style.display =
      "flex";
    let popUpSubtasksContainer = document.getElementById(
      `popUpSubtasksContainer`
    );

    for (let s = 0; s < user.tasks[i].subtasks.length; s++) {
      popUpSubtasksContainer.innerHTML += popUpSubtaskReturn(i, s);
      let subtask = document.getElementById(`pupUpSubtaskText${s}`);
      subtask.innerHTML = user.tasks[i].subtasks[s].name;

      let image = document.getElementById(`popUpSubtaskImage${s}`);
      if (user.tasks[i].subtasks[s].done === false) {
        image.src = "../assets/img/board/board_box.svg";
      } else if (user.tasks[i].subtasks[s].done === true) {
        image.src = "../assets/img/board/board_box_check.svg";
      }
    }
  }
}

/**
 * Close the currently opened task.
 *
 * @param {number} i - The index of the task.
 */
async function closeOpenTask(i) {
  clearBoardTasksField();
  document.body.style.overflow = "auto";
  removeOpenedTask(i);
}

/**
 * Remove the opened task and reload tasks.
 *
 * @param {number} i - The index of the task.
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
 * Close the edit task view and reopen the task.
 *
 * @param {number} i - The index of the task.
 */
function closeEditTask(i) {
  removeClickListener();
  document.getElementById(`popUpMainContainer`).remove();
  document.getElementById(`blurrContainer`).remove();
  openTask(i);
}

/**
 * Delete the task from the board and save changes in the backend.
 *
 * @param {number} i - The index of the task.
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
 * Mark a subtask as done or not done and update the progress.
 *
 * @param {number} i - The index of the task.
 * @param {number} s - The index of the subtask.
 */
async function subtaskFinish(i, s) {
  let imageId = document.getElementById(`popUpSubtaskImage${s}`);
  let currentStatus = user.tasks[i].subtasks[s].done;
  user.tasks[i].subtasks[s].done = !currentStatus;
  imageId.src = currentStatus
    ? "../assets/img/board/board_box.svg"
    : "../assets/img/board/board_box_check.svg";

  savedUsersInBackend();
  updateProgressBar(i);
}

/**
 * Edit the task details in the board.
 *
 * @param {number} i - The index of the task.
 */
async function editBoardTask(i) {
  document.getElementById(`popUpMainContainer`).innerHTML = "";

  if (window.innerWidth > 1200) {
    document.getElementById(`popUpMainContainer`).innerHTML =
      editBoardDesktopTaskReturn(i);
    document
      .getElementById(`popUpMainContainer`)
      .classList.remove("openwindow");
  } else {
    document.getElementById(`popUpMainContainer`).innerHTML =
      editBoardMobileTaskReturn(i);
  }

  contactList.style.display = "none";
  contactListIcons.style.display = "block";

  let task = user.tasks[i];
  if (!task) {
    return;
  }

  document.getElementById(`titelInputContainer`).value = task.title;
  document.getElementById(`descriptionInput`).value = task.description;
  document.getElementById(`dueDateInputContainer`).value = task.dueDate;

  if (task.subtasks) {
    task.subtasks.forEach((subtask, s) => {
      document.getElementById(`subTasksContainer`).innerHTML +=
        editBoardTaskReturn(i, s);
    });
  }

  whatsPrio(i, task.prio);

  if (task.assignedTo) {
    selectContacts(i);
  }

  savedUsersInBackend();
  loadContacts(i);
  closeListener(i);
}

/**
 * Change the subtask from a static view to an input field for editing.
 *
 * @param {number} i - The index of the task in the task list.
 * @param {number} s - The index of the subtask to be edited.
 */
function editBoardSubtask(i, s) {
  let task = document.getElementById("subtask" + s);
  task.innerHTML = "";
  task.innerHTML = editBoardSubtaskReturn(user.tasks[i].subtasks[s].name, s, i);
}

/**
 * Change the subtask from an input field back to a div field after the text has been changed.
 *
 * @param {number} i - The index of the task in the task list.
 * @param {number} s - The index of the subtask that was edited.
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
 * Render and display the subtasks for the specified task.
 *
 * @param {number} i - The index of the task in the task list.
 */
function renderBoardSubtasks(i) {
  let subtasksList = document.getElementById("subTasksContainer");
  subtasksList.innerHTML = "";
  for (let l = 0; l < user.tasks[i].subtasks.length; l++) {
    subtasksList.innerHTML += renderBaordSubtasksReturn(i, l);
  }
}

/**
 * Create a new subtask for the specified task and save it to the backend.
 *
 * @param {number} i - The index of the task in the task list.
 */
async function addBoardSubtask(i) {
  if (document.getElementById("subTaskInputfieldText").value) {
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
 * Change the subtask menu when editing a subtask.
 *
 * @param {number} i - The index of the task in the task list.
 */
function changeBoardMenu(i) {
  container = document.getElementById(`subTaskInputfieldMenu`);
  container.innerHTML = changeBoardMenuReturn(i);
  let border = document.getElementById(`subTaskInputContainer`);
  border.classList.add("borderColor");
}

/**
 * Delete a subtask from the specified task.
 *
 * @param {number} i - The index of the task in the task list.
 * @param {number} s - The index of the subtask to be deleted.
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
 * Mark the contacts that are assigned to the selected task as selected.
 *
 * @param {number} i - The index of the task in the task list.
 */
function selectContacts(i) {
  if (!user.tasks[i] || !Array.isArray(user.tasks[i].assignedTo)) {
    return;
  }

  user.contacts.forEach((contact) => {
    contact.selected = false;
  });

  let assignedTo = user.tasks[i].assignedTo;
  assignedTo.forEach((assignedPerson) => {
    let matchingContact = user.contacts.find(
      (contact) => contact.name === assignedPerson.name
    );
    if (matchingContact) {
      matchingContact.selected = true;
    }
  });
}
