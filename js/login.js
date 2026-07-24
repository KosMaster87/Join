/**
 * @fileoverview User login module with Firebase Authentication integration.
 *
 * @description
 * Handles user login with Firebase Authentication, including guest login,
 * remember me functionality, and user data loading from Firestore.
 * Integrates with the global state store for user session management.
 *
 * Key features:
 * - Firebase Authentication for regular users
 * - Guest user login (legacy flow without Auth)
 * - Remember Me functionality (email only, not password)
 * - Automatic redirect to summary page after successful login
 * - Guest account creation with dummy data
 * - Error handling with visual feedback
 *
 * @module login
 * @requires services/auth.service
 * @requires services/firestore.service
 * @requires services/store
 */

let loginPasswortDivision;
let loginInputMail;
let loginInputPassword;
let loginBtn;

// Initialize DOM elements after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  loginPasswortDivision = document.getElementById("loginPasswortDivision");
  loginInputMail = document.getElementById("loginInputMail");
  loginInputPassword = document.getElementById("loginInputPassword");
  loginBtn = document.getElementById("loginBtn");
});

/**
 * Attempts to log in a user by checking credentials, handling guest users,
 * and redirecting to the summary page if successful.
 */
const login = async () => {
  try {
    const isGuest = loginInputMail.value.includes("guest_");
    isGuest ? await handleGuestLogin() : await handleRegularLogin();
  } catch (error) {
    handleLoginError(error);
  }
};

/**
 * Handles guest user login flow.
 * @returns {Promise<void>}
 */
/**
 * Gets temporary guest data from sessionStorage.
 * @returns {Object|null} Guest data or null if not found.
 */
const getTempGuestData = () => {
  const data = sessionStorage.getItem("tempGuestData");
  if (data) {
    sessionStorage.removeItem("tempGuestData");
    return JSON.parse(data);
  }
  return null;
};

/**
 * Creates anonymous auth user and updates guest data.
 * @param {Object} guestData - The guest user data.
 * @returns {Promise<Object>} Updated user object with auth UID.
 */
const createAuthGuestUser = async (guestData) => {
  const authUser = await signInAnonymouslyAsGuest();
  return {
    ...guestData,
    id: authUser.uid,
    authUid: authUser.uid,
  };
};

/**
 * Saves guest user to Firestore and updates store.
 * @param {Object} userData - The user data to save.
 */
const saveGuestUserData = async (userData) => {
  await setItem("guests", userData.id, userData);
  localStorage.setItem("currentUserId", userData.id);
  store.setUser(userData);
};

/**
 * Completes guest login flow with dummy data.
 */
const completeGuestLogin = async () => {
  clearLoginError();
  rememberUserFn();
  if (user.isGuest) await pushDummyData();
  redirectToSummary();
};

/**
 * Handles guest user login flow.
 * Creates anonymous Firebase Auth user and links to guest data in Firestore.
 * @returns {Promise<void>}
 */
const handleGuestLogin = async () => {
  const guestData = getTempGuestData();

  if (!guestData) {
    showLoginError();
    return;
  }

  user = await createAuthGuestUser(guestData);
  await saveGuestUserData(user);
  await completeGuestLogin();
};

/**
 * Handles regular user login with Firebase Authentication.
 * @returns {Promise<void>}
 */
const handleRegularLogin = async () => {
  const authUser = await signInWithAuth(
    loginInputMail.value,
    loginInputPassword.value,
  );
  const userData = await getItem("users", authUser.uid);

  if (!userData) throw new Error("User data not found");

  setCurrentUser(authUser.uid, userData);
  clearLoginError();
  rememberUserFn();
  redirectToSummary();
};

/**
 * Sets the current user in store and localStorage.
 * @param {string} userId - The user ID.
 * @param {Object} userData - The user data from Firestore.
 */
const setCurrentUser = (userId, userData) => {
  user = { id: userId, ...userData };
  store.setUser(user);
  localStorage.setItem("currentUserId", userId);
};

/**
 * Redirects to summary page.
 */
const redirectToSummary = () => {
  window.location.assign("pages/summary.html");
};

/**
 * Clears login error styling.
 */
const clearLoginError = () => {
  loginPasswortDivision.classList.remove("wrong");
};

