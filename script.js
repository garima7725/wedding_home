// ===== FLOATING PETALS =====
const petalsContainer = document.getElementById('petalsContainer');
const petals = ['🌸', '🌺', '🌼', '✿', '❀', '🌹'];

function createPetal() {
  const petal = document.createElement('div');
  petal.classList.add('petal');
  petal.textContent = petals[Math.floor(Math.random() * petals.length)];
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.fontSize = (12 + Math.random() * 16) + 'px';
  const duration = 6 + Math.random() * 8;
  petal.style.animationDuration = duration + 's';
  petal.style.animationDelay = Math.random() * 4 + 's';
  petalsContainer.appendChild(petal);
  setTimeout(() => petal.remove(), (duration + 4) * 1000);
}
for (let i = 0; i < 8; i++) setTimeout(createPetal, i * 600);
setInterval(createPetal, 1800);

// ===== LOCAL AUDIO PLAYBACK (Autoplay & Unlock) =====
const bgMusic = document.getElementById('bgMusic');
const musicIndicator = document.getElementById('musicIndicator');

// Attempt to play immediately
function playMusic() {
  if (!bgMusic) return;
  bgMusic.play().then(() => {
    musicIndicator.classList.remove('paused');
    removeUnlockListeners();
  }).catch(err => {
    console.log("Autoplay prevented by browser. Waiting for user interaction.");
    musicIndicator.classList.add('paused');
  });
}

// On first user interaction, play music if it isn't playing
function unlockMusicOnInteraction() {
  if (bgMusic.paused) {
    playMusic();
  }
}

function removeUnlockListeners() {
  document.removeEventListener('click', unlockMusicOnInteraction);
  document.removeEventListener('touchstart', unlockMusicOnInteraction);
  document.removeEventListener('scroll', unlockMusicOnInteraction);
}

document.addEventListener('click', unlockMusicOnInteraction, { once: true });
document.addEventListener('touchstart', unlockMusicOnInteraction, { once: true, passive: true });
document.addEventListener('scroll', unlockMusicOnInteraction, { once: true, passive: true });

// Toggle play/pause when clicking the music indicator
if (musicIndicator) {
  musicIndicator.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent firing the document click
    if (bgMusic.paused) {
      bgMusic.play();
      musicIndicator.classList.remove('paused');
    } else {
      bgMusic.pause();
      musicIndicator.classList.add('paused');
    }
  });
}

// Run initial attempt
playMusic();


// ===== COUNTDOWN TIMER =====
function updateCountdown() {
  const weddingDate = new Date('2026-04-19T18:15:00+05:30').getTime();
  const now = new Date().getTime();
  const diff = weddingDate - now;

  if (diff < 0) {
    document.getElementById('days').textContent  = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('mins').textContent  = '00';
    document.getElementById('secs').textContent  = '00';
    return;
  }

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent  = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('mins').textContent  = String(mins).padStart(2, '0');
  document.getElementById('secs').textContent  = String(secs).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);


// ===== INTERSECTION OBSERVER (scroll animations) =====
const fadeElements = document.querySelectorAll(
  '.mantra-card, .person-card, .event-card, .venue-card, .contact-card, ' +
  '.ladies-note, .section-header, .family-group-card, .family-pair-card, ' +
  '.swagat-chip, .uttara-card, .darshan-pair'
);

fadeElements.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.10 });

fadeElements.forEach(el => observer.observe(el));


// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
