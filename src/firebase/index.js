import firebase from 'firebase';
import 'firebase/database';

const firebaseConfig = process.env.VUE_APP_FIREBASE_CONFIG;
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
