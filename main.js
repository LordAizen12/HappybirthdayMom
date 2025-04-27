document.addEventListener('DOMContentLoaded', () => {
    const birthdayMessage = document.getElementById('birthdayMessage');
    const messages = [
        'Happy Birthday, Mom!',
        'You’re a Superstar!',
        'Forever Our Queen!',
        'We Adore You!'
    ];
    let currentMessage = 0;

    setInterval(() => {
        birthdayMessage.style.opacity = 0;
        setTimeout(() => {
            birthdayMessage.textContent = messages[currentMessage];
            birthdayMessage.style.opacity = 1;
            currentMessage = (currentMessage + 1) % messages.length;
        }, 600);
    }, 3500);

    const partyButton = document.getElementById('partyButton');
    partyButton.addEventListener('click', () => {
        confetti({
            particleCount: 250,
            spread: 120,
            origin: { y: 0.3 },
            colors: ['#ff00ff', '#00ffcc', '#ffcc00', '#ff0066', '#00ccff'],
            shapes: ['star', 'circle']
        });
    });

    const giftBox = document.getElementById('giftBox');
    giftBox.addEventListener('click', () => {
        giftBox.style.animation = 'popGift 0.6s ease';
        confetti({
            particleCount: 100,
            spread: 60,
            origin: { y: 0.5 },
            colors: ['#ffcc00', '#00ffcc', '#ff0066']
        });
        setTimeout(() => {
            giftBox.style.animation = 'spinGift 4s ease-in-out infinite';
        }, 600);
    });
});