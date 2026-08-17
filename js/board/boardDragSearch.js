/**
 * @fileoverview Board drag-and-drop and search functionality.
 *
 * @description
 * Handles drag-and-drop operations for task management and search/filter
 * functionality for tasks on the board. Includes task status updates,
 * visual feedback during drag operations, and real-time task filtering.
 *
 * Key features:
 * - Drag-and-drop task reordering between columns
 * - Visual highlight feedback during drag operations
 * - Task search and filtering by title/description
 * - Backend synchronization after status changes
 * - Board container management and clearing
 *
 * @module boardDragSearch
 */

let currentDragElement;
let activePrioFilter = null;

/**
 * Initializes dragging of a task.
 * @param {number} i - Task index being dragged.
 */
const startDragging = (i) => {
  currentDragElement = i;
};

/**
 * Prevents default drop behavior.
 * @param {Event} ev - Drop event.
 */
const allowDrop = (ev) => {
  ev.preventDefault();
};

/**
 * Updates task status in data.
 * @param {string} newStatus - New status value.
 */
const updateTaskStatus = (newStatus) => {
  user.tasks[currentDragElement].status = newStatus;
  store.updateTask(currentDragElement, { status: newStatus });
};

/**
 * Reloads board after status change.
 */
const reloadBoard = () => {
  clearBoardTasksField();
  loadTasks();
};

/**
 * Changes dragged task status and reloads board.
 * @param {string} newStatus - New status to set.
 */
const moveTo = async (newStatus) => {
  updateTaskStatus(newStatus);
  await savedUsersInBackend();
  reloadBoard();
};

/**
 * Highlights task drop area.
 * @param {string} id - Container ID to highlight.
 */
const highlight = (id) => {
  document.getElementById(id).classList.add("drag-area-highlight");
};

/**
 * Removes highlight from drop area.
 * @param {string} id - Container ID to unhighlight.
 */
const removeHighlight = (id) => {
  document.getElementById(id).classList.remove("drag-area-highlight");
};

/**
 * Gets search input value.
 * @returns {string} Lowercase search term.
 */
const getSearchValue = () => {
  return document.getElementById("boardSearchInput").value.toLowerCase();
};

/**
 * Checks if task matches search.
 * @param {number} i - Task index.
 * @param {string} search - Search term.
 * @returns {boolean} True if task matches.
 */
const taskMatchesSearch = (i, search) => {
  const inTitle = user.tasks[i].title.toLowerCase();
  const inDesc = user.tasks[i].description.toLowerCase();
  return inTitle.includes(search) || inDesc.includes(search);
};

/**
 * Checks if task matches active priority filter.
 * @param {number} i - Task index.
 * @returns {boolean} True if task matches filter or no filter is active.
 */
const taskMatchesPrio = (i) => {
  if (!activePrioFilter) return true;
  return user.tasks[i].prio === activePrioFilter;
};

/**
 * Updates visual state of priority filter buttons.
 */
const updatePrioFilterButtons = () => {
  ["Urgent", "Medium", "Low"].forEach((prio) => {
    const btn = document.getElementById(`filter${prio}`);
    if (!btn) return;
    btn.classList.toggle("prioFilterBtn--active", activePrioFilter === prio);
  });
};

/**
 * Applies both text search and priority filter.
 */
const applyFilters = () => {
  const search = getSearchValue();
  clearBoardTasksField();
  user.tasks.forEach((_, i) => {
    if (taskMatchesSearch(i, search) && taskMatchesPrio(i)) {
      fillTaskByStatus(i);
    }
  });
  checkNoFilledTasks();
};

/**
 * Toggles priority filter on/off and re-renders board.
 * @param {string} prio - Priority value: "Urgent", "Medium", or "Low".
 */
const togglePrioFilter = (prio) => {
  activePrioFilter = activePrioFilter === prio ? null : prio;
  updatePrioFilterButtons();
  applyFilters();
};

/**
 * Fills task by status.
 * @param {number} i - Task index.
 */
const fillTaskByStatus = (i) => {
  const container = document.getElementById(getContainerIdByStatus(user.tasks[i].status));
  if (!container) return;
  const isAwait = user.tasks[i].status === "await";
  const htmlTemplate = isAwait ? awaitHtmlReturn(i) : HtmlReturn(i);
  container.innerHTML += htmlTemplate;
  fillValue(i);
};

/**
 * Gets container ID by task status.
 * @param {string} status - Task status.
 * @returns {string} Container ID.
 */
const getContainerIdByStatus = (status) => {
  const containers = {
    "to-do": "TodoMainContainer",
    progress: "progressMainContainer",
    await: "awaitMainContainer",
    done: "doneMainContainer",
  };
  return containers[status] || "";
};

/**
 * Filters and displays tasks by search term and active priority filter.
 */
const filterTitles = () => {
  applyFilters();
};

/**
 * Removes highlights from all containers.
 */
const removeAllHighlights = () => {
  ["TodoMainContainer", "progressMainContainer", "awaitMainContainer", "doneMainContainer"].forEach(
    (id) => {
      document.getElementById(id).classList.remove("drag-area-highlight");
    }
  );
};

/**
 * Clears all container contents.
 */
const clearAllContainerContents = () => {
  ["TodoMainContainer", "progressMainContainer", "awaitMainContainer", "doneMainContainer"].forEach(
    (id) => {
      document.getElementById(id).innerHTML = "";
    }
  );
};

/**
 * Clears all task fields on board.
 */
const clearBoardTasksField = () => {
  removeAllHighlights();
  clearAllContainerContents();
};

window.startDragging = startDragging;
window.allowDrop = allowDrop;
window.moveTo = moveTo;
window.highlight = highlight;
window.removeHighlight = removeHighlight;
window.togglePrioFilter = togglePrioFilter;
