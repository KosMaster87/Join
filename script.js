const BASE_URL = "https://join-d0ea5-default-rtdb.firebaseio.com/";
let guests;
let users;
let user;

/**
 * Updates or creates an item in a specified collection in the Firebase Realtime Database.
 * If the item already exists, it merges the new data with the existing data.
 * @param {string} collection - The name of the collection (e.g., "users", "guests").
 * @param {string} id - The unique identifier of the item to update or create.
 * @param {Object} data - The data to update or create in the collection.
 * @returns {Promise<Object>} - A promise that resolves to the updated or created data.
 * @throws {string} - Throws an error if the server request fails.
 */
async function setItem(collection, id, data) {
  const existingData = await getItem(collection, id);
  const updatedData = existingData ? { ...existingData, ...data } : { ...data };
  const response = await fetch(`${BASE_URL}/${collection}/${id}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Server-Fehler: ${response.status}`);
  }
}

/**
 * Retrieves an item from a specified collection in the Firebase Realtime Database.
 * @param {string} collection - The name of the collection (e.g., "users", "guests").
 * @param {string} id - The unique identifier of the item to retrieve.
 * @returns {Promise<Object|null>} - A promise that resolves to the retrieved data or null if the item does not exist.
 */
async function getItem(collection, id) {
  const response = await fetch(`${BASE_URL}/${collection}/${id}.json`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
}

/**
 * Loads guest users, regular users, and the current logged-in user from the Firebase Realtime Database.
 * The current user is determined by the `currentUserId` stored in localStorage.
 * If the current user is not a guest, it searches for the user in the regular users collection.
 * @returns {Promise<void>} - A promise that resolves when the data is loaded.
 */
async function loadUsersAndCurrentUser() {
  const guestsResponse = await fetch(`${BASE_URL}/guests.json`);
  const guestsData = await guestsResponse.json();

  if (!guestsData || typeof guestsData !== "object") {
    guests = [];
  } else {
    guests = Object.keys(guestsData).map((key) => ({
      id: key,
      ...guestsData[key],
      isGuest: true,
    }));
  }

  const currentUserId = localStorage.getItem("currentUserId");
  user = guests.find((g) => g.id === currentUserId) || null;

  if (!user || !user.isGuest) {
    const usersResponse = await fetch(`${BASE_URL}/users.json`);
    const usersData = usersResponse.ok ? await usersResponse.json() : {};

    users =
      usersData && typeof usersData === "object"
        ? Object.keys(usersData).map((key) => ({
            id: key,
            ...usersData[key],
          }))
        : [];

    user = users.find((u) => u.id === currentUserId) || null;
  }
}
