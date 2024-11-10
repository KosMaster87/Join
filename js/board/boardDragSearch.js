let currentDragElement;

/**
 * this function save all infos into the backend.
 */
async function savedUsersInBackend() {
  await setItem("users", users);
}

/**
 *
 * fill the Variablo with the number of task
 *
 * @param {*} i -container what Dragging
 */
function startDragging(i) {
  currentDragElement = i;
}

function allowDrop(ev) {
  ev.preventDefault();
}

/**
 *
 * switch the Task Status and reload taskfields
 *
 * @param {*} newStatus - is the new Status of the Task
 */
async function moveTo(newStatus) {
  user.tasks[currentDragElement].status = newStatus;
  savedUsersInBackend();
  clearBoardTasksField();
  loadTasks();
}

/**
 *
 * Add the background of the field who involved in the dragged
 *
 * @param {*} id - id from taskfield
 */
function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

/**
 *
 * remove the background of the field who involved in the dragged
 * @param {*} id - id from taskfield
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

/**
 * This function filter the search keys in the tasks, when merge, it post the task.
 */
async function filterTitles() {
  let search = document.getElementById("boardSearchInput").value.toLowerCase();
  clearBoardTasksField();
  for (let i = 0; i < user.tasks.length; i++) {
    let inTitle = user.tasks[i].title.toLowerCase();
    let inDesc = user.tasks[i].description.toLowerCase();
    if (inTitle.includes(search) || inDesc.includes(search)) {
      if (user.tasks[i].status === "to-do") {
        fillTodo(i);
      } else if (user.tasks[i].status === "progress") {
        fillProgress(i);
      } else if (user.tasks[i].status === "await") {
        fillAwait(i);
      } else if (user.tasks[i].status === "done") {
        fillDone(i);
      }
    }
  }
  checkNofilledTasks();
}

/**
 * this function clear all taskfields
 */
function clearBoardTasksField() {
  document.getElementById(`TodoMainContainer`).classList.remove("drag-area-highlight");
  document.getElementById(`progressMainContainer`).classList.remove("drag-area-highlight");
  document.getElementById(`awaitMainContainer`).classList.remove("drag-area-highlight");
  document.getElementById(`doneMainContainer`).classList.remove("drag-area-highlight");
  document.getElementById(`TodoMainContainer`).innerHTML = "";
  document.getElementById(`progressMainContainer`).innerHTML = "";
  document.getElementById(`awaitMainContainer`).innerHTML = "";
  document.getElementById(`doneMainContainer`).innerHTML = "";
}
