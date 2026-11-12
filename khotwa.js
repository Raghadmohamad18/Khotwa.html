import { auth, authReady, db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
const CoachesNames = {
  "Ahmed Hassan": "احمد حسن محمد",
  "Sara Mohamed": "ساره محمد حسن",
  "Omar Ali": "عمر حسام محمد",
  "Youssef Adel": "يوسف عادل محي",
  "Mariam Adel": "مريم عادل",
  "Fatma Ali": "فاطمة علي",
  "Nada Ahmed": "ندى أحمد",
  "Omar Mostafa": "عمر مصطفى",
  "Mohamed Khaled": "محمد خالد",
  "Ahmed Samir": "أحمد سمير"
};
function order(name) {
  const coachName = CoachesNames[name];
  if (!coachName) {
    alert("لم يتم العثور على المدرب: " + name);
    return;
  }
  const bookingUrl = new URL("./booking.html", window.location.href);
  bookingUrl.searchParams.set("id", coachName);
  bookingUrl.searchParams.set("demo", "true");
  window.location.assign(bookingUrl.href);
}

function Details(name) {
  const coachName = CoachesNames[name];
  if (!coachName) {
    alert("لم يتم العثور على المدرب: " + name);
    return;
  }
  const detailsUrl = new URL("./details.html", window.location.href);
  detailsUrl.searchParams.set("id", coachName);
  window.location.assign(detailsUrl.href);
}
function showCategory(categoryId) {
  document.querySelectorAll(".category").forEach(section => {
    section.style.display = "none";
  });
  const selected = document.getElementById(categoryId);
  if (selected) selected.style.display = "block";
}
function BookingFirebase(id) {
  if (!id) return;
  window.location.href = "booking.html?id=" + encodeURIComponent(id);
}
function DetailsFirebase(id) {
  if (!id) return;
  window.location.href = "details.html?id=" + encodeURIComponent(id);
}
window.order = order;
window.showCategory = showCategory;
window.Details = Details;
window.DetailsFirebase = DetailsFirebase;
window.BookingFirebase = BookingFirebase;
const search = document.getElementById("search");
const governorateSearch = document.getElementById("governorateSearch");
const areaSearch = document.getElementById("areaSearch");
function normalizeText(text) {
  return (text || "").toString().trim().toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");
}
function searchTrainers() {
  const activity = normalizeText(search?.value);
  const governorate = normalizeText(governorateSearch?.value);
  const area = normalizeText(areaSearch?.value);
  document.querySelectorAll(".coach-card").forEach(card => {
    const info = normalizeText(card.innerText);
    const coachGovernorate = normalizeText(card.dataset.governorate);
    const coachArea = normalizeText(card.dataset.area);
    const matches = info.includes(activity) &&
      coachGovernorate.includes(governorate) &&
      coachArea.includes(area);
    card.style.display = matches ? "flex" : "none";
  });
}
if (search) search.addEventListener("input", searchTrainers);
if (governorateSearch) governorateSearch.addEventListener("input", searchTrainers);
if (areaSearch) areaSearch.addEventListener("input", searchTrainers);
async function loadFirebaseCoaches() {
  try {
    await authReady;
    const snapshot = await getDocs(collection(db, "coaches"));
    snapshot.forEach(doc => {
      const coach = doc.data();
      let container;
      if (coach.category === "Sports") container = document.getElementById("sportsFirebase");
      else if (coach.category === "Handmade") container = document.getElementById("handmadeFirebase");
      else if (coach.category === "Music") container = document.getElementById("musicFirebase");
      else if (coach.category === "Programming") container = document.getElementById("programmingFirebase");
      else if (coach.category === "Quran") container = document.getElementById("quranFirebase");
      else if (coach.category === "Other") container = document.getElementById("otherFirebase");
      if (container) {
        container.innerHTML += `
          <div class="trainer coach-card" data-governorate="${coach.governorate || ""}" data-area="${coach.area || ""}">
            <img src="${coach.imageUrl || 'https://placehold.co/300x200'}" alt="Coach Photo">
            <h3>${coach.fullName || ""}</h3>
            <h3>${coach.specialization || ""}</h3>
            <p>${coach.about || ""}</p>
            <p>المحافظة: ${coach.governorate || "غير محدد"}</p>
            <p>المنطقة: ${coach.area || "غير محدد"}</p>
            ${coach.priceType === "monthly"
              ? `<p class="price">${coach.price || 0} EGP / Month</p>`
              : `<p class="price">${coach.price || 0} EGP / Session</p>`}
            <button onclick="BookingFirebase('${doc.id}')">الحجز مع المدرب</button>
            <button onclick="DetailsFirebase('${doc.id}')">عرض المزيد</button>
          </div>`;
      }
    });
    searchTrainers();
  } catch (error) {
    console.error("Firebase Error:", error);
  }
}
loadFirebaseCoaches();
