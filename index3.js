const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let stars = [];

const maxStars = 1400;
for (let i = 0; i < maxStars; i++) {
  stars.push({
    x: Math.random() * canvas.width - centerX,
    y: Math.random() * canvas.height - centerY,
    z: Math.random() * canvas.width,
    speed: Math.random() * 0.5 + 0.5
  });
}

function drawStars() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let star of stars) {
    star.z -= star.speed;
    if (star.z <= 0) {
      star.z = canvas.width;
      star.x = Math.random() * canvas.width - centerX;
      star.y = Math.random() * canvas.height - centerY;
    }

    const k = 128 / star.z;
    const sx = star.x * k + centerX;
    const sy = star.y * k + centerY;
    const r = (1 - star.z / canvas.width) * 2;

    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  requestAnimationFrame(drawStars);
}
drawStars();

// Shockwave on click
const shock = document.getElementById("shockwave");
canvas.addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  shock.style.left = `${x}px`;
  shock.style.top = `${y}px`;
  shock.style.opacity = "1";
  shock.style.transform = "translate(-50%, -50%) scale(0)";
  shock.style.transition = "none";

  setTimeout(() => {
    shock.style.transition = "transform 0.6s ease-out, opacity 0.8s";
    shock.style.transform = "translate(-50%, -50%) scale(8)";
    shock.style.opacity = "0";
  }, 10);
});

// Mouse-parallax effect
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelector("#title").style.transform = `translate(${x}px, ${y}px)`;
});
