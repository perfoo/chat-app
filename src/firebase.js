import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyB0PLrZqZAuFbrGI1M3syFIm6KVrV3wIg8",
    authDomain: "greenchat-9e8ae.firebaseapp.com",
    projectId: "greenchat-9e8ae",
    storageBucket: "greenchat-9e8ae.appspot.com",
    messagingSenderId: "459389909994",
    appId: "1:459389909994:web:37705048f922b0faabd093"
  
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();

export default firebase;