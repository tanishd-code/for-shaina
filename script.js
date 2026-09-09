/* ==========================================================================
   ROMANTIC WEBSITE FOR SHAINA - JAVASCRIPT
   Crafted with love by Tanish Dhiman
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initFloatingHeartsCanvas();
  initAnniversaryCounter();
  initLoveLetter();
  initReasonsGenerator();
  initPlayfulProposal();
  initMusicPlayer();
});

/* --------------------------------------------------------------------------
   1. Floating Hearts Canvas Animation + Click Spawner
   -------------------------------------------------------------------------- */
function initFloatingHeartsCanvas() {
  const canvas = document.getElementById('heartCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const hearts = [];
  const heartColors = [
    'rgba(255, 75, 139, 0.45)',
    'rgba(255, 117, 140, 0.4)',
    'rgba(255, 182, 193, 0.5)',
    'rgba(244, 143, 177, 0.45)',
    'rgba(230, 57, 70, 0.35)'
  ];

  class FloatingHeart {
    constructor(x, y, size, speedY, color) {
      this.x = x || Math.random() * width;
      this.y = y || height + Math.random() * 50;
      this.size = size || Math.random() * 14 + 10;
      this.speedY = speedY || Math.random() * 0.9 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.opacity = Math.random() * 0.7 + 0.3;
      this.color = color || heartColors[Math.floor(Math.random() * heartColors.length)];
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y < -30) {
        this.y = height + 20;
        this.x = Math.random() * width;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      const topCurveHeight = this.size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(
        -this.size / 2, -this.size / 2,
        -this.size, topCurveHeight / 3,
        0, this.size
      );
      // top right curve
      ctx.bezierCurveTo(
        this.size, topCurveHeight / 3,
        this.size / 2, -this.size / 2,
        0, topCurveHeight
      );
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  // Initial batch of hearts
  const heartCount = Math.min(Math.floor(width / 35), 35);
  for (let i = 0; i < heartCount; i++) {
    hearts.push(new FloatingHeart(Math.random() * width, Math.random() * height));
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < hearts.length; i++) {
      hearts[i].update();
      hearts[i].draw();
    }
    requestAnimationFrame(animate);
  }
  animate();

  // Click anywhere to spawn mini bursting hearts
  window.addEventListener('click', (e) => {
    // Avoid interfering if clicked inside interactive buttons
    if (e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.tagName === 'A') {
      return;
    }
    for (let i = 0; i < 6; i++) {
      const burstHeart = new FloatingHeart(
        e.clientX + (Math.random() - 0.5) * 20,
        e.clientY + (Math.random() - 0.5) * 20,
        Math.random() * 10 + 8,
        Math.random() * 2 + 1
      );
      hearts.push(burstHeart);
      if (hearts.length > 50) hearts.shift();
    }
  });
}

/* --------------------------------------------------------------------------
   2. Interactive Love Letter (Envelope)
   -------------------------------------------------------------------------- */
function initLoveLetter() {
  const envelope = document.getElementById('envelope');
  const waxSeal = document.getElementById('waxSeal');
  const envelopeHint = document.getElementById('envelopeHint');

  if (!envelope) return;

  const toggleEnvelope = () => {
    const isOpened = envelope.classList.toggle('opened');
    if (envelopeHint) {
      envelopeHint.textContent = isOpened ? '💌 Click envelope to fold letter back' : '✨ Click the seal to open';
    }
    if (isOpened && typeof confetti === 'function') {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.6 }
      });
    }
  };

  if (waxSeal) waxSeal.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleEnvelope();
  });

  envelope.addEventListener('click', toggleEnvelope);
}

/* --------------------------------------------------------------------------
   3. Reasons Why I Love You Generator
   -------------------------------------------------------------------------- */
