import { auth, db, authReady } from "./firebase.js";
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
let isDemoCoach = false;
const demoCoaches = {
    "أحمد حسن محمد": "أحمد حسن محمد",
    "سارة محمد": "سارة محمد",
    "عمر علي": "عمر علي",
    "يوسف عادل": "يوسف عادل",
    "مريم عادل": "مريم عادل",
    "فاطمة علي": "فاطمة علي",
    "ندى أحمد": "ندى أحمد",
    "عمر مصطفى": "عمر مصطفى",
    "محمد خالد": "محمد خالد",
    "أحمد سمير": "أحمد سمير"
};
if (!coachId) {
    alert("لم يتم تحديد المدرب");
    form.style.display = "none";
} else if (demoCoaches[coachId]) {
    isDemoCoach = true;
    currentCoach = { name: demoCoaches[coachId] };
    coachNameElement.textContent = "المدرب: " + currentCoach.name;
} else {
    if (!currentUser) {
        sessionStorage.setItem("pendingCoachId", coachId);
        alert("يجب تسجيل الدخول أولاً");
        window.location.href = "log.html";
    } else {
        try {
            const userSnap = await getDoc(doc(db, "users", currentUser.uid));
            if (!userSnap.exists() || userSnap.data().role !== "trainee") {
                alert("يجب تسجيل الدخول بحساب متدرب");
                form.style.display = "none";
            } else {
                const coachSnap = await getDoc(doc(db, "coaches", coachId));
                if (!coachSnap.exists()) {
                    alert("لم يتم العثور على المدرب");
                    form.style.display = "none";
                } else {
                    currentCoach = coachSnap.data();
                    coachNameElement.textContent = "المدرب: " + currentCoach.fullName;
                }
            }
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء تحميل بيانات المدرب");
            form.style.display = "none";
        }
    }
}
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentCoach) {
        alert("بيانات المدرب غير جاهزة");
        return;
    }
    const formData = {
        traineeName: document.getElementById("traineeName").value.trim(),
        traineeEmail: document.getElementById("traineeEmail").value.trim(),
        goal: document.getElementById("goal").value.trim(),
        experience: document.getElementById("experience").value,
        governorate: document.getElementById("gov").value.trim(),
        phone: document.getElementById("num").value.trim(),
        preferredTime: document.getElementById("preferredTime").value.trim(),
        notes: document.getElementById("notes").value.trim()
    };
    if (isDemoCoach) {
        const demoRequests = JSON.parse(localStorage.getItem("demoRequests") || "[]");
        demoRequests.push({
            coachName: currentCoach.name,
            ...formData,
            date: new Date().toLocaleString()
        });
        localStorage.setItem("demoRequests", JSON.stringify(demoRequests));
        alert("تم إرسال طلب التدريب التجريبي بنجاح!");
        form.reset();
        return;
    }
    if (!currentUser) {
        alert("يجب تسجيل الدخول أولاً");
        return;
    }
    try {
        const traineeSnap = await getDoc(doc(db, "trainees", currentUser.uid));
        if (!traineeSnap.exists()) {
            alert("بيانات المتدرب غير موجودة");
            return;
        }
        const phone = document.getElementById("num").value.trim();
        if (!/^\d{11}$/.test(phone)) {
            throw new Error("رقم الهاتف يجب أن يتكون من 11 رقمًا");
        }
        const batch = writeBatch(db);
        const requestRef = doc(collection(db, "requests"));
        const notificationRef = doc(collection(db, "notifications"));
        batch.set(requestRef, {
            coachId: coachId,
            traineeId: currentUser.uid,
            coachName: currentCoach.fullName,
            traineeName: formData.traineeName,
            traineeEmail: formData.traineeEmail,
            formData: formData,
            status: "pending",
            createdAt: serverTimestamp()
        });
        batch.set(notificationRef, {
            userId: coachId,
            requestId: requestRef.id,
            type: "new_request",
            title: "طلب تدريب جديد",
            message: "أرسل " + formData.traineeName + " طلب تدريب جديد.",
            isRead: false,
            createdAt: serverTimestamp()
        });
        await batch.commit();
        alert("تم إرسال طلب التدريب بنجاح!");
        form.reset();
    } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء إرسال الطلب: " + error.message);
    }
});
