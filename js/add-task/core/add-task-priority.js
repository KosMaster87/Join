/**
 * @fileoverview Priority selection management for task creation.
 *
 * @description
 * Handles priority button interactions, visual states, and priority value updates.
 * Manages Low, Medium, and Urgent priority selections with color and icon changes.
 *
 * @module add-task-priority
 */

/**
 * Updates the priority of the task by changing the background color of the clicked container.
 * @param {HTMLElement} clickedContainerId - The clicked priority container element.
 */
window.whatsPrio = (clickedContainerId) => {
  window.removeWhiteImg();
  window.removePrio();
  changePrioColor(clickedContainerId);
};

/**
 * Removes the background color from all priority containers.
 */
window.removePrio = () => {
  const prioLowContainer = document.getElementById("prioLowContainer");
  const prioMediumContainer = document.getElementById("prioMediumContainer");
  const prioUrgentContainer = document.getElementById("prioUrgentContainer");

  if (prioLowContainer) prioLowContainer.classList.remove("prioLow");
  if (prioMediumContainer) prioMediumContainer.classList.remove("prioMedium");
  if (prioUrgentContainer) prioUrgentContainer.classList.remove("prioUrgent");
};

/**
 * Resets the images for all priority containers to their default state.
 */
window.removeWhiteImg = () => {
  const prioUrgentContainer = document.getElementById("prioUrgentContainer");
  const prioMediumContainer = document.getElementById("prioMediumContainer");
  const prioLowContainer = document.getElementById("prioLowContainer");

  if (prioUrgentContainer) {
    const imgUrgent = prioUrgentContainer.querySelector("img");
    if (imgUrgent) imgUrgent.src = "../assets/img/add_task/arrow_top_red.svg";
  }

  if (prioMediumContainer) {
    const imgMedium = prioMediumContainer.querySelector("img");
    if (imgMedium) imgMedium.src = "../assets/img/add_task/line_orange.svg";
  }

  if (prioLowContainer) {
    const imgLow = prioLowContainer.querySelector("img");
    if (imgLow) imgLow.src = "../assets/img/add_task/arrow_bottom_green.svg";
  }
};

/**
 * Changes the color of the clicked priority container.
 * @param {HTMLElement} clickedContainerId - The clicked priority container element.
 */
const changePrioColor = (clickedContainerId) => {
  const prioUrgentContainer = document.getElementById("prioUrgentContainer");
  const prioMediumContainer = document.getElementById("prioMediumContainer");
  const prioLowContainer = document.getElementById("prioLowContainer");

  if (!clickedContainerId) return;

  if (clickedContainerId === prioLowContainer) {
    const imgLow = prioLowContainer.querySelector("img");
    changePrioColorLow(imgLow);
  } else if (clickedContainerId === prioMediumContainer) {
    const imgMedium = prioMediumContainer.querySelector("img");
    changePrioColorMedium(imgMedium);
  } else if (clickedContainerId === prioUrgentContainer) {
    const imgUrgent = prioUrgentContainer.querySelector("img");
    changePrioColorUrgent(imgUrgent);
  }
};

/**
 * Changes the background color of the low priority container.
 * @param {HTMLElement} imgLow - The image element associated with the low priority container.
 */
const changePrioColorLow = (imgLow) => {
  const prioLowContainer = document.getElementById("prioLowContainer");
  if (prioLowContainer) prioLowContainer.classList.add("prioLow");
  window.selectedPrio = "Low";
  if (imgLow) imgLow.src = "../assets/img/add_task/arrow_bottom_white.svg";
};

/**
 * Changes the background color of the medium priority container.
 * @param {HTMLElement} imgMedium - The image element associated with the medium priority container.
 */
const changePrioColorMedium = (imgMedium) => {
  const prioMediumContainer = document.getElementById("prioMediumContainer");
  if (prioMediumContainer) prioMediumContainer.classList.add("prioMedium");
  window.selectedPrio = "Medium";
  if (imgMedium) imgMedium.src = "../assets/img/add_task/line_white.svg";
};

/**
 * Changes the background color of the urgent priority container.
 * @param {HTMLElement} imgUrgent - The image element associated with the urgent priority container.
 */
const changePrioColorUrgent = (imgUrgent) => {
  const prioUrgentContainer = document.getElementById("prioUrgentContainer");
  if (prioUrgentContainer) prioUrgentContainer.classList.add("prioUrgent");
  window.selectedPrio = "Urgent";
  if (imgUrgent) imgUrgent.src = "../assets/img/add_task/arrow_top_white.svg";
};