const reasonsList = [
  {
    icon: '🌸',
    text: "The way your eyes light up whenever you talk about things you love."
  },
  {
    icon: '☀️',
    text: "How you effortlessly turn my worst days into moments filled with warmth and calm."
  },
  {
    icon: '✨',
    text: "Your radiant kindness and the gentle, caring soul you share with everyone."
  },
  {
    icon: '💫',
    text: "Your voice is my favorite comfort; just hearing you makes everything feel alright."
  },
  {
    icon: '🥰',
    text: "The sweet, adorable way you laugh when something genuinely catches you off guard."
  },
  {
    icon: '🍀',
    text: "How lucky I feel every single day just having you by my side as my partner."
  },
  {
    icon: '🌙',
    text: "That you are the first thought on my mind in the morning and the last one before I sleep."
  },
  {
    icon: '💖',
    text: "Your intelligence, your ambition, and how inspiring you are without even trying."
  },
  {
    icon: '🧸',
    text: "How safe, understood, and truly at home I feel whenever I am with you."
  },
  {
    icon: '🎀',
    text: "The little cute expressions you make that always melt my entire heart."
  },
  {
    icon: '🌟',
    text: "Simply because you are Shaina—unique, irreplaceable, and the girl of my dreams."
  }
];

function initReasonsGenerator() {
  const reasonCard = document.getElementById('reasonCard');
  const reasonNumber = document.getElementById('reasonNumber');
  const reasonIcon = document.getElementById('reasonIcon');
  const reasonText = document.getElementById('reasonText');
  const nextBtn = document.getElementById('nextReasonBtn');

  if (!nextBtn || !reasonCard) return;

  let currentIndex = 0;

  nextBtn.addEventListener('click', () => {
    // Soft bounce transition
    reasonCard.classList.add('animating');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % reasonsList.length;
      const current = reasonsList[currentIndex];

      reasonNumber.textContent = `#${currentIndex + 1}`;
      reasonIcon.textContent = current.icon;
      reasonText.textContent = current.text;

      reasonCard.classList.remove('animating');

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 15,
          scalar: 0.8,
          spread: 35,
          colors: ['#ff4b8b', '#ff758c', '#ffd166']
        });
      }
    }, 250);
  });
}

/* --------------------------------------------------------------------------
   4. Playful "Will You Always Be Mine?" Interactive Section
   -------------------------------------------------------------------------- */
