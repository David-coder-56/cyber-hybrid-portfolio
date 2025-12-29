const toggleBtn = document.getElementById("theme-toggle");
const root = document.documentElement;

// theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  toggleBtn.innerHTML = savedTheme === "dark" ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

toggleBtn.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  toggleBtn.innerHTML = newTheme === "dark" ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  initBackground();
});

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.querySelectorAll('#nav-links ul li a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

// Slide-in animations
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".slide-in");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});

// -----------------------
// Background animation
// -----------------------
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

function initBackground() {
  const theme = root.getAttribute("data-theme");
  particles = [];
  for(let i=0;i<100;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      size: Math.random()*3+1,
      dx: (Math.random()-0.5)*0.5,
      dy: (Math.random()-0.5)*0.5,
      color: theme === "dark" ? "#fff" : `hsl(${Math.random()*360}, 70%, 60%)`,
      twinkle: Math.random()
    });
  }
}
initBackground();

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const theme = root.getAttribute("data-theme");
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = theme === "dark" ? p.twinkle : 1;
    ctx.fill();
    ctx.globalAlpha = 1;
    p.x += p.dx;
    p.y += p.dy;

    if(p.x<0||p.x>canvas.width) p.dx*=-1;
    if(p.y<0||p.y>canvas.height) p.dy*=-1;
  });
  requestAnimationFrame(animate);
}
animate();

// PROJECT MODAL LOGIC
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');

const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const modalLink = document.getElementById('modalLink');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.textContent = card.dataset.title;
    modalDescription.textContent = card.dataset.description;
    modalTech.textContent = card.dataset.tech;
    modalLink.href = card.dataset.link;

    modal.classList.add('show');
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});

