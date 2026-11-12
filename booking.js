import { db } from "./firebase.js";
import {
  doc, getDoc, collection, addDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
const params = new URLSearchParams(window.location.search);
const coachId = params.get("id");
const isDemo = params.get("demo") === "true";
const form = document.getElementById("requestForm");
const coachNameElement = document.getElementById("coachName");
let currentCoach = null;
async function loadCoach() {
  if (!coachId) {
    throw new Error("لم يتم تحديد المدرب");
  }
  if (isDemo) {
    currentCoach = {
      fullName: coachId,
      isDemo: true
    };
  }else {
    const coachSnap = await getDoc(doc(db, "coaches", coachId));
    if (!coachSnap.exists()) {
      throw new Error("لم يتم العثور على المدرب");
    }
    currentCoach = {...coachSnap.data(),
      isDemo: false};}
  coachNameElement.textContent = "المدرب: " + currentCoach.fullName;}
await loadCoach();
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
  const name = document.getElementById("traineeName").value.trim();
  const phone = document.getElementById("num").value.trim();
  const formData = {
    goal: document.getElementById("goal").value.trim(),
    experience: document.getElementById("experience").value,
    governorate: document.getElementById("gov").value.trim(),
    phone,
    preferredTime: document.getElementById("preferredTime").value.trim(),
    notes: document.getElementById("notes").value.trim()
  };
  await addDoc(collection(db, "requests"), {
  coachId: currentCoach.isDemo ? null : coachId,
  coachName: currentCoach.fullName,
  isDemo: currentCoach.isDemo,
  traineeName: name,
  formData,
  status: "pending",
  createdAt: serverTimestamp()
});

alert("تم إرسال طلب الحجز بنجاح! سيتواصل معك المدرب.");
form.reset();
  }
});
