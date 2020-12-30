
import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyBvctFyPN6oJwRt06jhCeDyXXQnCX-x0DM",
    authDomain: "advent-cal-4edc0.firebaseapp.com",
    databaseURL: "https://advent-cal-4edc0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "advent-cal-4edc0",
    storageBucket: "advent-cal-4edc0.appspot.com",
    messagingSenderId: "522650613554",
    appId: "1:522650613554:web:10e86de67fd0e2c446892b",
    measurementId: "G-1834ZC53ZD"
};
firebase.initializeApp(config);
firebase.analytics();
export default firebase;
