/**
 * Renders information when the task status is "To-Do".
 *
 * @param {string} i - The index of the task.
 */
function fillTodo(i) {
  document.getElementById(`TodoMainContainer`).innerHTML += HtmlReturn(i);
  fillValue(i);
  whatsCategory(i);
  whatsSignatures(i);
  updateProgressBar(i);
}

/**
 * Renders information when the task status is "In Progress".
 *
 * @param {string} i - The index of the task.
 */
function fillProgress(i) {
  document.getElementById(`progressMainContainer`).innerHTML += HtmlReturn(i);
  fillValue(i);
  whatsCategory(i);
  whatsSignatures(i);
  updateProgressBar(i);
}

/**
 * Renders information when the task status is "Awaiting".
 *
 * @param {*} i - The index of the task.
 */
function fillAwait(i) {
  document.getElementById(`awaitMainContainer`).innerHTML += awaitHtmlReturn(i);
  fillValue(i);
  whatsCategory(i);
  whatsSignatures(i);
  updateProgressBar(i);
}

/**
 * Renders information when the task status is "Done".
 *
 * @param {*} i - The index of the task.
 */
function fillDone(i) {
  document.getElementById(`doneMainContainer`).innerHTML += HtmlReturn(i);
  fillValue(i);
  whatsCategory(i);
  whatsSignatures(i);
  updateProgressBar(i);
}

/**
 * Fills the task's values with information from the array.
 *
 * @param {*} i - The index of the task.
 */
function fillValue(i) {
  const task = user.tasks[i];
  if (!task) return;

  document.getElementById(`TaskCategory${i}`).textContent = task.category || "";
  document.getElementById(`titleId${i}`).textContent = task.title || "";
  document.getElementById(`descriptionID${i}`).textContent =
    task.description || "";

  const prioImageContainer = document.getElementById(`PrioImageContainer${i}`);
  if (prioImageContainer) {
    prioImageContainer.src = task.prio
      ? `../assets/img/board/board_${task.prio.toLowerCase()}.svg`
      : "";
  }

  const counterOfTasks = document.getElementById(`counterOfTasks${i}`);
  if (counterOfTasks) {
    counterOfTasks.innerHTML = task.subtasks ? task.subtasks.length : "0";
  }

  pupUpPriorityName = task.prio || "";
}

/**
 * Checks if there are any tasks in the containers. If not, it fills the container with a "No Tasks" message.
 */
function checkNoFilledTasks() {
  if (document.getElementById("TodoMainContainer").innerHTML.trim() === "") {
    document.getElementById("TodoMainContainer").innerHTML =
      noTasksReturn("to-do");
  }
  if (
    document.getElementById("progressMainContainer").innerHTML.trim() === ""
  ) {
    document.getElementById("progressMainContainer").innerHTML =
      noTasksReturn("in progress");
  }
  if (document.getElementById("awaitMainContainer").innerHTML.trim() === "") {
    document.getElementById("awaitMainContainer").innerHTML =
      noTasksReturn("awaited");
  }
  if (document.getElementById("doneMainContainer").innerHTML.trim() === "") {
    document.getElementById("doneMainContainer").innerHTML =
      noTasksReturn("finished");
  }
}

/**
 * Changes the background color based on the priority of the task.
 *
 * @param {string} i - The index of the task.
 * @param {string} pupUpPriorityName - The priority name of the task.
 */
function whatsPrio(i, pupUpPriorityName) {
  removeWhiteImg();
  removePrio();
  if (pupUpPriorityName === "Low") {
    changePrioColor(i, pupUpPriorityName);
  } else if (pupUpPriorityName === "Medium") {
    changePrioColor(i, pupUpPriorityName);
  } else if (pupUpPriorityName === "Urgent") {
    changePrioColor(i, pupUpPriorityName);
  }
}

/**
 * Removes the background colors of selected priority.
 */
function removePrio() {
  document.getElementById("prioLowContainer").classList.remove("prioLow");
  document.getElementById("prioMediumContainer").classList.remove("prioMedium");
  document.getElementById("prioUrgentContainer").classList.remove("prioUrgent");
}

/**
 * Removes the image of the selected priority.
 */
function removeWhiteImg() {
  let imgUrgent = prioUrgentContainer.querySelector("img");
  let imgMedium = prioMediumContainer.querySelector("img");
  let imgLow = prioLowContainer.querySelector("img");
  imgUrgent.src = "../assets/img/add_task/arrow_top_red.svg";
  imgMedium.src = "../assets/img/add_task/line_orange.svg";
  imgLow.src = "../assets/img/add_task/arrow_bottom_green.svg";
}

/**
 * Changes the background color and icon of the selected priority.
 *
 * @param {*} i - The index of the task.
 * @param {string} pupUpPriorityName - The priority name of the task.
 */
function changePrioColor(i, pupUpPriorityName) {
  if (pupUpPriorityName === "Low") {
    document.getElementById(`prioLowContainer`).classList.add("prioLow");
    document.querySelector("#prioLowContainer img").src =
      "../assets/img/add_task/arrow_bottom_white.svg";
  } else if (pupUpPriorityName === "Medium") {
    document.getElementById(`prioMediumContainer`).classList.add("prioMedium");
    document.querySelector("#prioMediumContainer img").src =
      "../assets/img/add_task/line_white.svg";
  } else if (pupUpPriorityName === "Urgent") {
    document.getElementById(`prioUrgentContainer`).classList.add("prioUrgent");
    document.querySelector("#prioUrgentContainer img").src =
      "../assets/img/add_task/arrow_top_white.svg";
  }
  user.tasks[i].prio = pupUpPriorityName;
  savedUsersInBackend();
}

