// Safe Parallax & Scroll Reveal
document.addEventListener("DOMContentLoaded", () => {
  const heroImg = document.querySelector('.hero-img');
  const rightPanel = document.querySelector('.right-panel');

  // Parallax
  if (heroImg && rightPanel) {
    rightPanel.addEventListener('scroll', () => {
      const scrollTop = rightPanel.scrollTop;
      const speed = parseFloat(heroImg.dataset.speed) || 0.7;
      heroImg.style.transform = `translateY(${scrollTop * speed}px)`;
    });
  }

  // Scroll Reveal
  const gridItems = document.querySelectorAll('.grid-item-new');
  function reveal() {
    gridItems.forEach(item => {
      if (item.getBoundingClientRect().top < window.innerHeight - 100) {
        item.classList.add('visible');
      }
    });
  }
  if (rightPanel) {
    rightPanel.addEventListener('scroll', reveal);
  }
  window.addEventListener('load', reveal);

  // Scratch Card
  const canvas = document.getElementById("canvas");
  if (!canvas) return; // Prevent error if not on this page

  const ctx = canvas.getContext("2d");
  const SIZE = 320;

  ctx.fillStyle = "#A349A4";
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.font = "bold 26px Roboto";
  ctx.fillStyle = "#F8B400";
  ctx.textAlign = "center";
  ctx.fillText("SCRATCH ME", SIZE/2, SIZE/2 - 20);
  ctx.fillText("WITH LOVE", SIZE/2, SIZE/2 + 20);

  let scratching = false;
  const scratchCard = document.getElementById("scratchCard");

  canvas.addEventListener("mousedown", () => scratching = true);
  canvas.addEventListener("mouseup", () => scratching = false);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("touchstart", e => { scratching = true; draw(e.touches[0]); });
  canvas.addEventListener("touchmove", e => { e.preventDefault(); draw(e.touches[0]); });
  canvas.addEventListener("touchend", () => scratching = false);

  function draw(e) {
    if (!scratching) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();

    if (isScratched()) {
      setTimeout(() => document.getElementById("giftReveal").style.display = "flex", 1000);
    }
  }

  function isScratched() {
    const data = ctx.getImageData(0,0,SIZE,SIZE).data;
    let count = 0;
    for (let i = 3; i < data.length; i += 12) {
      if (data[i] < 100) count++;
    }
    return count > 6000;
  }
});

// Modal Functions
function openDelivery() {
  document.getElementById("giftReveal").style.display = "none";
  document.getElementById("deliveryModal").style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

function goToLogin() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "/";
  }
}

// Form Submit
const form = document.getElementById("addressForm");
if (form) {
  form.onsubmit = (e) => {
    e.preventDefault();
    alert("Gift is on the way with all my love! I'll deliver it personally");
    closeModal("deliveryModal");
  };
}