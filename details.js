const data = {
  "أحمد حسن محمد": {
    img: "https://ftcdn.net",
    name: "احمد حسن محمد",
    sport: "كرة القدم",
    governorate: "الإسكندرية",
    area: "نادي الشمس - الإسكندرية",
    price: "100 ج.م / حصة",
    about: "لاعب كرة قدم سابق يتمتع بخبرة تدريبية تزيد عن 5 سنوات. متخصص في تطوير اللياقة البدنية، التحكم بالكرة، دقة التمرير، والتكتيكات المباريات للمبتدئين والمستوى المتوسط.",
    certs: ["رخصة تدريب الاتحاد الأوروبي (UEFA)", "دبلومة اللياقة البدنية"],
    trainingPlaces: ["https://youm7.com"]
  },
  "سارة محمد": {
    img: "https://istockphoto.com",
    name: "ساره محمد حسن",
    sport: "سباحة",
    governorate: "القاهرة",
    area: "جولدز - القاهرة",
    price: "50 ج.م / حصة",
    about: "مدربة سباحة معتمدة بخبرة تتجاوز 10 سنوات. تساعد العملاء على تحقيق أهدافهم من خلال خطط تمارين مخصصة، توجيهات غذائية، وتحفيز مستمر.",
    certs: ["شهادة NASM العالمية للمحترفين", "دورة التغذية الرياضية"],
    trainingPlaces: ["https://gstatic.com"]
  },
  "عمر علي": {
    img: "https://shutterstock.com",
    name: "عمر حسام محمد",
    sport: "كرة السلة",
    governorate: "الإسكندرية",
    area: "النادي الرياضي - الإسكندرية",
    price: "80 ج.م / حصة",
    about: "مدرب كرة سلة محترف بخبرة تزيد عن 7 سنوات. يركز على تقنيات التسديد، مهارات العمل الجماعي، التحكم بالكرة، والأداء الرياضي العام.",
    certs: ["رخصة تدريب كرة السلة", "دبلومة العلوم الرياضية"],
    trainingPlaces: ["https://gstatic.com"]
  },
  "يوسف عادل": {
    img: "https://vecteezy.com",
    name: "يوسف عادل محي",
    sport: "كاراتيه",
    governorate: "الإسكندرية",
    area: "النادي الأوليمبي - الإسكندرية",
    price: "120 ج.م / حصة",
    about: "مدرب كاراتيه يتمتع بخبرة تزيد عن 15 عاماً. متخصص في تدريب جميع الفئات العمرية، وتطوير المهارات الفنية، وتعزيز القدرة على التحمل، والتحضير للمنافسات",
    certs: ["شهادة مدرب كاراتيه معتمد"],
    trainingPlaces: ["https://gstatic.com"]
  },
  "مريم عادل": {
    img: "https://gstatic.com",
    name: "مريم عادل",
    sport: "الفنون والأشغال اليدوية",
    governorate: "الإسكندرية",
    area: "مركز الفنون الإبداعية - الإسكندرية",
    price: "90 ج.م / حصة",
    about: "مدربة فنون متخصصة في أشغال الكروشيه والريزن. تساعد المبتدئين على تعلم المهارات اليدوية الإبداعية خطوة بخطوة.",
    certs: ["دورة الكروشيه المتقدمة", "ورشة عمل فنون الريزن"],
    trainingPlaces: ["https://google.com"]
  },
  "فاطمة علي": {
    img: "https://logomakerr.ai",
    name: "فاطمة علي",
    sport: "الأعمال اليدوية",
    governorate: "القاهرة",
    area: "استوديو الأشغال اليدوية - القاهرة",
    price: "80 ج.م / حصة",
    about: "فنانة أشغال يدوية متخصصة في صناعة الشموع والمنتجات الديكورية بتصاميم إبداعية حديثة وعصرية.",
    certs: ["شهادة احتراف صناعة الشموع"],
    trainingPlaces: ["https://jwwb.nl"]
  },
  "ندى أحمد": {
    img: "https://dreamstime.com",
    name: "ندى أحمد",
    sport: "الموسيقى",
    governorate: "الإسكندرية",
    area: "أكاديمية الموسيقى - الإسكندرية",
    price: "130 ج.م / حصة",
    about: "مدرسة بيانو تمتلك خبرة قوية في تدريس النظريات الموسيقية ومهارات العزف العملي على البيانو لجميع المستويات.",
    certs: ["دبلومة معلم بيانو معتمد"],
    trainingPlaces: ["https://google.com"]
  },
  "عمر مصطفى": {
    img: "https://etsystatic.com",
    name: "عمر مصطفى",
    sport: "الموسيقى",
    governorate: "الجيزة",
    area: "مركز الجيتار - الجيزة",
    price: "120 ج.م / حصة",
    about: "مدرس جيتار يقوم بتدريس الجيتار الأكوستيك والكهربائي مع التركيز على الطلاب المبتدئين والمتوسطين.",
    certs: ["شهادة في النظريات الموسيقية"],
    trainingPlaces: ["https://gstatic.com"]
  },
  "محمد خالد": {
    img: "https://freepik.com",
    name: "محمد خالد",
    sport: "البرمجة",
    governorate: "القاهرة",
    area: "مركز التكنولوجيا (تيك هاب) - القاهرة",
    price: "150 ج.م / حصة",
    about: "مهندس برمجيات يقوم بتدريس تطوير المواقع الإلكترونية بما في ذلك لغات HTML، CSS، JavaScript والعمل على مشاريع حقيقية.",
    certs: ["شهادة مطور الويب المتكامل (Full Stack)"],
    trainingPlaces: ["https://cio.com"]
  },
  "أحمد سمير": {
    img: "https://123rf.com",
    name: "أحمد سمير",
    sport: "البرمجة",
    governorate: "الإسكندرية",
    area: "أكاديمية البرمجة (كودينج أكاديمي) - الإسكندرية",
    price: "180 ج.م / حصة",
    about: "مطور بايثون (Python) متخصص في حل المشكلات، الأتمتة، والتدريب البرمجي الشامل للمبتدئين.",
    certs: ["شهادة معتمدة في لغة بايثون", "دورة أتمتة المهام البرمجية"],
    trainingPlaces: ["https://licdn.com"]
  }
};
import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
const params = new URLSearchParams(window.location.search);
const coachId = params.get("id");
const demoCoach = data[coachId] || Object.values(data).find(coach => coach.name === coachId) || null;
function displayDemoCoach(coach) {
  document.getElementById("name").textContent = coach.name;
  document.getElementById("sport").textContent = coach.sport;
  document.getElementById("img").src = coach.img;
  document.getElementById("area").textContent = coach.area + " - " + coach.governorate;
  document.getElementById("price").textContent = coach.price;
  document.getElementById("about").textContent = coach.about;
  document.getElementById("certs").innerHTML = coach.certs.map(c => `<li>${c}</li>`).join("");
  document.getElementById("places").innerHTML = coach.trainingPlaces.map(p => `<a href="${p}" target="_blank">مكان التدريب</a>`).join("");}