function initPlayfulProposal() {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const celebrationContainer = document.getElementById('celebrationContainer');
  const btnGroup = document.getElementById('btnGroup');

  if (!yesBtn || !noBtn) return;

  // The evasive "No" button!
  const playfulPhrases = [
    'No 🙈',
    'Are you sure? 🥺',
    'Try again! 😜',
    'Nope! 💕',
    'Cant touch this! ✨',
    'Yes is right there! 👉',
    'Nice try Shaina! 😂'
  ];
  let phraseIndex = 0;

  const moveNoButton = () => {
    const card = noBtn.closest('.question-card');
    if (!card) return;

    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate maximum displacement inside the card boundaries
    const maxX = (cardRect.width / 2) - btnRect.width - 20;
    const maxY = 90;

    const randomX = (Math.random() * 2 - 1) * maxX;
    const randomY = (Math.random() * 2 - 1) * maxY;

    noBtn.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    phraseIndex = (phraseIndex + 1) % playfulPhrases.length;
    noBtn.textContent = playfulPhrases[phraseIndex];
  };

  noBtn.addEventListener('mouseenter', moveNoButton);
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
  });
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
  });

  // The "Yes" celebration
  yesBtn.addEventListener('click', () => {
    if (btnGroup) btnGroup.style.display = 'none';
    if (celebrationContainer) celebrationContainer.style.display = 'block';

    // Massive celebration confetti cannons!
    if (typeof confetti === 'function') {
      const end = Date.now() + 3.5 * 1000;
      const colors = ['#ff4b8b', '#ff758c', '#ffccd5', '#ffd166', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  });
}

/* --------------------------------------------------------------------------
   5. Anniversary Counter (Since June 14, 2026)
   -------------------------------------------------------------------------- */
function initAnniversaryCounter() {
  // Anniversary: June 14, 2026
  const anniversaryDate = new Date('2026-06-14T00:00:00');
  const daysEl = document.getElementById('countDays');
  const hoursEl = document.getElementById('countHours');
  const minsEl = document.getElementById('countMinutes');
  const secsEl = document.getElementById('countSeconds');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function update() {
    const now = new Date();
    const diff = Math.max(0, now - anniversaryDate);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   6. Music Player: Arctic Monkeys - "I Wanna Be Yours" Atmosphere
   -------------------------------------------------------------------------- */
function initMusicPlayer() {
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicStatus = document.getElementById('musicStatus');
  const playSongBtn = document.getElementById('playSongBtn');
  const songPlayIcon = document.getElementById('songPlayIcon');
  const songPlayText = document.getElementById('songPlayText');
  const vinylRecord = document.getElementById('vinylRecord');
  const localAudio = document.getElementById('localAudio');

  let isPlaying = false;
  let audioCtx = null;
  let intervalId = null;

  // "I Wanna Be Yours" iconic moody chord frequencies (C minor, Ab, Fm, G)
  // Low synth bass + guitar chime arpeggio (BPM ~67, slow sensual indie beat)
  const iwbyProgression = [
    // C minor bar
    { bass: 130.81, arpeg: [261.63, 311.13, 392.00, 311.13] }, // C3 -> C4, Eb4, G4, Eb4
    // Ab major bar
    { bass: 103.83, arpeg: [207.65, 261.63, 311.13, 261.63] }, // Ab2 -> Ab3, C4, Eb4, C4
    // F minor bar
    { bass: 87.31,  arpeg: [174.61, 207.65, 261.63, 207.65] }, // F2 -> F3, Ab3, C4, Ab3
    // G dominant bar
    { bass: 98.00,  arpeg: [196.00, 246.94, 293.66, 246.94] }  // G2 -> G3, B3, D4, B3
  ];

  function playTone(freq, type, duration, volume) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(type === 'triangle' ? 450 : 1800, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.log('Audio tone error', e);
    }
  }

  function startMelody() {
    // Check if local MP3 is available and plays
    if (localAudio && localAudio.src && localAudio.src.endsWith('.mp3')) {
      localAudio.play().then(() => {
        setPlayingState(true);
        return;
      }).catch(() => {
        // Fallback to custom ambient synth
        startSynth();
      });
    } else {
      startSynth();
    }
  }

  function startSynth() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    setPlayingState(true);

    let chordIdx = 0;
    let noteIdx = 0;

    // 440ms eighth-note tempo
    intervalId = setInterval(() => {
      const currentChord = iwbyProgression[chordIdx];
      
      // On the first beat of each chord, play the deep warm bass
      if (noteIdx === 0) {
        playTone(currentChord.bass, 'triangle', 1.8, 0.14);
      }

      // Play the guitar/keyboard arpeggio note
      playTone(currentChord.arpeg[noteIdx], 'sine', 0.9, 0.08);

      noteIdx++;
      if (noteIdx >= currentChord.arpeg.length) {
        noteIdx = 0;
        chordIdx = (chordIdx + 1) % iwbyProgression.length;
      }
    }, 440);
  }

  function setPlayingState(playing) {
    isPlaying = playing;
    if (playing) {
      if (musicToggleBtn) musicToggleBtn.classList.add('playing');
      if (musicStatus) musicStatus.textContent = 'Pause Music';
      if (songPlayIcon) songPlayIcon.textContent = '⏸️';
      if (songPlayText) songPlayText.textContent = 'Pause Melodic Vibe';
      if (vinylRecord) vinylRecord.classList.add('spinning');
    } else {
      if (musicToggleBtn) musicToggleBtn.classList.remove('playing');
      if (musicStatus) musicStatus.textContent = 'I Wanna Be Yours';
      if (songPlayIcon) songPlayIcon.textContent = '▶️';
      if (songPlayText) songPlayText.textContent = 'Play Melodic Vibe';
      if (vinylRecord) vinylRecord.classList.remove('spinning');
    }
  }

  function stopMelody() {
    setPlayingState(false);
    if (intervalId) clearInterval(intervalId);
    if (localAudio && !localAudio.paused) {
      localAudio.pause();
    }
  }

  function toggleAudio() {
    if (isPlaying) {
      stopMelody();
    } else {
      startMelody();
    }
  }

  if (musicToggleBtn) musicToggleBtn.addEventListener('click', toggleAudio);
  if (playSongBtn) playSongBtn.addEventListener('click', toggleAudio);
  if (vinylRecord) vinylRecord.addEventListener('click', toggleAudio);
}
