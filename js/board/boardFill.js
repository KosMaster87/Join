/**
 *
 * if i status to-do render the informations
 *
 * @param {string} i - is the number of the task
 */
function fillTodo(i) {
  document.getElementById(`TodoMainContainer`).innerHTML += HtmlReturn(i);
  fillValue(i);
  whatsCategory(i);
  whatsSignatures(i);
  updateProgressBar(i);
}

/**
 *
 * if i status progress render the informations
 *
 * @param {string} i
 */
function fillProgress(i) {
  document.getElementById(`progressMainContainer`).innerHTML += HtmlReturn(i);
  fillValue(i);
  whatsCategory(i);
  whatsSignatures(i);
  updateProgressBar(i);
}

/**
 *
 * if i status progress render the informations
 *
 * @param {*} i - is the number of the task
 */
function fillAwait(i) {
  document.getElementById(`awaitMainContainer`).innerHTML += awaitHtmlReturn(i);
  fillValue(i);
  whatsCategory(i);
  whatsSignatures(i);
  updateProgressBar(i);
}

/**
 *
 * if i status done render the informations
 *
 * @param {*} i - is the number of the task
 */
function fillDone(i) {
  document.getElementById(`doneMainContainer`).innerHTML += HtmlReturn(i);
  fillValue(i);
  whatsCategory(i);
  whatsSignatures(i);
  updateProgressBar(i);
}

/**
 * fill values with array informations
 *
 * @param {*} i - is the number of the task
 */
function fillValue(i) {
  document.getElementById(`TaskCategory${i}`).textContent = user.tasks[i].category;
  document.getElementById(`titleId${i}`).textContent = user.tasks[i].title;
  document.getElementById(`descriptionID${i}`).textContent = user.tasks[i].description;
  document.getElementById(`PrioImageContainer${i}`).src = `../assets/img/board/board_${user.tasks[
    i
  ].prio.toLowerCase()}.svg`;
  document.getElementById(`counterOfTasks${i}`).innerHTML = `${user.tasks[i].subtasks.length}`;
  pupUpPriorityName = user.tasks[i].prio;
}

/**
 * when no task in the container X is fill a div with text no tasks
 */
function checkNofilledTasks() {
  if (document.getElementById("TodoMainContainer").innerHTML.trim() === "") {
    document.getElementById("TodoMainContainer").innerHTML = noTasksReturn("to-do");
  }
  if (document.getElementById("progressMainContainer").innerHTML.trim() === "") {
    document.getElementById("progressMainContainer").innerHTML = noTasksReturn("in progress");
  }
  if (document.getElementById("awaitMainContainer").innerHTML.trim() === "") {
    document.getElementById("awaitMainContainer").innerHTML = noTasksReturn("awaited");
  }
  if (document.getElementById("doneMainContainer").innerHTML.trim() === "") {
    document.getElementById("doneMainContainer").innerHTML = noTasksReturn("finished");
  }
}

/**
 * change the backgroundcolor of the priority
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
 * remove the backgroundcolors of selected priority
 */
function removePrio() {
  document.getElementById("prioLowContainer").classList.remove("prioLow");
  document.getElementById("prioMediumContainer").classList.remove("prioMedium");
  document.getElementById("prioUrgentContainer").classList.remove("prioUrgent");
}

/**
 * remove the image of selected priority
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
 *
 * change the backgroundcolor of selected priority
 *
 * @param {*} clickedContainerId - clicked priorityContainer
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
 *
 * render the finished subtasks in a bar
 *
 * @param {*} i - is the number of the task
 */
function updateProgressBar(i) {
  let counter = 0;
  let percent = 0;

  if (user.tasks[i].subtasks.length === 0) {
    document.getElementById("progressMainContainerId" + i).style.display = "none";
  } else {
    document.getElementById("progressMainContainerId" + i).style.display = "flex";
    for (let p = 0; p < user.tasks[i].subtasks.length; p++) {
      if (user.tasks[i].subtasks[p].done === true) {
        counter++;
      }
    }
    percent = (counter / user.tasks[i].subtasks.length) * 100;
    if (percent >= 0) {
      document.getElementById(`finishedTasks${i}`).innerHTML = counter;
    }
    if (percent >= 0) {
      document.getElementById(`progressBar${i}`).style.width = percent + "%";
    }
  }
}

