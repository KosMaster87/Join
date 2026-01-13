/**
 * @fileoverview Main application entry point and global state initialization.
 *
 * @description
 * Central entry point for the Join project management application.
 * Initializes global state, sets up Firebase Authentication listeners,
 * and provides backward compatibility exports for non-module scripts.
 *
 * Key features:
 * - Global store initialization and synchronization
 * - Firebase Authentication state listener
 * - isSaving flag for navigation protection during saves
 * - Window object exports for backward compatibility
 * - Session storage integration for cross-page state
 * - Global variable synchronization with store
 *
 * @module app
 * @requires services/store
 * @requires services/auth.service
 * @requires services/data.service
 * @requires services/user.service
 */

import { store, initializeGlobalStore } from "../services/store.js";
import {
  registerWithAuth,
  signInWithAuth,
  signInAnonymouslyAsGuest,
  signOutUser,
  onAuthChange,
  getCurrentAuthUser,
  deleteCurrentUser,
} from "../services/auth.service.js";
import { setItem, getItem } from "../services/data.service.js";
import { deleteDocument } from "../services/firestore.service.js";
import {
  loadUsersAndCurrentUser,
  loadGuests,
  loadUsers,
  handleUserSignIn,
  handleUserSignOut,
} from "../services/user.service.js";

let isSaving = false;

initializeGlobalStore();

// Export isSaving to window for global navigation check
if (typeof window !== "undefined") {
  Object.defineProperty(window, "isSaving", {
    get: () => isSaving,
    set: () => {}, // Read-only
  });

  // Add setter function for controlled updates from other modules
  window.setIsSaving = (value) => {
    isSaving = value;
  };
}

/**
 * Firebase Authentication state change listener.
 * Automatically updates the store and localStorage when user authentication state changes.
 * - On sign in: Loads user data from Firestore and updates store
 * - On sign out: Clears user from store and localStorage
 */
onAuthChange(async (authUser) => {
  authUser ? await handleUserSignIn(authUser) : handleUserSignOut();
});

window.setItem = setItem;
window.getItem = getItem;
window.deleteDocument = deleteDocument;
window.loadUsersAndCurrentUser = loadUsersAndCurrentUser;
window.loadGuests = loadGuests;
window.loadUsers = loadUsers;
window.store = store;
window.registerWithAuth = registerWithAuth;
window.signInWithAuth = signInWithAuth;
window.signInAnonymouslyAsGuest = signInAnonymouslyAsGuest;
window.signOutUser = signOutUser;
window.getCurrentAuthUser = getCurrentAuthUser;
window.deleteCurrentUser = deleteCurrentUser;

/**
 * Navigates to Add Task page with a predefined status.
 * @param {string} status - The status to set for the new task ('to-do', 'progress', 'await', 'done').
 */
window.addTaskWithStatus = function (status) {
  sessionStorage.setItem("addTaskStatus", status);
  includeContentHTML("addTask");
};

// Sync global variables with store changes
store.subscribe("user", (u) => {
  window.user = u;
});
store.subscribe("users", (u) => {
  window.users = u;
});
store.subscribe("guests", (g) => {
  window.guests = g;
});

// Dispatch event to signal that script.js is ready
window.dispatchEvent(new Event("scriptModuleReady"));