async function displayFirebaseCoach(coachId) {
  const coachSnap = await getDoc(doc(db, "coaches", coachId));
  if (!coachSnap.exists()) {
    alert("لم يتم العثور على المدرب");
    return;
  }
  const coach = coachSnap.data();
  document.getElementById("name").textContent = coach.fullName || "";
  document.getElementById("sport").textContent = coach.specialization || "";
  document.getElementById("img").src = coach.imageUrl || "";
  document.getElementById("area").textContent = coach.area || "";
  document.getElementById("price").textContent = (coach.price || "") + " EGP / " + (coach.priceType === "monthly" ? "Month" : "Session");
  document.getElementById("about").textContent = coach.about || "";
  const certs = document.getElementById("certs");
  const places = document.getElementById("places");
  certs.innerHTML = "";
  places.innerHTML = "";
  (coach.certs || []).forEach(url => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = url;
    img.style.width = "150px";
    li.appendChild(img);
    certs.appendChild(li);
  });
  (coach.trainingPlaces || []).forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.style.width = "150px";
    places.appendChild(img);
  });
}
async function loadCoachDetails() {
  try {
    if (!coachId) {
      alert("لم يتم تحديد المدرب");
      return;
    }
    if (demoCoach) {
      displayDemoCoach(demoCoach);
    } else {
      await displayFirebaseCoach(coachId);
    }
  } catch (error) {
    console.error(error);
    alert("حدث خطأ أثناء تحميل تفاصيل المدرب");
  }
}
loadCoachDetails();
