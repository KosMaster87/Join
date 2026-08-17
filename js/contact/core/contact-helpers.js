/**
 * @fileoverview Contact helper utilities module.
 * Provides signature generation, random ID creation, and common contact utilities.
 * @module contact-helpers
 */

/**
 * Splits name into uppercase array.
 * @param {string} name - Full name to split.
 * @returns {Array} Array of name parts.
 */
const splitName = (name) => name.toUpperCase().split(" ");

/**
 * Gets first letter from each name part.
 * @param {Array} arrayName - Array of name parts.
 * @returns {string} First letters concatenated.
 */
const getFirstChars = (arrayName) => arrayName.map((part) => part[0]).join("");

/**
 * Creates signature from contact name.
 * Extracts first letters of each word.
 * @param {string} name - Contact name.
 * @returns {string} Generated signature (e.g., "John Doe" → "JD").
 */
const getSignature = (name) => {
  const arrayName = splitName(name);
  return getFirstChars(arrayName);
};

/**
 * Gets random character from charset.
 * @param {string} chars - Character set.
 * @returns {string} Random character.
 */
const getRandomChar = (chars) => {
  const randomIndex = Math.floor(Math.random() * chars.length);
  return chars[randomIndex];
};

/**
 * Generates random ID for contacts.
 * Creates 16-character ID from alphanumeric + special chars.
 * @returns {string} 16-character random ID.
 */
const generateRandomId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!/%?";
  let id = "";
  for (let i = 0; i < 16; i++) {
    id += getRandomChar(chars);
  }
  return id;
};

/**
 * Gets screen width in pixels.
 * @returns {number} Window inner width.
 */
const getScreenWidth = () => window.innerWidth;

/**
 * Checks if current view is mobile.
 * @returns {boolean} True if screen width < 1000px.
 */
const isMobileView = () => getScreenWidth() < 1000;

/**
 * Finds contact by ID in user contacts array.
 * @param {string} contactId - Contact ID to find.
 * @returns {Object|undefined} Contact object or undefined.
 */
const findContactById = (contactId) =>
  user.contacts.find((contact) => contact.contactId === contactId);

/**
 * Gets user collection name based on guest status.
 * @returns {string} "guests" or "users".
 */
const getContactCollection = () => (user.isGuest ? "guests" : "users");

window.getSignature = getSignature;
window.generateRandomId = generateRandomId;
window.getScreenWidth = getScreenWidth;
window.isMobileView = isMobileView;
window.findContactById = findContactById;
window.getContactCollection = getContactCollection;
