
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth'
// import 'firebase/compat/firestore'
// import 'firebase/compat/storage'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDaZuLX_poE6lB0mYGlYyJsJ-2ZBntvAeg",
//   authDomain: "cinema-d3cea.firebaseapp.com",
//   projectId: "cinema-d3cea",
//   storageBucket: "cinema-d3cea.appspot.com",
//   messagingSenderId: "668282397779",
//   appId: "1:668282397779:web:afdb722fa9f0b2748152a6",
//   measurementId: "G-BTD0277E4E"
// };

// // Initialize Firebase
// if(!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig)
// }

// export {firebase};

//Web version 8
// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import "firebase/firestore";
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";

import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDaZuLX_poE6lB0mYGlYyJsJ-2ZBntvAeg",
    authDomain: "cinema-d3cea.firebaseapp.com",
    projectId: "cinema-d3cea",
    storageBucket: "cinema-d3cea.appspot.com",
    messagingSenderId: "668282397779",
    appId: "1:668282397779:web:afdb722fa9f0b2748152a6",
    measurementId: "G-BTD0277E4E"
  };

firebase.initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();
// Create a storage reference from our storage service
export const storageRef = storage.ref();

export default firebase;

// //storage
// export async function upload(file, currentUser, setLoading) {
//   const fileRef = ref(storage, currentUser.uid + ".png");

//   const snapshot = await uploadBytes(fileRef, file);
// }