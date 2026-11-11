
import { auth, db, authReady } from "./firebase.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

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

const form = document.getElementById("requestForm");
const coachNameElement = document.getElementById("coachName");

let currentCoach = null;
let currentUser = auth.currentUser;

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

if (!currentUser) {
  passwordInput.required = true;
  confirmPasswordInput.required = true;
} else {
  passwordInput.closest("label")?.remove();
  passwordInput.remove();
  confirmPasswordInput.closest("label")?.remove();
  confirmPasswordInput.remove();
}

async function loadCoach() {
  if (!coachId) {
    throw new Error("لم يتم تحديد المدرب");
  }

  const coachSnap = await getDoc(doc(db, "coaches", coachId));

  if (!coachSnap.exists()) {
    throw new Error("لم يتم العثور على المدرب");
  }

  currentCoach = coachSnap.data();
  coachNameElement.textContent = "المدرب: " + currentCoach.fullName;
}

try {
  await loadCoach();
} catch (error) {
  console.error(error);
  alert(error.message);
  form.style.display = "none";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!currentCoach) {
    alert("بيانات المدرب غير جاهزة");
    return;
  }

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

  if (!/^\d{11}$/.test(phone)) {
    alert("رقم الهاتف يجب أن يتكون من 11 رقمًا");
    return;
  }

  let password = "";

  if (!currentUser) {
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

  try {
    let user = auth.currentUser;

    if (!user) {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      user = result.user;
      currentUser = user;
    } else if (user.email.toLowerCase() !== email.toLowerCase()) {
      alert("استخدمي نفس الإيميل المسجل في حسابك");
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const traineeRef = doc(db, "trainees", user.uid);

    const existingUser = await getDoc(userRef);

    if (existingUser.exists() && existingUser.data().role !== "trainee") {
      alert("هذا الحساب ليس حساب متدرب");
      return;
    }

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
      phone,
      createdAt: serverTimestamp()
    }, { merge: true });

    const requestRef = doc(collection(db, "requests"));
    const notificationRef = doc(collection(db, "notifications"));

    batch.set(requestRef, {
      coachId,
      traineeId: user.uid,
      coachName: currentCoach.fullName,
      traineeName: name,
      traineeEmail: email,
      formData,
      status: "pending",
      createdAt: serverTimestamp()
    });

    batch.set(notificationRef, {
      userId: coachId,
      requestId: requestRef.id,
      type: "new_request",
      title: "طلب تدريب جديد",
      message: "أرسل " + name + " طلب تدريب جديد.",
      isRead: false,
      createdAt: serverTimestamp()
    });

    await batch.commit();

    alert("تم إنشاء حسابك وإرسال طلب الحجز بنجاح!");

    window.location.href = "trainee_personal.html";

  } catch (error) {
    console.error(error);

    if (error.code === "auth/email-already-in-use") {
      alert("الإيميل ده عنده حساب بالفعل. سجلي الدخول من صفحة Login ثم أعيدي الحجز.");
    } else {
      alert("حدث خطأ: " + error.message);
    }
  }
});
