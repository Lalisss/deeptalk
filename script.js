const questions = [
    "สิ่งที่ทำให้คุณตกหลุมรักฉันคืออะไร?",
    "อะไรคือสิ่งที่คุณอยากทำกับฉันมากที่สุด?",
    "คุณคิดว่าความรักของเราพิเศษยังไง?",
    "ในอนาคตคุณอยากไปเที่ยวที่ไหนกับฉัน?",
    "คุณชอบช่วงเวลาไหนที่สุดที่เราใช้เวลาด้วยกัน?"
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
