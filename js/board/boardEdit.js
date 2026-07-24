/**
 * @fileoverview Board task editing orchestration.
 * Handles task editing operations and contact assignment coordination.
 * @description Provides orchestration for task editing.
 * Contact management moved to board-contact-management.js
 * Navigation logic moved to board-contact-navigation.js
 * UI helpers moved to board-ui-helpers.js
 * @module boardEdit
 */

let switchTaskTriggered = false;

/**
 * Toggles contact selection state.
 * @param {number} i - Contact index.
 * @param {number} j - Task index.
 */
const assignedToContactBg = async (i, j) => {
  if (user.contacts[i].selected) {
    deselectContact(i, j);
  } else {
    selectContact(i, j);
  }
  await savedUsersInBackend();
};

/**
 * Filters contacts by search term.
 */
const filterNamesForAssignedTo = () => {
  const search = getContactSearchValue();
  const list = document.getElementById("contactList");
  list.innerHTML = "";
  openContactList();
  user.contacts.forEach((contact, i) => {
    if (contact.name.toLowerCase().includes(search)) {
      renderFilteredContact(i, list);
    }
  });
};

/**
 * Removes popup and shows updated task.
 * @param {number} i - Task index.
 */
const removePopupAndShowTask = (i) => {
  document.getElementById(`popUpMainContainer`).remove();
  document.getElementById(`blurrContainer`).remove();
  openTask(i);
};

/**
 * Saves changes when OK button pressed.
 * @param {number} i - Task index.
 */
const saveCurrentBoardTask = async (i) => {
  if (window.isSaving) {
    return;
  }
  removeClickListener();
  const values = getTaskInputValues(i);
  updateTaskWithValues(i, values);
  await savedUsersInBackend();
  removePopupAndShowTask(i);
};

/**
 * Creates switch menu HTML.
 * @param {number} i - Task index.
 * @returns {string} Menu HTML.
 */
const createSwitchMenuHTML = (i) => `
  <ul id="menuForSwitchTask" class="menu-options">
    <li class="menuForSwitchTaskMenuHead"> Switch to:</li>
    <li class="menuForSwitchTaskMenu" id="menuForSwitchTaskTodo" onclick="switchTaskTodo(${i})">To Do</li>
    <li class="menuForSwitchTaskMenu" id="menuForSwitchTaskProgress" class="font16400" onclick="switchTaskProgress(${i})">In progress</li>
    <li class="menuForSwitchTaskMenu" id="menuForSwitchTaskAwait" class="font16400" onclick="switchTaskAwait(${i})">Await for Feedback</li>
    <li class="menuForSwitchTaskMenu" id="menuForSwitchTaskDone" class="font16400" onclick="switchTaskDone(${i})">Done</li>
  </ul>
`;

/**
 * Sets close menu handler.
 * @param {number} i - Task index.
 */
const setCloseMenuHandler = (i) => {
  document
    .getElementById(`switchTaskImage${i}`)
    .querySelector("img")
    .setAttribute("onclick", `closeMenu(${i})`);
};

/**
 * Creates menu for switching task status.
 * @param {number} i - Task index.
 */
const switchTask = (i) => {
  switchTaskTriggered = true;
  const menu = document.getElementById(`menuForSwitchTask`);
  if (!menu) {
    document.getElementById(`switchTaskImage${i}`).innerHTML +=
      createSwitchMenuHTML(i);
    checkCurrentStatus(i);
    disableBodyScroll();
    setCloseMenuHandler(i);
  }
};

/**
 * Removes menu item for current status.
 * @param {number} i - Task index.
 */
const checkCurrentStatus = (i) => {
  const statusMap = {
    "to-do": "menuForSwitchTaskTodo",
    progress: "menuForSwitchTaskProgress",
    await: "menuForSwitchTaskAwait",
    done: "menuForSwitchTaskDone",
  };
  const elementId = statusMap[user.tasks[i].status];
  if (elementId) {
    document.getElementById(elementId)?.remove();
  }
};

/**
 * Updates task status and reloads board.
 * @param {number} i - Task index.
 * @param {string} status - New status.
 */
const updateTaskStatusAndReload = async (i, status) => {
  switchTaskTriggered = true;
  await updateTaskStatusAndReloadBoard(i, status);
  closeMenu(i);
};

/**
 * Switches task status to to-do.
 * @param {number} i - Task index.
 */
const switchTaskTodo = async (i) => {
  await updateTaskStatusAndReload(i, "to-do");
};

/**
 * Switches task status to progress.
 * @param {number} i - Task index.
 */
const switchTaskProgress = async (i) => {
  await updateTaskStatusAndReload(i, "progress");
};

/**
 * Switches task status to await.
 * @param {number} i - Task index.
 */
const switchTaskAwait = async (i) => {
  await updateTaskStatusAndReload(i, "await");
};

/**
 * Switches task status to done.
 * @param {number} i - Task index.
 */
const switchTaskDone = async (i) => {
  await updateTaskStatusAndReload(i, "done");
};

/**
 * Sets open menu handler.
 * @param {number} i - Task index.
 */
const setOpenMenuHandler = (i) => {
  document
    .getElementById(`switchTaskImage${i}`)
    .querySelector("img")
    .setAttribute("onclick", `switchTask(${i})`);
};

/**
 * Closes status switch menu.
 * @param {number} i - Task index.
 */
const closeMenu = (i) => {
  switchTaskTriggered = true;
  const menu = document.getElementById("menuForSwitchTask");
  if (menu) {
    menu.remove();
    enableBodyScroll();
    setOpenMenuHandler(i);
  }
};

window.assignedToContactBg = assignedToContactBg;
window.filterNamesForAssignedTo = filterNamesForAssignedTo;
window.saveCurrentBoardTask = saveCurrentBoardTask;
window.switchTask = switchTask;
window.switchTaskTodo = switchTaskTodo;
window.switchTaskProgress = switchTaskProgress;
window.switchTaskAwait = switchTaskAwait;
window.switchTaskDone = switchTaskDone;
window.closeMenu = closeMenu;
