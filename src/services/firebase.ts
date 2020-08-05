import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDXm8H1s2yo3Nwnso-JviSYZ-MYTJBzEiI',
  authDomain: 'mypokedex-45277.firebaseapp.com',
  databaseURL: 'https://mypokedex-45277.firebaseio.com',
  projectId: 'mypokedex-45277',
  storageBucket: 'mypokedex-45277.appspot.com',
  messagingSenderId: '1043789399007',
  appId: '1:1043789399007:web:ed9991be16a63a5b5afa6a',
  measurementId: 'G-9TDSBFB4TP',
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
