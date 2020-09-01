import firebase from 'firebase';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_APIKEY,
  authDomain: process.env.VUE_APP_FB_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FB_DATABASEURL,
  projectId: process.env.VUE_APP_FB_PROJECTID,
  storageBucket: process.env.VUE_APP_FB_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FB_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_FB_APPID,
  measurementId: process.env.VUE_APP_FB_MEASUREMENTID,
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
