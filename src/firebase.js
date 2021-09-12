import * as firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDR4j6XUm5FLqdeXDzID-G14UzQ_PZjTZo",
    authDomain: "expense-manager-react-e031e.firebaseapp.com",
    databaseURL: "https://expense-manager-react-e031e-default-rtdb.firebaseio.com",
    projectId: "expense-manager-react-e031e",
    storageBucket: "expense-manager-react-e031e.appspot.com",
    messagingSenderId: "462206134453",
    appId: "1:462206134453:web:9f370f5bc79e4ae810f6fc"
  };
  
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
console.log("firebase");
console.log(firebase);
// init once
// const initFirebase = () => {
//   if(!firebase.apps.length){
//     firebase.initializeApp(firebaseConfig);

//   }
// }

export default firebase;