/**
 * Shows login error styling.
 */
const showLoginError = () => {
  loginPasswortDivision.classList.add("wrong");
};

/**
 * Handles login errors by logging and displaying error.
 * @param {Error} error - The error object.
 */
const handleLoginError = (error) => {
  console.error("Login error:", error);
  showLoginError();
};

/**
 * Adds default contacts and tasks to the guest user's account.
 * Updates the user's data in the appropriate collection and the store.
 */
const pushDummyData = async () => {
  if (!user) return;

  assignDummyDataToUser();
  await saveDummyDataToFirestore();
  updateStoreWithDummyData();
};

/**
 * Assigns backup contacts and tasks to user object.
 */
const assignDummyDataToUser = () => {
  user.contacts = Array.isArray(backupContacts) ? backupContacts : [];
  user.tasks = Array.isArray(backupTasks) ? backupTasks : [];
};

/**
 * Saves dummy data to Firestore.
 * @returns {Promise<void>}
 */
const saveDummyDataToFirestore = async () => {
  const collection = user.isGuest ? "guests" : "users";
  await setItem(collection, user.id, {
    contacts: user.contacts,
    tasks: user.tasks,
  });
};

/**
 * Updates store with dummy contacts and tasks.
 */
const updateStoreWithDummyData = () => {
  store.setContacts(user.contacts);
  store.setTasks(user.tasks);
};

/**
 * Logs in as a guest by creating a temporary guest user account.
 * The generated guest credentials are used to automatically log in.
 */
const loginAsGuest = async () => {
  const guestBtn = document.getElementById("guestLoginBtn");
  if (guestBtn.disabled) return;

  try {
    guestBtn.disabled = true;
    const userId = generateUserId();
    const guestEmail = `guest_${userId}@mail.de`;
    const newGuest = createGuestObject(userId, guestEmail);

    sessionStorage.setItem("tempGuestData", JSON.stringify(newGuest));
    autoFillGuestCredentials(guestEmail);
    loginBtn.click();
  } catch (error) {
    console.error("Guest login error:", error);
    guestBtn.disabled = false;
  }
};

/**
 * Creates a guest user object.
 * @param {string} userId - The generated user ID.
 * @param {string} guestEmail - The generated guest email.
 * @returns {Object} - The guest user object.
 */
const createGuestObject = (userId, guestEmail) => ({
  name: `Guest User ${userId}`,
  email: guestEmail,
  colorCode: "#000000",
  tasks: [],
  contacts: [],
  isGuest: true,
});

/**
 * Auto-fills login form with guest credentials.
 * @param {string} guestEmail - The guest email to fill.
 */
const autoFillGuestCredentials = (guestEmail) => {
  loginInputMail.value = guestEmail;
  loginInputPassword.value = "guest";
};

/**
 * Saves the user's email in localStorage if "Remember Me" is checked.
 * Removes saved credentials if the checkbox is unchecked.
 * Note: Password is NOT stored for security (Firebase Auth handles authentication)
 */
const rememberUserFn = () => {
  const rememberMeCheckbox = document.getElementById("rememberMe");

  if (rememberMeCheckbox.checked && user) {
    saveRememberMeData();
  } else {
    clearRememberMeData();
  }
};

/**
 * Saves user email to localStorage for Remember Me.
 */
const saveRememberMeData = () => {
  const userData = { userId: user.email };
  localStorage.setItem("rememberMe", JSON.stringify(userData));
};

/**
 * Clears Remember Me data from localStorage.
 */
const clearRememberMeData = () => {
  localStorage.removeItem("rememberMe");
};

/**
 * Redirects the user from the login page to the registration page.
 */
const redirectToRegister = () => {
  const registerMain = document.getElementById("registerMain");
  const loginMain = document.getElementById("loginMain");
  loginMain.style.display = "none";
  registerMain.style.display = "flex";
};

/**
 * Toggles the "Remember Me" checkbox state.
 * If checked, it remains checked; otherwise, it gets unchecked.
 */
const handleRememberme = () => {
  const dasChecketElement = document.getElementById("rememberMe");
  const checked = dasChecketElement.hasAttribute("checked");

  checked
    ? dasChecketElement.removeAttribute("checked")
    : dasChecketElement.setAttribute("checked", "");
};
