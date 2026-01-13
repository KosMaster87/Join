/**
 * @fileoverview Contact CRUD operations module.
 * Handles contact creation, reading, updating, and deletion operations.
 * @module contact-operations
 */

/**
 * Finds contact index by ID.
 * @param {string} contactId - Contact ID to find.
 * @returns {number} Index of contact or -1.
 */
const findContactIndex = (contactId) =>
  user.contacts.findIndex((c) => c.contactId === contactId);

/**
 * Removes contact from array and store.
 * @param {number} index - Index of contact to remove.
 * @param {string} contactId - Contact ID to remove from store.
 */
const removeContactFromArray = (index, contactId) => {
  if (index !== -1) {
    user.contacts.splice(index, 1);
    store.deleteContact(contactId);
  }
};

/**
 * Saves contact deletion to Firestore.
 */
const saveContactDeletion = async () => {
  if (typeof window.setIsSaving === "function") {
    window.setIsSaving(true);
  }
  try {
    const collection = getContactCollection();
    await setItem(collection, user.id, { contacts: user.contacts });
  } finally {
    if (typeof window.setIsSaving === "function") {
      window.setIsSaving(false);
    }
  }
};

/**
 * Creates new contact object.
 * @param {string} name - Contact name.
 * @param {string} email - Contact email.
 * @param {string} phone - Contact phone.
 * @param {string} contactId - Contact ID.
 * @param {string} userColor - Contact color.
 * @returns {Object} Contact object.
 */
const createNewContact = (name, email, phone, contactId, userColor) => ({
  userId: user.email,
  contactId: contactId,
  name: name,
  email: email,
  phone: phone,
  userColor: userColor,
  signature: getSignature(name),
});

/**
 * Adds contact to user contacts and store.
 * @param {Object} contact - Contact to add.
 */
const addContactToUser = (contact) => {
  if (!user.contacts) {
    user.contacts = [];
  }
  store.addContact(contact);
};

/**
 * Saves new contact to Firestore.
 * @param {Object} contact - Contact to save.
 */
const saveNewContactToFirestore = async (contact) => {
  if (typeof window.setIsSaving === "function") {
    window.setIsSaving(true);
  }
  try {
    addContactToUser(contact);
    const collection = getContactCollection();
    await setItem(collection, user.id, { contacts: user.contacts });
  } finally {
    if (typeof window.setIsSaving === "function") {
      window.setIsSaving(false);
    }
  }
};

/**
 * Deletes contact by ID.
 * Removes from array, store, and saves to Firestore.
 * @param {string} contactId - ID of contact to delete.
 */
const deleteContact = async (contactId) => {
  if (window.isSaving) return;
  const index = findContactIndex(contactId);
  removeContactFromArray(index, contactId);
  await saveContactDeletion();
};

/**
 * Updates contact with new data.
 * @param {Object} contact - Contact to update.
 * @param {Object} inputs - New input values.
 * @param {string} contactId - Contact ID for store update.
 */
const updateContactData = (contact, inputs, contactId) => {
  contact.name = inputs.name;
  contact.email = inputs.email;
  contact.phone = inputs.phone;
  contact.signature = getSignature(inputs.name);
  contact.userColor = contact.userColor || "var(--default-color)";
  store.updateContact(contactId, contact);
};

/**
 * Saves contact changes to Firestore.
 * @param {Function} afterSave - Callback to execute after save.
 */
const saveContactChanges = async (afterSave) => {
  if (typeof window.setIsSaving === "function") {
    window.setIsSaving(true);
  }
  try {
    const collection = getContactCollection();
    await setItem(collection, user.id, { contacts: user.contacts });
    if (afterSave) await afterSave();
  } finally {
    if (typeof window.setIsSaving === "function") {
      window.setIsSaving(false);
    }
  }
};

window.findContactIndex = findContactIndex;
window.removeContactFromArray = removeContactFromArray;
window.saveContactDeletion = saveContactDeletion;
window.createNewContact = createNewContact;
window.addContactToUser = addContactToUser;
window.saveNewContactToFirestore = saveNewContactToFirestore;
window.deleteContact = deleteContact;
window.updateContactData = updateContactData;
window.saveContactChanges = saveContactChanges;
