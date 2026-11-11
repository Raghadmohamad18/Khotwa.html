function order(phone, name) {
 const CoachesNames = {
   "Ahmed Hassan": "أحمد حسن محمد",
   "Sara Mohamed": "سارة محمد",
   "Omar Ali": "عمر علي",
   "Youssef Adel": "يوسف عادل",
   "Mariam Adel": "مريم عادل",
   "Fatma Ali": "فاطمة علي",
   "Nada Ahmed": "ندى أحمد",
   "Omar Mostafa": "عمر مصطفى",
   "Mohamed Khaled": "محمد خالد",
   "Ahmed Samir": "أحمد سمير"
 };
 const coachName = CoachesNames[name];
 if (!coachName) {
   alert("لم يتم العثور على المدرب");
   return;
 }
 window.location.href =
   "booking.html?id=" + encodeURIComponent(coachName);
}
function showCategory(categoryId) {
 document.querySelectorAll(".category").forEach(section => {
   section.style.display = "none";
 });
 const selected = document.getElementById(categoryId);
 if (selected) {
      selected.style.display = "block";
    }
  }
  function Details(name) {
    const CoachesNames = {
      "Ahmed Hassan": "أحمد حسن محمد",
      "Sara Mohamed": "سارة محمد",
      "Omar Ali": "عمر علي",
      "Youssef Adel": "يوسف عادل",
      "Mariam Adel": "مريم عادل",
      "Fatma Ali": "فاطمة علي",
      "Nada Ahmed": "ندى أحمد",
      "Omar Mostafa": "عمر مصطفى",
      "Mohamed Khaled": "محمد خالد",
      "Ahmed Samir": "أحمد سمير"
    };
    const coachName = CoachesNames[name];
    if (!coachName) {
      alert("لم يتم العثور على المدرب");
      return;
    }
    window.location.href =
      "details.html?id=" + encodeURIComponent(coachName);
  }
  function BookingFirebase(id) {
    if (!id) return;
    window.location.href = "booking.html?id=" + encodeURIComponent(id);
  }
function DetailsFirebase(id) {
    if (!id) return;

    window.location.href =
        "details.html?id=" + encodeURIComponent(id);
}
  window.order = order;
  window.showCategory = showCategory;
  window.Details = Details;
  window.DetailsFirebase = DetailsFirebase;
  window.BookingFirebase = BookingFirebase;
  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", function () {
      const value = this.value.toLowerCase();
      document.querySelectorAll(".coach-card").forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(value) ? "flex" : "none";
      });
    });
  }
  import { db } from "./firebase.js";
  import {
    collection,
    getDocs
  } 
  from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
  const snapshot = await getDocs(collection(db, "coaches"));
  snapshot.forEach((doc) => {
  const coach = doc.data();
  let container;
  if (coach.category === "Sports") {
      container = document.getElementById("sportsFirebase");
  }
  else if (coach.category === "Handmade") {
      container = document.getElementById("handmadeFirebase");
  }
  else if (coach.category === "Music") {
      container = document.getElementById("musicFirebase");
  }
  else if (coach.category === "Programming") {
      container = document.getElementById("programmingFirebase");
  }
  else if (coach.category === "Quran") {
   container = document.getElementById("quranFirebase");
  }
  else if (coach.category === "Other") {
  container = document.getElementById("otherFirebase");
  }
  else {
      return;
  }
  container.innerHTML +=`
  <div class="trainer coach-card">
  <img src="${coach.imageUrl || 'https://via.placeholder.com/250x180'}" alt="Coach Photo">
  <h3>${coach.fullName}</h3>
  <h3>${coach.specialization}</h3>
  <p>${coach.about}</p>
  <p>${coach.governorate}</p>
  <p>${coach.area}</p>
  ${coach.priceType === "monthly"? 
  `<p class="price">${coach.price} EGP / Month</p>`: 
  `<p class="price">${coach.price} EGP / Session</p>`}
  <button onclick="BookingFirebase('${doc.id}')">الحجز مع المدرب</button>
  <button onclick="DetailsFirebase('${doc.id}')">عرض المزيد</button>
</div>`;
});
