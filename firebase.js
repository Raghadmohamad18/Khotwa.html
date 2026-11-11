import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
const firebaseConfig = {apiKey: "AIzaSyC3I9DDJKU2D5T3JMPwyoMbVzOpi8KisSQ",authDomain: "skillmasr.firebaseapp.com",
projectId: "skillmasr",storageBucket: "skillmasr.firebasestorage.app",messagingSenderId: "290650747699",appId: "1:290650747699:web:638916dc7ecee74ebfc446",measurementId: "G-700TLH66DW"};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const authReady = new Promise((resolve, reject) => {
const unsubscribe = onAuthStateChanged(auth,(user) => {unsubscribe();resolve(user);},reject);});
