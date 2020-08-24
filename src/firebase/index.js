import firebase from 'firebase';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBSdBNYvoMowldaGC0dEEwS-4HqiYDhN-I',
  authDomain: 'test-app-c0668.firebaseapp.com',
  databaseURL: 'https://test-app-c0668.firebaseio.com',
  projectId: 'test-app-c0668',
  storageBucket: 'test-app-c0668.appspot.com',
  messagingSenderId: '777341747216',
  appId: '1:777341747216:web:7f0f5afc5f6b035c810a95',
  measurementId: 'G-BP0L5QZF8L',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
