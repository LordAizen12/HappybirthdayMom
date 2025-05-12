const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();

window.addEventListener('resize', resize);

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
      o: Math.random()
    });
  }
}
createStars(1000);

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  for (let star of stars) {
    let k = 128.0 / star.z;
    let px = star.x * k + canvas.width / 2;
    let py = star.y * k + canvas.height / 2;

    if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
      let size = (1 - star.z / canvas.width) * 2;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.o})`;
      ctx.fill();
    }

    star.z -= 2;
    if (star.z <= 0) {
      star.z = canvas.width;
    }
  }

  requestAnimationFrame(draw);
}
draw();

// Parallax Text Movement
const mainText = document.getElementById('mainText');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  mainText.style.transform = `translate(${x}px, ${y}px)`;
});
