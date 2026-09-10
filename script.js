const songs = [
    { 
        title: "Shape Of My Heart", 
        artist: "Backstreet Boys", 
        src: "https://videotourl.com/audio/1789000165093-d8347254-2ca2-4aab-9df6-4dbc83405ddc.mp3"
    },
    { 
        title: "Can't Help Fall In Love", 
        artist: "Elvis Presley", 
        src: "https://videotourl.com/audio/1789000314537-52d49c9d-3189-4d87-a217-941559c12ff9.mp3"
    },
    { 
        title: "Stand By Me", 
        artist: "Oasis", 
        src: "https://videotourl.com/audio/1789000415388-f01aa450-483a-476f-af6d-4d10d94b3277.mp3"
    }
];
let currentSongIndex = 0;
let pinCode = "";
let isPlaying = false;
const targetPin = "110911";
const flowerEmojis = ['🌼', '🌸', '🌷', '🌹', '🌻', '💐'];

const flowerMessages = {
    '🌼': "“Like a daisy, may you always find a reason to bloom, even on ordinary days.”",
    '🌻': "“May you always turn toward the light, and may happiness always find its way to you.”",
    '🌹': "“A reminder that beautiful things take time to bloom, and you are one of them.”",
    '🌸': "“May every new chapter of your life be as beautiful, gentle, and unforgettable as spring.”",
    '🌷': "“A little bouquet for someone who deserves a world full of beautiful things.”",
    '💐': "“A little bouquet for someone who deserves a world full of beautiful things.”"
};

function inputPin(num) {
    if (pinCode.length < 6) {
        pinCode += num;
        updatePinDisplay();
        if (pinCode.length === 6) {
            setTimeout(() => {
                if (pinCode === targetPin) goToScreen('screen-gift');
                else { alert("Kode salah!"); resetPin(); }
            }, 200);
        }
    }
}
function removePin() { pinCode = pinCode.slice(0, -1); updatePinDisplay(); }
function resetPin() { pinCode = ""; updatePinDisplay(); }
function updatePinDisplay() {
    const dots = document.querySelectorAll('.pin-dot');
    dots.forEach((dot, i) => i < pinCode.length ? dot.classList.add('filled') : dot.classList.remove('filled'));
}

function goToScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    if (id === 'screen-gift') {
        setTimeout(() => {
            goToScreen('screen-main');
            startMusicPlayer();
            triggerModal();
            spawnBackgroundFlowers();
            initScrollAnimation();
            setTimeout(startTypingEffect, 1500);
        }, 2000);
    }
}

function openGift() {
    const giftScreen = document.getElementById('screen-gift');
    giftScreen.classList.add('clicked');
    
    setTimeout(() => {
        goToScreen('screen-main');
        startMusicPlayer();
        triggerModal();
        spawnBackgroundFlowers();
        initScrollAnimation();
        setTimeout(startTypingEffect, 1500);
    }, 1200);
}

function spawnFlowers() {
    const bouquetArea = document.getElementById('bouquet-area');
    bouquetArea.innerHTML = ''; 

    const stemPositions = [
        { left: 50, bottom: 55 },
        { left: 30, bottom: 40 },
        { left: 70, bottom: 40 },
        { left: 20, bottom: 20 },
        { left: 80, bottom: 20 }
    ];

    for (let i = 0; i < 6; i++) {
        const btn = document.createElement('div');
        btn.className = 'digital-flower';
        const emoji = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        btn.textContent = emoji;
        btn.dataset.emoji = emoji;
        
        btn.style.left = Math.random() * 80 + '%';
        btn.style.top = Math.random() * 80 + '%';
        
        btn.onclick = function(e) {
            e.stopPropagation();
            const target = stemPositions[Math.floor(Math.random() * stemPositions.length)];
            
            btn.style.left = target.left + '%';
            btn.style.top = 'auto';
            btn.style.bottom = target.bottom + '%';
            btn.classList.add('placed');
            
            const msgBox = document.getElementById('flower-message-box');
            msgBox.innerHTML = `<span class="glow">✦</span> ${flowerMessages[emoji] || flowerMessages['🌷']} <span class="glow">✦</span>`;
            msgBox.classList.add('show');
            
            setTimeout(() => {
                msgBox.classList.remove('show');
            }, 5000);
        };
        
        bouquetArea
