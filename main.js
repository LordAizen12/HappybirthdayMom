// Toggle music
function toggleMusic() {
    const music = document.getElementById('birthdayMusic');
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

// Start celebration
function startCelebration() {
    const surprise = document.getElementById('surprise');
    surprise.classList.toggle('hidden');
    launchConfetti();
}

// Confetti Effect
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'];

    for (let i = 0; i < 300; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 5 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((c) => {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
            ctx.fillStyle = c.color;
            ctx.fill();

            c.y += c.speed;
            if (c.y > canvas.height) {
                c.y = -c.size;
            }
        });

        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();
}

// Make it responsive
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
