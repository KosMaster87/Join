/**
 * @fileoverview Shared backend operations.
 *
 * @description
 * Provides common backend synchronization functions used across the application
 * for saving user data, tasks, and contacts to Firestore.
 *
 * @module shared/backend
 */

/**
 * Gets user collection type.
 * @returns {string} Collection name.
 */
const getUserCollection = () => (user.isGuest ? "guests" : "users");

/**
 * Updates store with current tasks.
 */
const updateStoreWithTasks = () => {
  store.setTasks(user.tasks);
};

/**
 * Saves tasks to backend.
 * @param {string} collection - Collection name.
 * @param {string} userId - User ID.
 */
const saveTasksToBackend = async (collection, userId) => {
  await setItem(collection, userId, { tasks: user.tasks });
};

/**
 * Saves all user data to backend and updates store.
 */
const savedUsersInBackend = async () => {
  window.setIsSaving(true);
  try {
    const collection = getUserCollection();
    const userId = user.id;
    updateStoreWithTasks();
    await saveTasksToBackend(collection, userId);
  } finally {
    window.setIsSaving(false);
  }
};

window.savedUsersInBackend = savedUsersInBackend;
