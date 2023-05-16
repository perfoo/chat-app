/*import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'; */
import firebase from 'firebase/compat/app';  // Use 'firebase/compat/app' instead of 'firebase/app'
import 'firebase/compat/auth';  // Use 'firebase/compat/auth' instead of 'firebase/auth'
import 'firebase/compat/database';  // Use 'firebase/compat/database' instead of 'firebase/database'


const firebaseConfig = {
    apiKey: "AIzaSyB0PLrZqZAuFbrGI1M3syFIm6KVrV3wIg8",
    authDomain: "greenchat-9e8ae.firebaseapp.com",
    databaseURL: "https://greenchat-9e8ae-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "greenchat-9e8ae",
    storageBucket: "greenchat-9e8ae.appspot.com",
    messagingSenderId: "459389909994",
    appId: "1:459389909994:web:37705048f922b0faabd093"
  
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
export default firebase;