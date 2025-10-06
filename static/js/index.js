

// Get path lengths for electricity animation
// ------------------------------------------
const paths = document.querySelectorAll('.pulse');
let cumulativeDelay = 0;

paths.forEach((path, i) => {
  // measure real path length
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  // assign delays in grouped bursts
  // 4-5 paths close together, then longer break
  let groupIndex = Math.floor(i / 5);
  let inGroupIndex = i % 5;
  let shortDelay = 0.1;       // short delay between lines in a group
  let longBreak = 1.5;        // longer delay between groups

  cumulativeDelay += inGroupIndex === 0 && i !== 0 ? longBreak : shortDelay;
  path.style.setProperty('--delay', `${cumulativeDelay}s`);
});


// Scrolling animation
// -------------------
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
const featured = document.querySelector('.featured');

// get initial position relative to viewport
let initialX, initialY;

// function to calculate initial position relative to the hero
function setInitialPosition() {
  const rect = heroContent.getBoundingClientRect();
  const heroRect = hero.getBoundingClientRect();
  initialX = rect.left - heroRect.left;
  initialY = rect.top - heroRect.top;
}

// set initial position once at page load
setInitialPosition();

// also recalc on resize
window.addEventListener('resize', setInitialPosition);

window.addEventListener('scroll', () => {
  const heroRect = hero.getBoundingClientRect();
  const heroHeight = heroRect.height;

  if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
    const scrollPercent = Math.min(Math.max(-heroRect.top / heroHeight, 0), 1);

    // featured moves out quickly
    featured.style.transform = `translateX(${scrollPercent * 800}%)`;

    // calculate target translations relative to initial position
    const targetX = Math.min(scrollPercent * 3000, initialX - 50);  // max 2px from left
    const targetY = Math.min(scrollPercent * 700, heroHeight - initialY - heroContent.offsetHeight - 20); // max 2px from bottom

    heroContent.style.transform = `translateY(${targetY}px)`;
  }
});