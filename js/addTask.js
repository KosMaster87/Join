let selectedTitle = "";
let selectedDescription = "";
let selectedAssignedto = [];
let selectedDueDate = "";
let selectedPrio = "";
let selectedCategory = "";
let subtasks = [];
let statusInfo = "to-do";
let mobilVersion;
let contacts = [];

/**
 * This function load task in the user backend.
 */
async function assignTaskToUser() {
  user.tasks.push({
    status: statusInfo,
    title: selectedTitle,
    description: selectedDescription,
    assignedTo: selectedAssignedto,
    dueDate: selectedDueDate,
    prio: selectedPrio,
    category: selectedCategory,
    subtasks: subtasks,
  });
  await setItem("users", users);
  await includeContentHTML("board");
}

/**
 * This function is the first function when open the page
 */
async function initAddTask() {
  await includeHTML();
  await loadCurrentUserAlsoUsersAsObject();
  createUserSignatureIcon();
  setActiveLink("navAddTask");
  checkWidth();
  contacts = user.contacts;
  statusInfo = "to-do";
  whatsPrio(prioMediumContainer);
  preparePopupEvent();
  closeListener();
}

/**
 * This function start check when width changed
 */
window.addEventListener("resize", function () {
  checkWidth();
});

/**
 * This function checked the required field
 */
async function requiredFields() {
  inputAbfrage();
  dueDateRequired();
  categoryRequired();
  let description = document.getElementById(`descriptionInput`);
  selectedDescription = description.value;
  if (selectedCategory !== "" && selectedDueDate !== "" && selectedTitle !== "") {
    await assignTaskToUser();
  }
}

/**
 * This function check the witdh for over 1219 or lower
 */
function checkWidth() {
  let screenWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (screenWidth <= 1219) {
    mobilVersion = true;
  } else {
    mobilVersion = false;
  }
  loadContent();
}

/**
 * This function load html for the desktop inner width
 */
function loadContent() {
  let screenWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
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
 * This function checked the required of the title container
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
 * This function checked the required of the dueDate container
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
 * This function check the right input of the category container
 */
function checkCategory() {
  let inputfield = document.getElementById("categoryText");
  let content = inputfield.textContent || inputfield.innerText;
  return content.trim() === "Technical Task" || content.trim() === "User Story";
}

/**
 * This function checked the required of the category container
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
 * This function edit the color of the clicked prio container
 *
 * @param {string} clickedContainerId - This is the number of the container that was clicked
 */
function whatsPrio(clickedContainerId) {
  removeWhiteImg();
  removePrio();
  changePrioColor(clickedContainerId);
}

/**
 * This function remove the background color of prio container
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
 * This function remove the images to images non used prio
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
 * This function change the color of the clicked prio container
 *
 * @param {string} clickedContainerId - is the id from the clicken container
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
 * This function change the background color of the low container
 *
 * @param {string} imgLow - - Is the id from the image
 */
function changePrioColorLow(imgLow) {
  prioLowContainer.classList.add("prioLow");
  selectedPrio = "Low";
  imgLow.src = "../assets/img/add_task/arrow_bottom_white.svg";
}

/**
 * This function change the background color of the medium container
 *
 * @param {string} imgMedium - Is the id from the image
 */
function changePrioColorMedium(imgMedium) {
  prioMediumContainer.classList.add("prioMedium");
  selectedPrio = "Medium";
  imgMedium.src = "../assets/img/add_task/line_white.svg";
}

/**
 * This function change the background color of the urgent container
 *
 * @param string imgUrgent - Is the id from the image
 */
function changePrioColorUrgent(imgUrgent) {
  prioUrgentContainer.classList.add("prioUrgent");
  selectedPrio = "Urgent";
  imgUrgent.src = "../assets/img/add_task/arrow_top_white.svg";
}

/**
 * This function is for that the task cant use a date in the past
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
 * This function open the category
 */
function openCategorySelect() {
  closeContacts();
  content = document.getElementById(`categoryMenu`);
  document.getElementById("contactList").style.display = "block";
  document.getElementById("contactListIcons").style.display = "none";
  document.getElementById(`contactSelectContainer`).classList.remove("bordercolor");
  content.innerHTML += openCategorySelectReturn();
  document.getElementById(`categoryMenu`).style.display = "block";
  border = document.getElementById(`categorySelectContainer`);
  border.classList.add("bordercolor");
  categoryImageUp();
}

/**
 * This function change the image when the category menu opened
 */
function categoryImageUp() {
  image = document.getElementById(`categoryImage`);
  content = document.getElementById(`categorySelectContainer`);
  image.src = "../assets/img/add_task/arrow_drop_up.svg";
  content.onclick = closeCategoryMenu;
}

/**
 * This function change the name from the choosed category to the required field
 *
 * @param {string} selectedOption - This string change the name of the category
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
 * This function close the category menu
 */
function closeCategoryMenu() {
  div = document.getElementById(`categoryMenu`);
  div.innerHTML = "";
  border = document.getElementById(`categorySelectContainer`);
  border.classList.remove("bordercolor");
  categoryImageDown();
}

/**
 * this function chance the image when the category choose menu and switch the onclick for close the menu
 */
function categoryImageDown() {
  image = document.getElementById(`categoryImage`);
  content = document.getElementById(`categorySelectContainer`);
  image.src = "../assets/img/add_task/arrow_drop_down.svg";
  content.onclick = openCategorySelect;
}

/**
 * This function change the menufield of the subtaks inputfield
 */
function changemenu() {
  container = document.getElementById(`subTaskInputfieldMenu`);
  container.innerHTML = changemenuReturn();
  let border = document.getElementById(`subTaskInputcontainer`);
  border.classList.add("bordercolor");
}

/**
 * This function creat a subtask
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
 * This function filled the created subtask Container
 */
function renderSubtasks() {
  let subtasksList = document.getElementById("subTasksContainer");
  subtasksList.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    subtasksList.innerHTML += renderSubtasksReturn(subtasks, i);
  }
}

/**
 * This function change the subtask from div to inputfield
 *
 * @param {int} i - This is the number of subtask
 */
function editSubtask(i) {
  let text = document.getElementById("subTastTextfield" + i).innerText;
  let content = document.getElementById("subtask" + i);
  content.innerHTML = editSubtaskReturn(subtasks[i].name, i);
  document.getElementById(`editSubtask${i}`).value = text;
}

/**
 * This function finish the edit of a creat subtask
 *
 * @param {int} i - This is the number ob subtask
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
 * This function delete the current subtask
 *
 * @param {int} i - This is the number of the subtask
 */
function deleteSubtask(i) {
  subtasks.splice(i, 1);
  renderSubtasks();
}
