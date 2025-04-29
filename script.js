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

const startDate = new Date('2025-04-14'); // ตั้งวันคบกัน
const today = new Date();
const diffTime = Math.abs(today - startDate);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
document.getElementById('daysCount').textContent = diffDays;

function newQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    document.getElementById('question').textContent = questions[randomIndex];
}

function saveMemory() {
    const memoryInput = document.getElementById('memoryInput');
    if (memoryInput.value.trim() !== "") {
        let memories = JSON.parse(localStorage.getItem('memories')) || [];
        memories.push(memoryInput.value);
        localStorage.setItem('memories', JSON.stringify(memories));
        displayMemories();
        memoryInput.value = "";
        launchConfetti();
    } else {
        alert("เขียนข้อความก่อนนะ!");
    }
}

function displayMemories() {
    const memoriesList = document.getElementById('memoriesList');
    memoriesList.innerHTML = "";
    let memories = JSON.parse(localStorage.getItem('memories')) || [];
    memories.forEach(memory => {
        const li = document.createElement('li');
        li.textContent = memory;
        memoriesList.appendChild(li);
    });
}

function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// โหลด memories ตอนเปิดเว็บ
displayMemories();

// เล่น/หยุด เพลง
let musicPlaying = true;
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

function toggleMusic() {
    if (musicPlaying) {
        bgMusic.pause();
        musicBtn.textContent = "เปิดเพลง";
    } else {
        bgMusic.play();
        musicBtn.textContent = "ปิดเพลง";
    }
    musicPlaying = !musicPlaying;
}

document.body.addEventListener('click', () => {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic.paused) {
        bgMusic.play().catch(err => {
            console.log("เล่นเพลงไม่สำเร็จ: ", err);
        });
    }
}, { once: true });

