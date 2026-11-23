'use strict';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('#motion');
const status = document.querySelector('#status');
const stage = document.querySelector('#headline-stage');
const headline = document.querySelector('#headline-sample');
const closer = document.querySelector('#closer');
const gothic = document.querySelector('#gothic-sample');
const figureRoot = document.querySelector('#figures');
const easeOut = 'cubic-bezier(0.23, 1, 0.32, 1)';
const easeInOut = 'cubic-bezier(0.77, 0, 0.175, 1)';
const active = new Set();
let motionEnabled = !reducedMotion.matches;
let closeAnimation = null;
let rollAnimations = [];
let ghost = null;
let closeWanted = false;
let closeVisible = false;
let figuresVisible = false;
let staticZoom = false;
let closeHasRun = false;

function animate(element, frames, options) {
  const animation = element.animate(frames, options);
  active.add(animation);
  animation.finished.then(() => active.delete(animation), () => active.delete(animation));
  return animation;
}

function stopClose() {
  closeAnimation?.cancel();
  closeAnimation = null;
  headline.style.transform = '';
  staticZoom = false;
  stage.classList.remove('is-studying');
}

function closeTransform() {
  const box = stage.getBoundingClientRect();
  const line = headline.getBoundingClientRect();
  const word = document.querySelector('#close-word').getBoundingClientRect();
  const zoom = box.width < 700 ? 1.65 : 2.65;
  const x = box.width / 2 - ((word.left - line.left) + word.width / 2) * zoom;
  const y = box.height / 2 - ((word.top - line.top) + word.height / 2) * zoom;
  return `translate(${x}px, ${y}px) scale(${zoom})`;
}

function startClose() {
  if (closeAnimation || staticZoom) return;
  const zoomed = closeTransform();
  stage.classList.add('is-studying');
  closeHasRun = true;
  // Hold the complete line between studies so visitors have time to read it.
  closeAnimation = animate(headline, [
    { transform: 'translate(0, 0) scale(1)', offset: 0 },
    { transform: 'translate(0, 0) scale(1)', offset: .18 },
    { transform: zoomed, offset: .4 },
    { transform: zoomed, offset: .62 },
    { transform: 'translate(0, 0) scale(1)', offset: .84 },
    { transform: 'translate(0, 0) scale(1)', offset: 1 }
  ], { duration: 7200, easing: easeInOut, iterations: Infinity });
}

figureRoot.textContent = '';
const strips = Array.from({ length: 10 }, (_, digit) => {
  const window = document.createElement('span');
  window.className = 'digit-window';
  window.setAttribute('aria-hidden', 'true');
  const strip = document.createElement('span');
  strip.className = 'digit-strip';
  for (let step = 0; step <= 10; step++) {
    const number = document.createElement('span');
    number.textContent = String((digit + step) % 10);
    strip.append(number);
  }
  window.append(strip);
  figureRoot.append(window);
  return strip;
});

function stopFigures() {
  rollAnimations.forEach(animation => animation.cancel());
  rollAnimations = [];
}

function startFigures() {
  if (rollAnimations.length) return;
  // The first and last digits match, so the loop returns without a visual jump.
  rollAnimations = strips.map((strip, index) => animate(strip, [
    { transform: 'translateY(0)', offset: 0 },
    { transform: 'translateY(0)', offset: .15 },
    { transform: 'translateY(-90.90909%)', offset: .5 },
    { transform: 'translateY(-90.90909%)', offset: 1 }
  ], { duration: 4200, delay: index * 65, easing: easeInOut, iterations: Infinity }));
}

function updateLabels() {
  const studying = closeWanted && motionEnabled;
  closer.textContent = staticZoom ? 'Return to the line' : studying ? 'Pause close-up' : closeHasRun ? 'Resume close-up' : 'Look closer';
  closer.setAttribute('aria-pressed', String(studying || staticZoom));
  motionButton.textContent = motionEnabled ? 'Motion on' : 'Motion off';
  motionButton.setAttribute('aria-pressed', String(motionEnabled));
  document.body.dataset.motion = motionEnabled ? 'on' : 'off';
}

function syncMotion() {
  const canPlay = motionEnabled && !document.hidden;
  if (canPlay && closeWanted && closeVisible) startClose();
  else if (closeAnimation) stopClose();
  if (canPlay && figuresVisible) startFigures();
  else stopFigures();
  updateLabels();
}

function setMotion(enabled) {
  motionEnabled = enabled;
  if (!enabled) {
    for (const animation of active) animation.cancel();
    active.clear();
    stopClose();
    stopFigures();
    ghost?.remove();
    ghost = null;
  }
  syncMotion();
}

motionButton.addEventListener('click', () => {
  setMotion(!motionEnabled);
  status.textContent = motionEnabled ? 'Motion enabled.' : 'Motion disabled.';
});
reducedMotion.addEventListener('change', () => setMotion(!reducedMotion.matches));
updateLabels();

closer.addEventListener('click', event => {
  if (closeWanted || staticZoom) {
    closeWanted = false;
    stopClose();
  } else if (!motionEnabled || event.detail === 0) {
    headline.style.transform = closeTransform();
    staticZoom = true;
    stage.classList.add('is-studying');
    status.textContent = 'Static close-up of Kip Headline. Select Return to the line to restore the full specimen.';
  } else {
    closeWanted = true;
  }
  syncMotion();
});

// Crossfade between the actual static files. Weight selection remains under user control.
document.querySelectorAll('[data-weight]').forEach(button => {
  button.addEventListener('click', event => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    const oldWeight = getComputedStyle(gothic).fontWeight;
    ghost?.remove();
    gothic.getAnimations().forEach(animation => animation.cancel());
    document.querySelectorAll('[data-weight]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    gothic.style.fontWeight = button.dataset.weight;
    status.textContent = `Kip Gothic ${button.textContent}, weight ${button.dataset.weight}.`;
    if (!motionEnabled || event.detail === 0) return;
    ghost = gothic.cloneNode(true);
    ghost.removeAttribute('id');
    ghost.setAttribute('aria-hidden', 'true');
    ghost.classList.add('gothic-ghost');
    ghost.style.fontWeight = oldWeight;
    gothic.parentElement.append(ghost);
    const thisGhost = ghost;
    animate(gothic, [{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: easeOut });
    const fade = animate(thisGhost, [{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: easeOut });
    fade.finished.then(() => thisGhost.remove(), () => thisGhost.remove());
  });
});

document.fonts.ready.then(() => {
  if (motionEnabled && !document.hidden) {
    headline.querySelectorAll('.headline-word').forEach((word, index) => animate(word, [
      { transform: 'translateY(18%)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ], { duration: 650, delay: index * 45, easing: easeOut, fill: 'backwards' }));
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.target === stage) closeVisible = entry.isIntersecting;
      if (entry.target === figureRoot) figuresVisible = entry.isIntersecting;
    }
    syncMotion();
  }, { threshold: .25 });
  observer.observe(stage);
  observer.observe(figureRoot);
});

document.addEventListener('visibilitychange', syncMotion);
window.addEventListener('resize', () => {
  if (closeAnimation || staticZoom) stopClose();
  syncMotion();
});
