/**
 * @fileoverview Board fill orchestration module.
 * Handles task rendering and status management.
 * @module boardFill
 */

/**
 * Fills todo container with tasks.
 */
const fillTodo = () => {
  for (let i = 0; i < user.tasks.length; i++) {
    if (user.tasks[i].status === "to-do") {
      renderTaskInContainer(i, "TodoMainContainer");
    }
  }
};

/**
 * Fills in progress container with tasks.
 */
const fillProgress = () => {
  for (let i = 0; i < user.tasks.length; i++) {
    if (user.tasks[i].status === "progress") {
      renderTaskInContainer(i, "progressMainContainer");
    }
  }
};

/**
 * Fills await feedback container with tasks.
 */
const fillAwait = () => {
  for (let i = 0; i < user.tasks.length; i++) {
    if (user.tasks[i].status === "await") {
      renderTaskInContainer(i, "awaitMainContainer", true);
    }
  }
};

/**
 * Fills done container with tasks.
 */
const fillDone = () => {
  for (let i = 0; i < user.tasks.length; i++) {
    if (user.tasks[i].status === "done") {
      renderTaskInContainer(i, "doneMainContainer");
    }
  }
};

/**
 * Renders task in specified container.
 * @param {number} i - Task index.
 * @param {string} containerId - Container element ID.
 * @param {boolean} isAwait - Is await feedback container.
 */
const renderTaskInContainer = (i, containerId, isAwait = false) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  const htmlTemplate = isAwait ? awaitHtmlReturn(i) : HtmlReturn(i);
  container.innerHTML += htmlTemplate;
  fillValue(i);
};

/**
 * Generates signature from name.
 * @param {string} assignedName - Name to generate signature.
 * @returns {string} Signature.
 */
const fillSignature = (assignedName) => {
  const name = assignedName.split(" ");
  if (name.length > 1) {
    return name[0].charAt(0) + name[1].charAt(0);
  } else {
    return name[0].charAt(0) + name[0].charAt(1);
  }
};

window.fillTodo = fillTodo;
window.fillProgress = fillProgress;
window.fillAwait = fillAwait;
window.fillDone = fillDone;
window.renderTaskInContainer = renderTaskInContainer;
window.fillSignature = fillSignature;
