let selectedTitle = "";
let selectedDescription = "";
let selectedAssignedTo = [];
let selectedDueDate = "";
let selectedPrio = "";
let selectedCategory = "";
let subtasks = [];
let statusInfo = "to-do";
let mobilVersion = false;
let contacts = [];

/**
 * This function assigns a task to the user by updating the user's task list in the backend.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the task is assigned.
 */
async function assignTaskToUser() {
  if (!user.tasks) {
    user.tasks = [];
  }

  user.tasks.push({
    status: statusInfo,
    title: selectedTitle,
    description: selectedDescription,
    assignedTo: selectedAssignedTo,
    dueDate: selectedDueDate,
    prio: selectedPrio,
    category: selectedCategory,
    subtasks: subtasks,
  });

  const collection = user.isGuest ? "guests" : "users";
  await setItem(collection, user.id, { tasks: user.tasks });

  await includeContentHTML("board");
}

/**
 * This function initializes the task creation page by loading required resources.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function initAddTask() {
  await includeHTML();
  await loadUsersAndCurrentUser();
  createUserSignatureIcon();
  setActiveLink("navAddTask");
  checkWidth();
  contacts = user.contacts || [];
  statusInfo = "to-do";
  whatsPrio(prioMediumContainer);
  preparePopupEvent();
  closeListener();
}

/**
 * This function checks if the required fields are filled before assigning a task to the user.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the required fields are validated.
 */
async function requiredFields() {
  inputAbfrage();
  dueDateRequired();
  categoryRequired();
  let description = document.getElementById(`descriptionInput`);
  selectedDescription = description.value;
  if (
    selectedCategory !== "" &&
    selectedDueDate !== "" &&
    selectedTitle !== ""
  ) {
    await assignTaskToUser();
  }
}

/**
 * Event listener that triggers when the window is resized.
 *
 * @function
 */
window.addEventListener("resize", function () {
  checkWidth();
});

/**
 * This function checks if the screen width is over 1219px or lower and adjusts the layout accordingly.
 *
 * @function
 */
function checkWidth() {
  let screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (screenWidth <= 1219) {
    mobilVersion = true;
  } else {
    mobilVersion = false;
  }
  loadContent();
}

/**
 * This function loads HTML content based on the screen width for the desktop or mobile version.
 *
 * @function
 */
function loadContent() {
  let screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  let content = document.getElementById(`taskMainContainer`);
  content.innerHTML = "";
  if (screenWidth <= 1219 && mobilVersion == true) {
    mobilVersion = true;
    content.innerHTML = renderAddTaskMobileHTML();
    footerMobile();
  }
  if (screenWidth > 1219 && mobilVersion == false) {
    mobilVersion = false;
    content.innerHTML = renderAddTaskHTML();
    footer();
  }
}

/**
 * This function checks if the title input field is filled.
 *
 * @function
 */
function inputAbfrage() {
  let inputfield = document.getElementById("titelInputContainer");
  let inputRequired = document.getElementById("inputRequiredContainer");
  let text = document.getElementById("titelInputContainer");
  if (inputfield.value.trim() === "") {
    inputfield.classList.add("requiredBorder");
    inputRequired.innerHTML = "This field is required";
  } else {
    selectedTitle = text.value;
    inputfield.classList.remove("requiredBorder");
    inputRequired.innerHTML = "";
  }
}

/**
 * This function checks if the due date input field is filled.
 *
 * @function
 */
function dueDateRequired() {
  inputfield = document.getElementById(`dueDateInputContainer`);
  inputRequired = document.getElementById(`dueDateRequiredContainer`);
  let date = document.getElementById(`dueDateInputContainer`);
  if (inputfield.value.trim() === "") {
    inputfield.classList.add("requiredBorder");
    inputRequired.innerHTML = "This field is required";
  } else {
    selectedDueDate = date.value;
    inputRequired.innerHTML = "";
    inputfield.classList.remove("requiredBorder");
  }
}

