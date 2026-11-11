import { auth, db, authReady } from "./firebase.js";
import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  doc,
  getDoc,
  collection,
  writeBatch,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
await authReady;
const params = new URLSearchParams(window.location.search);
const coachId = params.get("id");
const isDemo = params.get("demo") === "true";
const form = document.getElementById("requestForm");
const coachNameElement = document.getElementById("coachName");
let currentCoach = null;
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
if (!auth.currentUser) {
  if (passwordInput) passwordInput.required = true;
  if (confirmPasswordInput) confirmPasswordInput.required = true;
} else {
  passwordInput?.closest("label")?.remove();
  passwordInput?.remove();
  confirmPasswordInput?.closest("label")?.remove();
  confirmPasswordInput?.remove();
}
async function loadCoach() {
  if (!coachId) {
    throw new Error("لم يتم تحديد المدرب");
  }
  if (isDemo) {
    currentCoach = {
      fullName: coachId,
      isDemo: true
    };
  } else {
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
  const name = document.getElementById("traineeName").value.trim();
  const email = document.getElementById("traineeEmail").value.trim();
  const phone = document.getElementById("num").value.trim();
  const formData = {
    goal: document.getElementById("goal").value.trim(),
    experience: document.getElementById("experience").value,
    governorate: document.getElementById("gov").value.trim(),
    phone,
    preferredTime: document.getElementById("preferredTime").value.trim(),
    notes: document.getElementById("notes").value.trim()
  };
  let password = "";
  if (!auth.currentUser) {
    password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password.length < 6) {
      alert("كلمة المرور يجب ألا تقل عن 6 أحرف");
      return;
    }

    if (password !== confirmPassword) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }
  }
    let user = auth.currentUser;

    if (!user) {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password);
      user = result.user;
    }
    const userRef = doc(db, "users", user.uid);
    const traineeRef = doc(db, "trainees", user.uid);
    const batch = writeBatch(db);
    batch.set(userRef, {
      uid: user.uid,
      name,
      email,
      role: "trainee",
      createdAt: serverTimestamp()
    }, { merge: true });

    batch.set(traineeRef, {
      uid: user.uid,
      name,
      email,
      phone
    }, { merge: true });

    const requestRef = doc(collection(db, "requests"));

    batch.set(requestRef, {
      coachId: currentCoach.isDemo ? null : coachId,
      coachName: currentCoach.fullName,
      isDemo: currentCoach.isDemo,
      traineeId: user.uid,
      traineeName: name,
      traineeEmail: email,
      formData,
      status: "pending",
      createdAt: serverTimestamp()
    });
    if (!currentCoach.isDemo) {
      const notificationRef = doc(collection(db, "notifications"));

      batch.set(notificationRef, {
        userId: coachId,
        requestId: requestRef.id,
        type: "new_request",
        title: "طلب تدريب جديد",
        message: "أرسل " + name + " طلب تدريب جديد.",
        isRead: false,
        createdAt: serverTimestamp()
      });
    }

    await batch.commit();

    alert("تم إنشاء حسابك وإرسال طلب الحجز بنجاح!");

    window.location.href = "trainee_personal.html";
 }
});
