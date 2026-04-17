const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 100;
const mouse = { x: null, y: null };

window.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// Particle class
class Particle {
  constructor(x, y, size, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x + this.size > canvas.width || this.x - this.size < 0) this.speedX *= -1;
    if (this.y + this.size > canvas.height || this.y - this.size < 0) this.speedY *= -1;

    if (mouse.x && mouse.y) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        this.x += dx / distance * 2;
        this.y += dy / distance * 2;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Initialize particles
function initParticles() {
  particles.length = 0;
  for (let i = 0; i < numParticles; i++) {
    const size = Math.random() * 3 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 0.8;
    const speedY = (Math.random() - 0.5) * 0.8;
    const color = `rgba(255,255,255,${Math.random() * 0.7 + 0.3})`;
    particles.push(new Particle(x, y, size, color, speedX, speedY));
  }
}

// Connect particles
function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        ctx.strokeStyle = `rgba(255,255,255,${1 - distance / 120})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

// Animate
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

initParticles();
animate();