/**
 * This function checks if the category input field contains a valid value (either 'Technical Task' or 'User Story').
 *
 * @function
 * @returns {boolean} `true` if the category is valid, otherwise `false`.
 */
function checkCategory() {
  let inputfield = document.getElementById("categoryText");
  let content = inputfield.textContent || inputfield.innerText;
  return content.trim() === "Technical Task" || content.trim() === "User Story";
}

/**
 * This function checks if the category field is filled correctly.
 *
 * @function
 */
function categoryRequired() {
  border = document.getElementById(`categorySelectContainer`);
  inputfield = document.getElementById(`categoryText`);
  inputRequired = document.getElementById(`categoryRequiredContainer`);
  let isCategoryValid = checkCategory();
  if (isCategoryValid) {
    inputfield.value = "";
    inputRequired.innerHTML = "";
    border.classList.remove("requiredBorder");
  } else {
    border.classList.add("requiredBorder");
    inputRequired.innerHTML = "This field is required";
  }
}

/**
 * This function updates the priority of the task by changing the background color of the clicked container.
 *
 * @param {string} clickedContainerId - The ID of the clicked priority container.
 * @function
 */
function whatsPrio(clickedContainerId) {
  removeWhiteImg();
  removePrio();
  changePrioColor(clickedContainerId);
}

/**
 * This function removes the background color from all priority containers.
 *
 * @function
 */
function removePrio() {
  let prioLowContainer = document.getElementById("prioLowContainer");
  let prioMediumContainer = document.getElementById("prioMediumContainer");
  let prioUrgentContainer = document.getElementById("prioUrgentContainer");
  prioLowContainer.classList.remove("prioLow");
  prioMediumContainer.classList.remove("prioMedium");
  prioUrgentContainer.classList.remove("prioUrgent");
}

/**
 * This function resets the images for all priority containers to their default state.
 *
 * @function
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
 * This function changes the color of the clicked priority container.
 *
 * @param {string} clickedContainerId - The ID of the clicked priority container.
 * @function
 */
function changePrioColor(clickedContainerId) {
  let imgUrgent = prioUrgentContainer.querySelector("img");
  let imgMedium = prioMediumContainer.querySelector("img");
  let imgLow = prioLowContainer.querySelector("img");
  if (clickedContainerId === prioLowContainer) {
    changePrioColorLow(imgLow);
  } else if (clickedContainerId === prioMediumContainer) {
    changePrioColorMedium(imgMedium);
  } else if (clickedContainerId === prioUrgentContainer) {
    changePrioColorUrgent(imgUrgent);
  }
}

/**
 * This function changes the background color of the low priority container.
 *
 * @param {string} imgLow - The image element associated with the low priority container.
 * @function
 */
function changePrioColorLow(imgLow) {
  prioLowContainer.classList.add("prioLow");
  selectedPrio = "Low";
  imgLow.src = "../assets/img/add_task/arrow_bottom_white.svg";
}

/**
 * This function changes the background color of the medium priority container.
 *
 * @param {string} imgMedium - The image element associated with the medium priority container.
 * @function
 */
function changePrioColorMedium(imgMedium) {
  prioMediumContainer.classList.add("prioMedium");
  selectedPrio = "Medium";
  imgMedium.src = "../assets/img/add_task/line_white.svg";
}

/**
 * This function changes the background color of the urgent priority container.
 *
 * @param {string} imgUrgent - The image element associated with the urgent priority container.
 * @function
 */
function changePrioColorUrgent(imgUrgent) {
  prioUrgentContainer.classList.add("prioUrgent");
  selectedPrio = "Urgent";
  imgUrgent.src = "../assets/img/add_task/arrow_top_white.svg";
}

/**
 * This function sets the minimum date for the due date input field to today's date.
 *
 * @function
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
 * This function opens the category selection menu.
 *
 * @function
 */
