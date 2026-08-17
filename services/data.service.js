/**
 * @fileoverview Data access layer for Firestore operations.
 *
 * @description
 * Provides CRUD operations for Firestore collections.
 * Handles data merging, retrieval, and updates with automatic
 * data transformation and error handling.
 *
 * Key features:
 * - Generic CRUD operations for any collection
 * - Automatic data merging for updates
 * - Type-safe data retrieval
 * - Error handling and logging
 *
 * @module services/data
 * @requires services/firestore.service
 */

import { getDocument, setDocument, getAllDocuments } from "./firestore.service.js";

/**
 * Updates or creates an item in Firestore.
 * If the item already exists, it merges the new data with the existing data.
 * @param {string} collection - The name of the collection (e.g., "users", "guests").
 * @param {string} id - The unique identifier of the item to update or create.
 * @param {Object} data - The data to update or create in the collection.
 * @returns {Promise<Object>} - The updated or created data object.
 */
export const setItem = async (collection, id, data) => {
  const existingData = await getItem(collection, id);
  const updatedData = mergeOrCreateData(existingData, id, data);
  await setDocument(collection, id, updatedData);
  return updatedData;
};

/**
 * Merges existing data with new data or creates new object.
 * @param {Object|null} existingData - Existing data from Firestore.
 * @param {string} id - The item ID.
 * @param {Object} data - New data to merge.
 * @returns {Object} - Merged or new data object.
 */
const mergeOrCreateData = (existingData, id, data) =>
  existingData ? { ...existingData, ...data } : { id, ...data };

/**
 * Retrieves an item from Firestore.
 * @param {string} collection - The name of the collection (e.g., "users", "guests").
 * @param {string} id - The unique identifier of the item to retrieve.
 * @returns {Promise<Object|null>} - A promise that resolves to the retrieved data or null if the item does not exist.
 */
export const getItem = async (collection, id) => {
  const doc = await getDocument(collection, id);
  return doc;
};

/**
 * Retrieves all items from a Firestore collection.
 * @param {string} collection - The name of the collection.
 * @returns {Promise<Array>} - Array of all documents in the collection.
 */
export const getAllItems = async (collection) => {
  const items = await getAllDocuments(collection);
  return items;
};
