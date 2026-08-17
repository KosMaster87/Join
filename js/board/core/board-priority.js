/**
 * @module board-priority
 * @description Priority management for board tasks.
 */

/**
 * Removes all priority selections.
 */
const removePrio = () => {
  const containers = [
    { id: "prioUrgentContainer", class: "prioUrgent" },
    { id: "prioMediumContainer", class: "prioMedium" },
    { id: "prioLowContainer", class: "prioLow" },
  ];
  containers.forEach(({ id, class: className }) => {
    document.getElementById(id)?.classList.remove(className);
  });
};

/**
 * Removes white priority images.
 */
const removeWhiteImg = () => {
  const urgent = document.getElementById("prioUrgentContainer")?.querySelector("img");
  const medium = document.getElementById("prioMediumContainer")?.querySelector("img");
  const low = document.getElementById("prioLowContainer")?.querySelector("img");
  if (urgent) urgent.src = "../assets/img/add_task/arrow_top_red.svg";
  if (medium) medium.src = "../assets/img/add_task/line_orange.svg";
  if (low) low.src = "../assets/img/add_task/arrow_bottom_green.svg";
};

/**
 * Sets priority selection.
 * @param {number} i - Task index.
 * @param {string} priority - Priority name (Urgent/Medium/Low).
 */
const whatsPrio = (i, priority) => {
  removePrio();
  removeWhiteImg();

  const prioMap = {
    Urgent: {
      containerId: "prioUrgentContainer",
      className: "prioUrgent",
      imgSrc: "../assets/img/add_task/arrow_top_white.svg",
    },
    Medium: {
      containerId: "prioMediumContainer",
      className: "prioMedium",
      imgSrc: "../assets/img/add_task/line_white.svg",
    },
    Low: {
      containerId: "prioLowContainer",
      className: "prioLow",
      imgSrc: "../assets/img/add_task/arrow_bottom_white.svg",
    },
  };

  const prioData = prioMap[priority];
  if (prioData) {
    const container = document.getElementById(prioData.containerId);
    const img = container?.querySelector("img");
    if (container) container.classList.add(prioData.className);
    if (img) img.src = prioData.imgSrc;
  }
};

/**
 * Gets priority data by priority name.
 * @param {string} prio - Priority name.
 * @returns {Object} Priority data.
 */
const getPriorityData = (prio) => {
  const priorities = {
    urgent: { id: "urgent", img: "imgWhite1" },
    medium: { id: "medium", img: "imgWhite2" },
    low: { id: "low", img: "imgWhite3" },
  };
  return priorities[prio] || {};
};

/**
 * Applies priority styling.
 * @param {Object} prioData - Priority data object.
 */
const applyPriorityStyle = (prioData) => {
  if (!prioData.id) return;
  removePrio();
  removeWhiteImg();
  document.getElementById(prioData.id).classList.add("changeBackgroundColor");
  document.getElementById(prioData.img).classList.remove("d-none");
};

/**
 * Changes priority color in board task.
 * @param {number} i - Task index.
 * @param {string} pupUpPriorityName - Priority name.
 */
const changePrioColor = (i, pupUpPriorityName) => {
  const priorityElement = document.getElementById(`prio${i}`);
  if (!priorityElement) return;
  priorityElement.innerHTML = "";
  const priorityImg = getPriorityImage(user.tasks[i][pupUpPriorityName]);
  priorityElement.innerHTML = priorityImg;
};

/**
 * Gets priority image HTML.
 * @param {string} prio - Priority name.
 * @returns {string} Image HTML.
 */
const getPriorityImage = (prio) => {
  const images = {
    urgent: `<img src="../assets/img/board/prioUrgent.svg" alt="" />`,
    medium: `<img src="../assets/img/board/prioMedium.svg" alt="" />`,
    low: `<img src="../assets/img/board/prioLow.svg" alt="" />`,
  };
  return images[prio] || "";
};

/**
 * Sets Medium as default priority.
 * @param {number} i - Task index.
 */
const setDefaultPriority = (i) => {
  whatsPrio(i, "Medium");
};

window.removePrio = removePrio;
window.removeWhiteImg = removeWhiteImg;
window.whatsPrio = whatsPrio;
window.setDefaultPriority = setDefaultPriority;
window.getPriorityData = getPriorityData;
window.applyPriorityStyle = applyPriorityStyle;
window.changePrioColor = changePrioColor;
window.getPriorityImage = getPriorityImage;