function openCategorySelect() {
  closeContacts();
  content = document.getElementById(`categoryMenu`);
  document.getElementById("contactList").style.display = "block";
  document.getElementById("contactListIcons").style.display = "none";
  document
    .getElementById(`contactSelectContainer`)
    .classList.remove("borderColor");
  content.innerHTML += openCategorySelectReturn();
  document.getElementById(`categoryMenu`).style.display = "block";
  border = document.getElementById(`categorySelectContainer`);
  border.classList.add("borderColor");
  categoryImageUp();
}

/**
 * This function changes the category menu's image when the category menu is opened.
 *
 * @function
 */
function categoryImageUp() {
  image = document.getElementById(`categoryImage`);
  content = document.getElementById(`categorySelectContainer`);
  image.src = "../assets/img/add_task/arrow_drop_up.svg";
  content.onclick = closeCategoryMenu;
}

/**
 * This function updates the category name in the field and checks the inputs.
 *
 * @param {string} selectedOption - The selected category name.
 * @function
 */
function selectCategory(selectedOption) {
  let content = document.getElementById(`categoryText`);
  let image = document.getElementById(`categoryImage`);
  content.innerHTML = `${selectedOption}`;
  selectedCategory = content.innerText;
  image.src = "../assets/img/add_task/arrow_drop_up.svg";
  closeCategoryMenu();
  checkInputs();
}

/**
 * This function closes the category menu.
 *
 * @function
 */
function closeCategoryMenu() {
  div = document.getElementById(`categoryMenu`);
  div.innerHTML = "";
  border = document.getElementById(`categorySelectContainer`);
  border.classList.remove("borderColor");
  categoryImageDown();
}

/**
 * This function changes the category menu image when the category menu is closed.
 *
 * @function
 */
function categoryImageDown() {
  image = document.getElementById(`categoryImage`);
  content = document.getElementById(`categorySelectContainer`);
  image.src = "../assets/img/add_task/arrow_drop_down.svg";
  content.onclick = openCategorySelect;
}

/**
 * This function changes the subtask input field's menu appearance.
 *
 * @function
 */
function changeMenu() {
  container = document.getElementById(`subTaskInputfieldMenu`);
  container.innerHTML = changeMenuReturn();
  let border = document.getElementById(`subTaskInputContainer`);
  border.classList.add("borderColor");
}

/**
 * This function adds a subtask to the task list.
 *
 * @function
 */
function addSubtask() {
  if (document.getElementById(`subTaskInputfieldText`).value) {
    let subtasksInput = document.getElementById("subTaskInputfieldText");
    let newSubtask = {
      name: subtasksInput.value,
      done: false,
    };
    subtasks.push(newSubtask);
    renderSubtasks();
    clearSubtaskInputfield();
  }
}

/**
 * This function renders all the subtasks in the container.
 *
 * @function
 */
function renderSubtasks() {
  let subtasksList = document.getElementById("subTasksContainer");
  subtasksList.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    subtasksList.innerHTML += renderSubtasksReturn(subtasks, i);
  }
}

/**
 * This function edits the selected subtask by changing the text content to an input field.
 *
 * @param {number} i - The index of the subtask being edited.
 * @function
 */
function editSubtask(i) {
  let text = document.getElementById("ssubTaskTextfield" + i).innerText;
  let content = document.getElementById("subtask" + i);
  content.innerHTML = editSubtaskReturn(subtasks[i].name, i);
  document.getElementById(`editSubtask${i}`).value = text;
}

/**
 * This function finalizes the editing of a subtask and updates the task list.
 *
 * @param {number} i - The index of the subtask being edited.
 * @function
 */
function editSubtaskDone(i) {
  let content = document.getElementById("editSubtask" + i).value;
  if (content.length > 0) {
    subtasks[i].name = content;
    renderSubtasks();
  } else {
    deleteSubtask(i);
  }
}

/**
 * This function deletes a subtask from the task list.
 *
 * @param {number} i - The index of the subtask being deleted.
 * @function
 */
function deleteSubtask(i) {
  subtasks.splice(i, 1);
  renderSubtasks();
}
