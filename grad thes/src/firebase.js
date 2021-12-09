import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyAFrUleriaGGOHq6gBYcBdn63CQ7SolNuE",
   authDomain: "e-commerce-app-6ce64.firebaseapp.com",
   projectId: "e-commerce-app-6ce64",
   storageBucket: "e-commerce-app-6ce64.appspot.com",
   messagingSenderId: "267754970501",
   appId: "1:267754970501:web:af7fd824b3ee23a211b8ec",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
