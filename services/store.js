/**
 * @fileoverview Centralized State Management Store
 * @description This module provides a centralized state management solution for the application.
 * It manages user data, contacts, tasks, and authentication state with reactive updates.
 * @module services/store
 */

/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {string} colorCode - User color code
 * @property {Array} tasks - User tasks
 * @property {Array} contacts - User contacts
 * @property {boolean} isGuest - Whether user is a guest
 */

/**
 * @typedef {Object} Contact
 * @property {string} userId - User ID who owns the contact
 * @property {string} contactId - Unique contact ID
 * @property {string} name - Contact name
 * @property {string} email - Contact email
 * @property {string} phone - Contact phone
 * @property {string} userColor - Contact color
 * @property {string} signature - Contact signature/initials
 * @property {boolean} selected - Whether contact is selected
 */

/**
 * @typedef {Object} Task
 * @property {string} status - Task status (to-do, in-progress, await-feedback, done)
 * @property {string} title - Task title
 * @property {string} description - Task description
 * @property {Array} assignedTo - Assigned contacts
 * @property {string} dueDate - Due date
 * @property {string} prio - Priority (Urgent, Medium, Low)
 * @property {string} category - Task category
 * @property {Array} subtasks - Subtasks
 */

class Store {
  constructor() {
    this._user = null;
    this._users = [];
    this._guests = [];
    this._listeners = new Map();
  }

  /**
   * Subscribe to store changes
   * @param {string} key - The state key to watch
   * @param {Function} callback - Callback function to execute on change
   * @returns {Function} Unsubscribe function
   */
  subscribe(key, callback) {
    if (!this._listeners.has(key)) {
      this._listeners.set(key, new Set());
    }
    this._listeners.get(key).add(callback);

    // Return unsubscribe function
    return () => {
      const listeners = this._listeners.get(key);
      if (listeners) {
        listeners.delete(callback);
      }
    };
  }

  /**
   * Notify all listeners of a state change
   * @private
   * @param {string} key - The state key that changed
   * @param {*} value - The new value
   */
  _notify(key, value) {
    const listeners = this._listeners.get(key);
    if (listeners) {
      listeners.forEach((callback) => callback(value));
    }
  }

  /**
   * Get current user
   * @returns {User|null}
   */
  getUser() {
    return this._user;
  }

  /**
   * Set current user
   * @param {User|null} user
   */
  setUser(user) {
    this._user = user;
    this._notify("user", user);
  }

  /**
   * Get all users
   * @returns {Array<User>}
   */
  getUsers() {
    return this._users;
  }

  /**
   * Set all users
   * @param {Array<User>} users
   */
  setUsers(users) {
    this._users = users;
    this._notify("users", users);
  }

  /**
   * Get all guests
   * @returns {Array<User>}
   */
  getGuests() {
    return this._guests;
  }

  /**
   * Set all guests
   * @param {Array<User>} guests
   */
  setGuests(guests) {
    this._guests = guests;
    this._notify("guests", guests);
  }

  /**
   * Get user contacts
   * @returns {Array<Contact>}
   */
  getContacts() {
    return this._user?.contacts || [];
  }

  /**
   * Set user contacts
   * @param {Array<Contact>} contacts
   */
  setContacts(contacts) {
    if (this._user) {
      this._user.contacts = contacts;
      this._notify("contacts", contacts);
    }
  }

  /**
   * Add a contact
   * @param {Contact} contact
   */
  addContact(contact) {
    if (this._user) {
      if (!this._user.contacts) {
        this._user.contacts = [];
      }
      this._user.contacts.push(contact);
      this._notify("contacts", this._user.contacts);
    }
  }

  /**
   * Update a contact
   * @param {string} contactId - Contact ID to update
   * @param {Object} updates - Fields to update
   */
  updateContact(contactId, updates) {
    if (this._user?.contacts) {
      const index = this._user.contacts.findIndex(
        (c) => c.contactId === contactId
      );
      if (index !== -1) {
        this._user.contacts[index] = {
          ...this._user.contacts[index],
          ...updates,
        };
        this._notify("contacts", this._user.contacts);
      }
    }
  }

  /**
   * Delete a contact
   * @param {string} contactId - Contact ID to delete
   */
  deleteContact(contactId) {
    if (this._user?.contacts) {
      this._user.contacts = this._user.contacts.filter(
        (c) => c.contactId !== contactId
      );
      this._notify("contacts", this._user.contacts);
    }
  }

  /**
   * Get user tasks
   * @returns {Array<Task>}
   */
  getTasks() {
    return this._user?.tasks || [];
  }

  /**
   * Set user tasks
   * @param {Array<Task>} tasks
   */
  setTasks(tasks) {
    if (this._user) {
      this._user.tasks = tasks;
      this._notify("tasks", tasks);
    }
  }

  /**
   * Add a task
   * @param {Task} task
   */
  addTask(task) {
    if (this._user) {
      if (!this._user.tasks) {
        this._user.tasks = [];
      }
      this._user.tasks.push(task);
      this._notify("tasks", this._user.tasks);
    }
  }

  /**
   * Update a task
   * @param {number} index - Task index to update
   * @param {Object} updates - Fields to update
   */
  updateTask(index, updates) {
    if (this._user?.tasks && this._user.tasks[index]) {
      this._user.tasks[index] = { ...this._user.tasks[index], ...updates };
      this._notify("tasks", this._user.tasks);
    }
  }

  /**
   * Delete a task
   * @param {number} index - Task index to delete
   */
  deleteTask(index) {
    if (this._user?.tasks) {
      this._user.tasks.splice(index, 1);
      this._notify("tasks", this._user.tasks);
    }
  }

  /**
   * Check if user is logged in
   * @returns {boolean}
   */
  isAuthenticated() {
    return this._user !== null;
  }

  /**
   * Check if current user is a guest
   * @returns {boolean}
   */
  isGuest() {
    return this._user?.isGuest || false;
  }

  /**
   * Clear all state (logout)
   */
  clear() {
    this._user = null;
    this._users = [];
    this._guests = [];
    this._notify("user", null);
    this._notify("users", []);
    this._notify("guests", []);
    this._notify("contacts", []);
    this._notify("tasks", []);
  }

  /**
   * Get store state snapshot
   * @returns {Object}
   */
  getState() {
    return {
      user: this._user,
      users: this._users,
      guests: this._guests,
    };
  }
}

// Export singleton instance
export const store = new Store();

// Also export for backward compatibility with global variables
export function initializeGlobalStore() {
  window.user = store.getUser();
  window.users = store.getUsers();
  window.guests = store.getGuests();

  // Update globals when store changes
  store.subscribe("user", (user) => {
    window.user = user;
  });
  store.subscribe("users", (users) => {
    window.users = users;
  });
  store.subscribe("guests", (guests) => {
    window.guests = guests;
  });
}
