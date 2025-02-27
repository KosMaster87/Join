let currentDragElement;

/**
 * This function saves all user data into the backend.
 */
async function savedUsersInBackend() {
  const collection = user.isGuest ? "guests" : "users";
  const userId = user.id;

  await setItem(collection, userId, { tasks: user.tasks });
}

/**
 * This function initializes the dragging of a task and stores the task index.
 *
 * @param {number} i - The index of the task being dragged.
 */
function startDragging(i) {
  currentDragElement = i;
}

/**
 * Prevent the default behavior for drop events.
 *
 * @param {Event} ev - The event object for the drop event.
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Change the status of the currently dragged task and reload the task fields.
 *
 * @param {string} newStatus - The new status to set for the task.
 */
async function moveTo(newStatus) {
  user.tasks[currentDragElement].status = newStatus;
  savedUsersInBackend();
  clearBoardTasksField();
  loadTasks();
}

/**
 * Highlight the task field involved in the drag operation.
 *
 * @param {string} id - The id of the task field to be highlighted.
 */
function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

/**
 * Remove the highlight from the task field involved in the drag operation.
 *
 * @param {string} id - The id of the task field to remove the highlight from.
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

/**
 * This function filters tasks based on the search input and posts the relevant tasks.
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
  checkNoFilledTasks();
}

/**
 * This function clears all the task fields on the board.
 */
function clearBoardTasksField() {
  document
    .getElementById(`TodoMainContainer`)
    .classList.remove("drag-area-highlight");
  document
    .getElementById(`progressMainContainer`)
    .classList.remove("drag-area-highlight");
  document
    .getElementById(`awaitMainContainer`)
    .classList.remove("drag-area-highlight");
  document
    .getElementById(`doneMainContainer`)
    .classList.remove("drag-area-highlight");
  document.getElementById(`TodoMainContainer`).innerHTML = "";
  document.getElementById(`progressMainContainer`).innerHTML = "";
  document.getElementById(`awaitMainContainer`).innerHTML = "";
  document.getElementById(`doneMainContainer`).innerHTML = "";
}
