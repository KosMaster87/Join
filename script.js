const STORAGE_TOKEN = "DXZFTQCTDMTN307RSV39G7QWLBSB9ZB6CEFWG1WB";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let users;
let user;

/**
 * The instruction to load from remote storage.
 */
async function loadUsers() {
  try {
    console.log("loadUsers: Start");
    users = JSON.parse(await getItem("users"));
    // console.log("loadUsers: Users loaded successfully");
    // console.log(users);
  } catch (e) {
    console.error("loadUsers: Loading error:", e);
  }
}

/**
 * Load data from backend.
 * @param {Remote key as string} key
 * @returns The answer to the query.″
 */
async function getItem(key) {
  const urlKeyToken = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;

  try {
    const response = await fetch(urlKeyToken);
    if (response.ok) {
      const dataX = await response.json();

      if (dataX && dataX.data && dataX.data.value) {
        return dataX.data.value;
      } else {
        throw `Could not find data with key "${key}".`;
      }
    } else {
      throw `Error fetching data with key "${key}". Status: ${response.status}`;
    }
  } catch (error) {
    console.error("getItem: Fetch error:", error);
    throw error;
  }
}

/**
 * Push request to backend.
 * Either it is fulfilled successfully (resolved) or it fails (rejected).
 * @param {Remote key as string} key
 * @param {Data to save as in string.} value
 * @returns The confirmation from the server as an object.
 */
async function setItem(key, value) {
  if (!key || !value) {
    console.error("Missing required fields: key, value");
    return Promise.reject("Missing required fields: key, value");
  }

  const payload = { key, value, token: STORAGE_TOKEN };
  await theAnswer(payload);
}

/**
 * Just request of the response.
 * @param {All the stuff is push into remote-storage.} payload
 * @returns "data" as object.
 */
async function theAnswer(payload) {
  try {
    const response = await fetch(STORAGE_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return response.json();
    } else {
      console.error(`Server error: ${response.status}`);
      return Promise.reject(`Server error: ${response.status}`);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return Promise.reject("Fetch error");
  }
}

/**
 * Provide the user globally as an object and the other users in a separate array.
 */
async function loadCurrentUserAlsoUsersAsObject() {
  users = JSON.parse(await getItem("users")) || [];
  const currentEmail = await getItem("currentUserId");

  if (currentEmail) {
    // Lade den Benutzer anhand des Index aus dem `users`-Array
    user = users.find((userIndex) => userIndex.email === currentEmail);
    // console.log(users);
    // console.log(user);
  } else {
    console.log("Benutzer nicht gefunden");
  }
}



// ------------------------------------------------------------------

/**
 * Lösche einen Benutzer aus dem Array anhand der Index-Position und aktualisiere den Remote-Speicher.
 * @param {number} index - Die Position des zu löschenden Benutzers im Array.
 */
async function deleteUserAtIndexAndUpdateStorage(index) {
  await loadUsers();
  if (index >= 0 && index < users.length) {
    users.splice(index, 1);
    try {
      await setItem("users", JSON.stringify(users));
      console.log(
        `Benutzer an Position ${index} wurde erfolgreich gelöscht und Remote-Speicher aktualisiert.`
      );
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Remote-Speichers:", error);
    }
  } else {
    console.error("Ungültiger Index für das Löschen des Benutzers.");
  }
}

/**
 * Change user's task status.
 * @param {The index of the tasks in the user object. As Number.} taskIndex
 * @param {Write the status in string format.} newStatus
 */
function changeTaskStatus(taskIndex, newStatus) {
  if (user && user.tasks && user.tasks[taskIndex]) {
    // Überprüfen Sie, ob die Aufgabe und der gewünschte Index vorhanden sind
    user.tasks[taskIndex].status = newStatus;

    // Aktualisieren Sie den Remote Storage oder die lokale Speicherung
    setItem("users", users);

    // Rufen Sie die Funktion auf, um die Anzeige zu aktualisieren (falls erforderlich)
    howManyTasks();
  } else {
    console.error("Ungültiger Task-Index oder fehlende Benutzerdaten.");
  }
}

/**
 * Fügt dem Kontaktarray des Benutzers einen neuen Kontakt hinzu.
 * @param {string} contactName - Der Name des Kontakts.
 * @param {string} contactEmail - Die E-Mail des Kontakts.
 */
async function addContact(contactName, contactEmail) {
  await loadCurrentUserAlsoUsersAsObject();

  user.contacts.push({
    userId: "",
    contactId: "",
    name: contactName,
    email: contactEmail,
    phone: "",
    userColor: "",
    signature: "",
  });

  // Speichere den aktualisierten Benutzer im Remote-Speicher
  await setItem("users", JSON.stringify(users));
}

// ------------------------------------------------------------------
