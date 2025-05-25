
// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const questions = [
  "เจอกันครั้งแรกรู้สึกยังไง",
  "อะไรที่ชอบและประทับใจมากที่สุดในตัวอีกฝ่าย",
  "ชอบเหตุการณ์ไหนที่สุดตอนที่เราอยู่ด้วยกัน",
  "คาดหวังอะไรในความสัมพันธ์นี้บ้าง",
  "มีเรื่องไหนที่รู้สึกกังวลในความสัมพันธ์นี้มั้ย",
  "ไม่อยากเจอความสัมพันธ์แบบไหนมากที่สุด",
  "มีเรื่องที่น้อยใจแต่ไม่กล้าพูดบ้างมั้ย",
  "ถ้าเผลอทำเรื่องที่ไม่ชอบจะทำยังไง",
  "มีสิ่งที่อยากให้ทำเรื่อยๆมั้ย",
  "ถ้าตื่นมาแล้วมีพลังวิเศษอยากให้พลังนั้นเป็นอะไร",
  "มีเรื่องไหน นิสัยไหนที่อยากให้อีกฝ่ายปรับมั้ย",
  "ถ้าสัญญาแล้วแต่ผิดสัญญาจะทำยังไง",
  "คิดว่าจุดอ่อนในความสัมพันธ์คืออะไร",
  "อะไรคือสิ่งเล็กๆน้อยๆที่ทำให้ยิ้มได้ทุกครั้ง",
  "คำพูดที่อีกฝ่ายเคยพูดแล้วมันติดอยู่ในใจมาตลอดคืออะไร",
  "เคยมีความฝันที่ยังไม่ได้ลงมือทำไหม",
  "ตอนเด็กๆอยากให้ชีวิตในอนาคตเป็นแบบไหน",
  "ถ้าย้อนเวลากลับไปเปลี่ยนแปลงอะไรในชีวิตได้ จะเปลี่ยนอะไร",
  "ถ้าเราสองคนต้องไปอยู่บนเกาะร้าง สิ่งเดียวที่อยากเอาไปด้วยคืออะไร",
  "ร้องไห้ครั้งสุดท้ายตอนไหน",
  "มีเรื่องอะไรอยากจะระบายมั้ย",
  "อะไรที่อยากทำด้วยกันมากที่สุดตอนนี้",
  "ถ้าต้องให้พูดสิ่งหนึ่งกับอีกฝ่ายเป็นครั้งสุดท้ายอยากจะบอกอะไร",
  "ถ้าเปรียบเราสองคนเป็นเพลงหนึ่งเพลง จะเลือกเพลงอะไร",
  "มีสิ่งที่กลัวที่สุดในชีวิตไหม",
  "ชอบอะไรในตัวเองมากที่สุด",
  "คิดว่าความสัมพันธ์เราตอนนี้เป็นยังไง",
  "อะไรทำให้ตัดสินใจเลือกคนนี้"
];

const questionEl = document.getElementById("question");
const myAnswer = document.getElementById("myAnswer");
const yourAnswer = document.getElementById("yourAnswer");
const partnerAnswer = document.getElementById("partnerAnswer");
const newQuestionBtn = document.getElementById("newQuestion");

function getRandomQuestion() {
  const q = questions[Math.floor(Math.random() * questions.length)];
  questionEl.textContent = q;
  set(ref(db, "question"), q);
  set(ref(db, "yourAnswer"), "");
  set(ref(db, "partnerAnswer"), "");
  myAnswer.value = "";
}

newQuestionBtn.addEventListener("click", getRandomQuestion);

myAnswer.addEventListener("input", () => {
  set(ref(db, "yourAnswer"), myAnswer.value);
});

onValue(ref(db, "question"), (snapshot) => {
  questionEl.textContent = snapshot.val() || "คำถามจะปรากฏที่นี่";
});

onValue(ref(db, "yourAnswer"), (snapshot) => {
  yourAnswer.textContent = snapshot.val();
});

onValue(ref(db, "partnerAnswer"), (snapshot) => {
  partnerAnswer.textContent = snapshot.val();
});
