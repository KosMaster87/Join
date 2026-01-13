/**
 * @fileoverview Shared signature generation helpers.
 *
 * @description
 * Provides common signature/initials generation functions used across
 * contact and task management modules.
 *
 * @module shared/signature-helpers
 */

/**
 * Generates signature initials from name.
 * @param {string} name - Full name.
 * @returns {string} Uppercase initials.
 */
const generateSignature = (name) => {
  if (!name) return "";
  return name
    .toUpperCase()
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
};

/**
 * Generates signature from contact object.
 * @param {Object} contact - Contact object with name property.
 * @returns {string} Uppercase initials.
 */
const generateContactSignature = (contact) => {
  return generateSignature(contact?.name || "");
};

/**
 * Generates signature from user object.
 * @param {Object} user - User object with name property.
 * @returns {string} Uppercase initials.
 */
const generateUserSignature = (user) => {
  return generateSignature(user?.name || "");
};

window.generateSignature = generateSignature;
window.generateContactSignature = generateContactSignature;
window.generateUserSignature = generateUserSignature;
