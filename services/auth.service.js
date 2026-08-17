/**
 * @fileoverview Firebase Authentication Service
 * @description Handles user authentication with Firebase Auth
 * @module services/auth.service
 */

import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase.config.js";

/**
 * Register new user with Firebase Auth
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User credential
 */
export const registerWithAuth = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

/**
 * Sign in user with Firebase Auth
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User credential
 */
export const signInWithAuth = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

/**
 * Sign out current user
 * @returns {Promise<void>}
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

/**
 * Listen to auth state changes
 * @param {Function} callback - Callback function with user parameter
 * @returns {Function} Unsubscribe function
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Get current Firebase Auth user
 * @returns {Object|null} Current user or null
 */
export const getCurrentAuthUser = () => {
  return auth.currentUser;
};

/**
 * Sign in anonymously for guest users
 * @returns {Promise<Object>} User credential
 */
export const signInAnonymouslyAsGuest = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in anonymously:", error);
    throw error;
  }
};

/**
 * Delete the currently authenticated user from Firebase Auth
 * @returns {Promise<void>}
 */
export const deleteCurrentUser = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("No user is currently signed in");
    }
    await deleteUser(currentUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
