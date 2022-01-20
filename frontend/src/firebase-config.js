// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4NtJUK04sd37ljBGROU4E4ChKiGl-R_k",
  authDomain: "stasa-da3d5.firebaseapp.com",
  projectId: "stasa-da3d5",
  storageBucket: "stasa-da3d5.appspot.com",
  messagingSenderId: "219877207531",
  appId: "1:219877207531:web:a65cb808e025a6aec5bdae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const [loggedInUser, setLoggedInUser] = useState(null);

onAuthStateChanged(auth, (user) => {
  console.log("AUTH STATE CHANGED!");
  if (user) {
    console.log("User:", user);
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    setLoggedInUser(user);
    // ...
  } else {
    setLoggedInUser(null);
  }
});