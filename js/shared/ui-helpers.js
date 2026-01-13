/**
 * @fileoverview Shared UI helper functions.
 *
 * @description
 * Provides common UI manipulation functions for button states, loading indicators,
 * and user interface interactions used across multiple modules.
 *
 * @module shared/ui-helpers
 */

/**
 * Disables a button element.
 * @param {HTMLElement} button - Button element to disable.
 */
const disableButton = (button) => {
  if (!button) return;
  button.style.opacity = "0.5";
  button.style.pointerEvents = "none";
  button.style.cursor = "not-allowed";
};

/**
 * Enables a button element.
 * @param {HTMLElement} button - Button element to enable.
 */
const enableButton = (button) => {
  if (!button) return;
  button.style.opacity = "1";
  button.style.pointerEvents = "auto";
  button.style.cursor = "pointer";
};

/**
 * Disables multiple buttons.
 * @param {...HTMLElement} buttons - Button elements to disable.
 */
const disableButtons = (...buttons) => {
  buttons.forEach((btn) => disableButton(btn));
};

/**
 * Enables multiple buttons.
 * @param {...HTMLElement} buttons - Button elements to enable.
 */
const enableButtons = (...buttons) => {
  buttons.forEach((btn) => enableButton(btn));
};

/**
 * Checks if currently saving.
 * @returns {boolean} True if saving operation in progress.
 */
const isSavingInProgress = () => {
  return window.isSaving === true;
};

/**
 * Disables body scroll.
 */
const disableBodyScroll = () => {
  document.body.style.overflow = "hidden";
};

/**
 * Enables body scroll.
 */
const enableBodyScroll = () => {
  document.body.style.overflow = "auto";
};

window.disableButton = disableButton;
window.enableButton = enableButton;
window.disableButtons = disableButtons;
window.enableButtons = enableButtons;
window.isSavingInProgress = isSavingInProgress;
window.disableBodyScroll = disableBodyScroll;
window.enableBodyScroll = enableBodyScroll;
