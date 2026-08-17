/**
 * @fileoverview CRUD operations for Firestore (Cloud Firestore)
 * @description This module provides functions to create, read, update, and delete documents
 *              in a Firestore database. It uses the Firebase Firestore SDK to interact with
 *              the database and handles common operations such as setting, getting, updating,
 *              and deleting documents, as well as querying collections.
 * @module services/firestore.service
 */

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase.config.js";

/**
 * Creates or updates a document in a Firestore collection
 * @param {string} collectionName - The name of the collection (e.g., "users", "tasks")
 * @param {string} docId - The document ID
 * @param {Object} data - The data to set
 * @returns {Promise<void>}
 */
export async function setDocument(collectionName, docId, data) {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error("Error writing document:", error);
    throw error;
  }
}

/**
 * Gets a document from a Firestore collection
 * @param {string} collectionName - The name of the collection
 * @param {string} docId - The document ID
 * @returns {Promise<Object|null>} - The document data or null if not found
 */
export async function getDocument(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}

/**
 * Gets all documents from a Firestore collection
 * @param {string} collectionName - The name of the collection
 * @returns {Promise<Array>} - Array of documents
 */
export async function getAllDocuments(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];

    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
}

/**
 * Updates a document in a Firestore collection
 * @param {string} collectionName - The name of the collection
 * @param {string} docId - The document ID
 * @param {Object} data - The data to update
 * @returns {Promise<void>}
 */
export async function updateDocument(collectionName, docId, data) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
}

/**
 * Deletes a document from a Firestore collection
 * @param {string} collectionName - The name of the collection
 * @param {string} docId - The document ID
 * @returns {Promise<void>}
 */
export async function deleteDocument(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
}

/**
 * Adds a new document with auto-generated ID
 * @param {string} collectionName - The name of the collection
 * @param {Object} data - The data to add
 * @returns {Promise<string>} - The new document ID
 */
export async function addDocument(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
}

/**
 * Queries documents with a filter
 * @param {string} collectionName - The name of the collection
 * @param {string} field - The field to filter on
 * @param {string} operator - The comparison operator (==, !=, <, <=, >, >=)
 * @param {any} value - The value to compare
 * @returns {Promise<Array>} - Array of matching documents
 */
export async function queryDocuments(collectionName, field, operator, value) {
  try {
    const q = query(collection(db, collectionName), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    const documents = [];

    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (error) {
    console.error("Error querying documents:", error);
    throw error;
  }
}
