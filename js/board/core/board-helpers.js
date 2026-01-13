/**
 * @fileoverview Board helper functions.
 * Provides utility functions for board operations.
 * @module board-helpers
 */

/**
 * Gets today's date in YYYY-MM-DD format.
 * @returns {string} Formatted date.
 */
const getTodayDateString = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

/**
 * Sets minimum date to today.
 * @param {string} elementId - Input element ID.
 */
const setMinDateToToday = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) element.min = getTodayDateString();
};

/**
 * Sets minimum date to today (legacy alias).
 */
const setMinDate = () => {
  setMinDateToToday("date");
};

window.getTodayDateString = getTodayDateString;
window.setMinDateToToday = setMinDateToToday;
window.setMinDate = setMinDate;