/**
 * Renders the finished subtasks in a progress bar.
 *
 * @param {*} i - The index of the task.
 */
function updateProgressBar(i) {
  let counter = 0;
  let percent = 0;

  const task = user.tasks[i];
  if (!task || !task.subtasks) return;

  const progressContainer = document.getElementById(
    `progressMainContainerId${i}`
  );
  if (!progressContainer) return;

  if (task.subtasks.length === 0) {
    progressContainer.style.display = "none";
  } else {
    progressContainer.style.display = "flex";

    for (let p = 0; p < task.subtasks.length; p++) {
      if (task.subtasks[p].done === true) {
        counter++;
      }
    }

    percent = (counter / task.subtasks.length) * 100;

    const finishedTasksElement = document.getElementById(`finishedTasks${i}`);
    if (finishedTasksElement) {
      finishedTasksElement.innerHTML = counter;
    }

    const progressBarElement = document.getElementById(`progressBar${i}`);
    if (progressBarElement) {
      progressBarElement.style.width = percent + "%";
    }
  }
}

/**
 * Changes the background color for the correct task category.
 *
 * @param {*} i - The index of the task.
 */
function whatsCategory(i) {
  if (user.tasks[i].category === "User Story") {
    document.getElementById(`TaskCategory${i}`).style.backgroundColor =
      "#0038FF";
  } else if (user.tasks[i].category === "Technical Task") {
    document.getElementById(`TaskCategory${i}`).style.backgroundColor =
      "#1FD7C1";
  }
}

/**
 * Renders icons and signatures for the assigned users.
 *
 * @param {*} i - The index of the task.
 */
function whatsSignatures(i) {
  const iconBarContainer = document.getElementById(`IconBar${i}`);
  if (!iconBarContainer || !user.tasks[i]?.assignedTo) return;

  iconBarContainer.innerHTML = ""; // Leeren, um doppelte Einträge zu vermeiden

  for (let a = 0; a < Math.min(4, user.tasks[i].assignedTo.length); a++) {
    const assignedUser = user.tasks[i].assignedTo[a];
    if (!assignedUser?.name) continue;

    let signature = assignedUser.name
      .toUpperCase()
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");

    let color = assignedUser.userColor;
    iconBarContainer.insertAdjacentHTML(
      "beforeend",
      iconReturn(color, signature)
    );
  }

  if (user.tasks[i].assignedTo.length > 4) {
    removeLastIcon(i);
    moreAssignedTo(i);
  }
}

/**
 * Removes the last icon in the icon bar.
 *
 * @param {*} i - The index of the task.
 */
function removeLastIcon(i) {
  let iconBar = document.getElementById(`IconBar${i}`);
  let icons = iconBar.getElementsByClassName("iconStyle");
  let lastIcon = icons[icons.length - 1];
  iconBar.removeChild(lastIcon);
}

/**
 * Adds an icon in the icon bar indicating more than 3 assigned users.
 *
 * @param {number} i - The index of the task.
 */
function moreAssignedTo(i) {
  const iconBarContainer = document.getElementById(`IconBar${i}`);
  let number = "+" + (user.tasks[i].assignedTo.length - 3);
  let numberColor = "var(--lightGray)";
  iconBarContainer.innerHTML += iconReturn(numberColor, number);
}

/**
 * Adds an event listener to close the task list when clicking outside the container.
 *
 * @param {number} i - The index of the task.
 */
function closeListener(i) {
  function clickHandler(event) {
    if (userClicksOutsideOfInputField(event, "fullContactContainers")) {
      closeContactWindow(i);
      removeClickListener();
    }
  }
  document.addEventListener("click", clickHandler);
}

/**
 * Checks if the user clicked outside the specified container.
 *
 * @param {Event} event - The click event.
 * @param {string} containerId - The ID of the container to check.
 * @returns {boolean} - Returns true if the click is outside the container.
 */
function userClicksOutsideOfInputField(event, containerId) {
  let container = document.getElementById(containerId);
  if (container) {
    return !container.contains(event.target);
  }
  return true;
}

/**
 * Closes the contact list window.
 *
 * @param {number} i - The index of the task.
 */
function closeContactWindow(i) {
  let contactList = document.getElementById("contactList");
  let contactListIcons = document.getElementById("contactListIcons");
  let border = document.getElementById("contactSelectContainer");
  let image = document.getElementById("openerAssignedTo");
  if (contactList && contactListIcons && border && image) {
    contactList.style.display = "none";
    contactListIcons.style.display = "block";
    border.classList.remove("borderColor");
    image.src = "../assets/img/add_task/arrow_drop_down.svg";
    image.onclick = function () {
      openContacts(i);
    };
  }
}

/**
 * Removes the event listener for closing the contact list window.
 */
function removeClickListener() {
  document.removeEventListener("click", removeClickListener);
}

/**
 * Füllt das Signaturfeld mit den Anfangsbuchstaben jedes Wortes in der übergebenen Liste.
 *
 * @param {string[]} words - Ein Array von Wörtern, aus denen die Signatur gebildet wird.
 */
function fillSignature(words) {
  for (let j = 0; j < words.length; j++) {
    signature += words[j].charAt(0);
    document.getElementById(`pupUpIcon${n}`).innerHTML = signature;
  }
}
