import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAL3q1-YHEVlqcSTHTPmUBdt6XSpVZ03as",
  authDomain: "data-c97a7.firebaseapp.com",
  projectId: "data-c97a7",
  storageBucket: "data-c97a7.firebasestorage.app",
  messagingSenderId: "228062717937",
  appId: "1:228062717937:web:7b93b469e700e4112e0650"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const messagesDiv = document.getElementById("messages");
const optionsDiv = document.getElementById("options");
const inputArea = document.getElementById("inputArea");
const msgInput = document.getElementById("msgInput");
const sendBtn = document.getElementById("sendBtn");

let step = 0;

const questions = [
  { q: "How is the website?", options: ["Good", "Super", "Add more options"] },
  { q: "Give us rating (1-5)", options: ["1", "2", "3", "4", "5"] },
  { q: "What do you want to do?", options: ["Chat with my partner", "Give a complaint"] }
];

function addMessage(text, type = "bot") {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.textContent = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Floating Hearts
function createHeart() {
  const hearts = ["Red Heart","Sparkling Heart","White Heart","Growing Heart","Revolving Hearts","Heart Suit"];
  const h = document.createElement("div");
  h.className = "heart-float";
  h.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.animationDelay = Math.random() * 10 + "s";
  h.style.animationDuration = (Math.random() * 12 + 15) + "s";
  document.querySelector(".hearts-bg").appendChild(h);
  setTimeout(() => h.remove(), 30000);
}
setInterval(createHeart, 800);

function ask() {
  const q = questions[step];
  addMessage(q.q, "bot");

  optionsDiv.innerHTML = "";
  q.options.forEach((opt) => {
    const btn = document.createElement("div");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(opt);
    optionsDiv.appendChild(btn);
  });
}

function handleAnswer(answer) {
  addMessage(answer, "user");

  if (step === 0) addMessage("Thank you for your feedback!", "bot");
  else if (step === 1) {
    const rating = parseInt(answer);
    addMessage(rating >= 4 ? "Yay! I'm so happy!" : "Thanks! I'll improve", "bot");
  } else if (step === 2) {
    if (answer === "Chat with my partner") {
      setTimeout(unlockChat, 1500);
      return;
    } else {
      addMessage("Please type your complaint:", "bot");
      inputArea.style.display = "flex";
      msgInput.placeholder = "Type your complaint...";
      msgInput.focus();
      sendBtn.onclick = () => {
        const complaint = msgInput.value.trim();
        if (!complaint) return;
        addMessage(complaint, "user");
        msgInput.value = "";
        addMessage("Thank you! I'll fix it soon", "bot");
        setTimeout(unlockChat, 2000);
      };
      return;
    }
  }

  step++;
  if (step < questions.length) setTimeout(ask, 1500);
  else setTimeout(unlockChat, 1800);
}

function unlockChat() {
  addMessage("Welcome to our secret place!", "bot");
  addMessage("Happy Birthday anupama... I love you forever", "bot");

  confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
  setTimeout(() => confetti({ particleCount: 300, angle: 60, spread: 100, origin: { x: 0 } }), 600);
  setTimeout(() => confetti({ particleCount: 300, angle: 120, spread: 100, origin: { x: 1 } }), 1200);

  inputArea.style.display = "flex";
  msgInput.placeholder = "Say anything to me...";
  msgInput.focus();

  sendBtn.onclick = () => {
    const text = msgInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    msgInput.value = "";
    setTimeout(() => addMessage("I love you more than anything"), 1200);
  };
}

// Start
createHeart(); createHeart(); createHeart();
setTimeout(ask, 1000);