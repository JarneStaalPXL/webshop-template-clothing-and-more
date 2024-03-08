import store from "../store";
import router from "../router";//TODO: Fix this 


// Firebase Config
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuyapE8pw2B4OI6baq40b8yfkyqkZp-6o",
  authDomain: "webshop-template-b7cd5.firebaseapp.com",
  projectId: "webshop-template-b7cd5",
  storageBucket: "webshop-template-b7cd5.appspot.com",
  messagingSenderId: "1078071292563",
  appId: "1:1078071292563:web:5bbaa6c014f3e24fbb5366",
  measurementId: "G-JTLHPQ3Q1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Email password login
const loginWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    store.commit("SET_USER", {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
    });

    // Change login status
    store.commit("SET_ISLOGGEDIN", true);
    await store.dispatch("CREATE_USER_ON_STRAPI", user);
    await store.dispatch("LOAD_CART", user.uid);
    router.push('/');
    
    return userCredential.user;
  } catch (error) {
    const friendlyError = handleFirebaseError(error);
    console.error("Login failed:", error.message);
    throw friendlyError;
  }
};

// Google sign-in/up
const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // This can also act as registration with Google
    const user = result.user;

    // Update the store with the user's data
    store.commit("SET_USER", {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
    });

    try {
      // Change login status
      store.commit("SET_ISLOGGEDIN", true);
      await store.dispatch("CREATE_USER_ON_STRAPI", user);
      await store.dispatch("LOAD_CART", user.uid);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
    router.push('/');
    return user;
  } catch (error) {
    const friendlyError = handleFirebaseError(error);
    console.error("Login failed:", error.message);
    throw friendlyError;
  }
};

const logout = async () => {
  try {
    store.commit("SET_USER", {});
    store.commit("SET_ISLOGGEDIN", false);
    localStorage.removeItem("cartId");
  } catch (error) {
    const friendlyError = handleFirebaseError(error);
    console.error("Login failed:", error.message);
    throw friendlyError;
  }
}

// Email password registration
const registerWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

     // Update the store with the user's data
     store.commit("SET_USER", {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
    });

    // Change login status
    store.commit("SET_ISLOGGEDIN", true);
    store.dispatch("CREATE_USER_ON_STRAPI", user);
    router.push('/');

    return userCredential.user;
  } catch (error) {
    const friendlyError = handleFirebaseError(error);
    console.error("Login failed:", error.message);
    throw friendlyError;
  }
};

const handleFirebaseError = (error) => {
  let errorMessage = 'An error occurred. Please try again.';

  // Customize error handling and user feedback based on the error code
  switch (error.code) {
    case 'auth/user-not-found':
      errorMessage = 'No user found with this email adress.';
      break;
      case 'auth/invalid-credential':
        errorMessage = 'The email address or password is incorrect. Please check your credentials and try again.';
        break;
      
    case 'auth/email-already-in-use':
      errorMessage = 'This email address is already in use by another account.';
      break;
    case 'auth/invalid-email':
      errorMessage = 'The email address is invalid.';
      break;
    case 'auth/operation-not-allowed':
      errorMessage = 'Email/password accounts are not enabled. Please contact support.';
      break;
    case 'auth/weak-password':
      errorMessage = 'The password is too weak. Please choose a stronger password.';
      break;
    // Add additional case statements for other Firebase Auth errors as needed
    default:
      errorMessage = error.message; // Use the default error message provided by Firebase Auth
  }

  // Log the error for debugging purposes
  console.error("Firebase Auth error:", error.message);

  // Return an error object with a user-friendly message
  return {
    message: errorMessage,
    code: error.code,
  };
};


export { loginWithEmailPassword, loginWithGoogle, registerWithEmailPassword,logout };