/**
 *
 * change the backgroundcolor for the right category
 *
 * @param {*} i - is the number of the task
 */
function whatsCategory(i) {
  if (user.tasks[i].category === "User Story") {
    document.getElementById(`TaskCategory${i}`).style.backgroundColor = "#0038FF";
  } else if (user.tasks[i].category === "Technical Task") {
    document.getElementById(`TaskCategory${i}`).style.backgroundColor = "#1FD7C1";
  }
}

/**
 *
 * render icons and render the signatures
 *
 * @param {*} i - is the number of the task
 */
function whatsSignatures(i) {
  iconBarContainer = document.getElementById(`IconBar${i}`);
  for (let a = 0; a < 4; a++) {
    let signature = "";
    if (user.tasks[i] && user.tasks[i].assignedTo[a] && user.tasks[i].assignedTo[a].name) {
      let words = user.tasks[i].assignedTo[a].name.toUpperCase().split(" ");
      for (let j = 0; j < words.length; j++) {
        signature += words[j].charAt(0);
        color = user.tasks[i].assignedTo[a].userColor;
      }
      iconBarContainer.innerHTML += iconReturn(color, signature);
    }
  }
  if (user.tasks[i].assignedTo.length > 4) {
    removeLastIcon(i)
    moreAssignedTo(i);
  }
}

/**
 * 
 * remve the last icon in the bar.
 * 
 * @param {*} i - is the number of the iconbar
 */
function removeLastIcon(i) {
let iconBar = document.getElementById(`IconBar${i}`);
let icons = iconBar.getElementsByClassName("iconstlye");
      let lastIcon = icons[icons.length - 1];
      iconBar.removeChild(lastIcon);
}

/**
 * 
 * fill a iconbar with the number of more than 3 assigneds
 * 
 * @param {} i -is the number of the task 
 */
function moreAssignedTo(i){
  iconBarContainer = document.getElementById(`IconBar${i}`);
  let number = "+" + (user.tasks[i].assignedTo.length - 3);
  let numberColow = "var(--lightGray)";
  iconBarContainer.innerHTML += iconReturn(numberColow, number);
}

/**
 * add an Eventlistener for close die lists when clicked outside of container Contact´s or category
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

function userClicksOutsideOfInputField(event, containerId) {
  let container = document.getElementById(containerId);
  if (container) {
    return !container.contains(event.target);
  }
  return true;
}

/**
 * this function close the contact list window
 */
function closeContactWindow(i) {
  let contactList = document.getElementById("contactList");
  let contactListIcons = document.getElementById("contactListIcons");
  let border = document.getElementById("contactSelectContainer");
  let image = document.getElementById("openerAssignedTo");
  if (contactList && contactListIcons && border && image) {
    contactList.style.display = "none";
    contactListIcons.style.display = "block";
    border.classList.remove("bordercolor");
    image.src = "../assets/img/add_task/arrow_drop_down.svg";
    image.onclick = function () {
      openContacts(i);
    };
  }
}

/**
 * remove the eventlistener
 */
function removeClickListener() {
  document.removeEventListener("click", removeClickListener);
}

function fillrenderTaskAssigneds(i, n) {
  let bgColor = user.tasks[i].assignedTo[n].userColor;
  document.getElementById(`pupUpIcon${n}`).style.backgroundColor = bgColor;
  document.getElementById(`popUpAssignedTo${n}`).innerHTML = user.tasks[i].assignedTo[n].name;
  let signature = "";
  let words = user.tasks[i].assignedTo[n].name.toUpperCase().split(" ");
  fillSignature(words);
}

function fillSignature(words) {
  for (let j = 0; j < words.length; j++) {
    signature += words[j].charAt(0);
    document.getElementById(`pupUpIcon${n}`).innerHTML = signature;
  }
}
