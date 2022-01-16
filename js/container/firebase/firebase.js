const firebaseConfig = {
  apiKey: "AIzaSyAbKFuxhWW_rDE8jQC_bd-lGqMuPFniEfw",
  authDomain: "signup-6c40a.firebaseapp.com",
  projectId: "signup-6c40a",
  storageBucket: "signup-6c40a.appspot.com",
  messagingSenderId: "79691334432",
  appId: "1:79691334432:web:6a362dd0757e7db0b74d45",
  measurementId: "G-SP4ZWDNKZ0"
};
const appFb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;