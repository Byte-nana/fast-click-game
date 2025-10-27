'use strict';

const playBtn = document.querySelector('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');
const timer = document.querySelector('.timer');
const main = document.querySelector('.main');
const carrotCounter = document.querySelector('.carrot-counter');

playBtn.addEventListener('click', () => {
  //display pause btn
  playBtn.classList.add('pause');
  pauseBtn.classList.remove('pause');
  // how to remove delay?
  //Show bugs and carrots
  let carrorCount = 12;
  createCarrots(carrorCount);
  let bugCount = 20;
  createBugs(bugCount);
  //Timer Start
  let totalSecs = 10;
  startTimer(totalSecs);
  const countdown = setInterval(() => {
    totalSecs--;
    startTimer(totalSecs, countdown);
  }, 1000);
  //Show carror count
  carrotCounter.innerHTML = carrorCount;
});

// Timer function
function startTimer(totalSecs, countdown) {
  if (totalSecs < 0) return;

  const minutes = Math.floor(totalSecs / 60);
  const seconds = totalSecs - minutes * 60;

  timer.innerHTML = `${String(minutes).padStart(2, '0')} : ${String(
    seconds
  ).padStart(2, '0')}`;

  if (totalSecs <= 0) {
    clearInterval(countdown);
    // show notification
  }
}
const game = document.querySelector('.game-window');
const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;
const VisibleGameWidth = game.offsetWidth;
const visibleGameHeight = game.offsetHeight - headerHeight;

// Making Carrorts
function createCarrots(carrorCount) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < carrorCount; i++) {
    const carrot = document.createElement('img');
    carrot.setAttribute('class', 'carrot');
    carrot.setAttribute('src', './asset/img/carrot.png');
    carrot.setAttribute('alt', 'carrot');

    const x = Math.random() * (VisibleGameWidth - 100);
    const y = Math.random() * (visibleGameHeight - 100);

    carrot.style.transform = `translate(${x}px, ${y}px)`;
    fragment.appendChild(carrot);
  }
  main.appendChild(fragment);
}

//Making Bugs
function createBugs(bugCount) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < bugCount; i++) {
    const bug = document.createElement('img');
    bug.setAttribute('class', 'carrot');
    bug.setAttribute('src', './asset/img/bug.png');
    bug.setAttribute('alt', 'carrot');

    const x = Math.random() * (VisibleGameWidth - 100);
    const y = Math.random() * (visibleGameHeight - 100);

    bug.style.transform = `translate(${x}px, ${y}px)`;
    fragment.appendChild(bug);
  }
  main.appendChild(fragment);
}
