/**
 * @fileoverview User management service.
 *
 * @description
 * Handles user and guest data loading, caching, and management.
 * Provides utilities for finding users, managing authentication state,
 * and synchronizing with the global store.
 *
 * Key features:
 * - User and guest data loading from Firestore
 * - Current user detection and caching
 * - User lookup by ID
 * - Store synchronization
 * - Authentication state management
 *
 * @module services/user
 * @requires services/data.service
 * @requires services/firestore.service
 * @requires services/store
 */

import { getAllItems, getItem } from "./data.service.js";
import { getDocument } from "./firestore.service.js";
import { store } from "./store.js";

let guests = [];
let users = [];
let user = null;

/**
 * Loads all guests from Firestore and updates store
 * @returns {Promise<Array>} Array of guest users
 */
export const loadGuests = async () => {
  const guestsData = await getAllItems("guests");
  guests = guestsData.map((guest) => ({ ...guest, isGuest: true }));
  store.setGuests(guests);
  return guests;
};

/**
 * Loads all users from Firestore and updates store
 * @returns {Promise<Array>} Array of users
 */
export const loadUsers = async () => {
  const usersData = await getAllItems("users");
  users = usersData;
  store.setUsers(users);
  return users;
};

/**
 * Finds user by ID in provided array
 * @param {Array} userArray - Array of users to search
 * @param {string} userId - User ID to find
 * @returns {Object|null} Found user or null
 */
export const findUserById = (userArray, userId) =>
  userArray.find((u) => u.id === userId) || null;

/**
 * Gets current user ID from localStorage
 * @returns {string|null} Current user ID
 */
export const getCurrentUserId = () => localStorage.getItem("currentUserId");

/**
 * Loads guests, users and current user from Firestore
 * @returns {Promise<void>}
 */
export const loadUsersAndCurrentUser = async () => {
  try {
    await loadGuests();
    const currentUserId = getCurrentUserId();
    user = findUserById(guests, currentUserId);

    if (shouldLoadRegularUsers(user)) {
      await loadUsers();
      user = findUserById(users, currentUserId);
    }
    store.setUser(user);
  } catch (error) {
    handleLoadUsersError(error);
  }
};

/**
 * Determines if regular users should be loaded.
 * @param {Object|null} currentUser - The current user object.
 * @returns {boolean} - True if regular users should be loaded.
 */
const shouldLoadRegularUsers = (currentUser) =>
  !currentUser || !currentUser.isGuest;

/**
 * Handles errors during user loading.
 * @param {Error} error - The error object.
 */
const handleLoadUsersError = (error) => {
  console.error("Error loading users:", error);
  throw error;
};

/**
 * Handles user sign in by loading data and updating store.
 * @param {Object} authUser - Firebase auth user object.
 * @returns {Promise<void>}
 */
export const handleUserSignIn = async (authUser) => {
  if (authUser.isAnonymous) {
    const guestData = await getDocument("guests", authUser.uid);
    if (guestData) {
      store.setUser({ id: authUser.uid, ...guestData });
      localStorage.setItem("currentUserId", authUser.uid);
      return;
    }
  }

  const userData = await getDocument("users", authUser.uid);
  if (userData) {
    store.setUser({ id: authUser.uid, ...userData });
    localStorage.setItem("currentUserId", authUser.uid);
  }
};

/**
 * Handles user sign out by clearing store and localStorage.
 */
export const handleUserSignOut = () => {
  store.setUser(null);
  localStorage.removeItem("currentUserId");
};

/**
 * Gets the current cached users array.
 * @returns {Array} - Array of users.
 */
export const getUsers = () => users;

/**
 * Gets the current cached guests array.
 * @returns {Array} - Array of guests.
 */
export const getGuests = () => guests;

/**
 * Gets the current cached user object.
 * @returns {Object|null} - Current user or null.
 */
export const getCurrentUser = () => user;
