'use strict';
//
const gameWindow = document.querySelector('.game-window');
const playBtn = document.querySelector('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');
const timer = document.querySelector('.timer');
const main = document.querySelector('.main');
const carrotCounter = document.querySelector('.carrot-counter');
const notif = document.querySelector('.notification');
const notifText = document.querySelector('.notification__text');
// position
const headerHeight = document.querySelector('.header').offsetHeight;
const visibleGameWindowWidth = gameWindow.offsetWidth;
const visibleGameWindowHeight = gameWindow.offsetHeight - headerHeight;

// Global variables
let countdown;
let totalSecs = 5;
let carrotCount = 3;
let bugCount = 4;

// Starting game event
function handleGameStart(event) {
  const playIcon = event.target.classList.contains('fa-play');
  if (!playIcon) return;
  if (playIcon) {
    // UI: Buttons change
    playBtn.classList.add('pause');
    pauseBtn.classList.remove('pause');

    startGame(totalSecs, carrotCount, bugCount);
  }
}
gameWindow.addEventListener('click', handleGameStart);

function startGame(totalSecs, carrotCount, bugCount) {
  createCarrots(carrotCount);
  createBugs(bugCount);
  carrotCounter.innerHTML = carrotCount;
  showPlayTime(totalSecs);
  startCountdown(totalSecs);
}

function showPlayTime(totalSecs) {
  if (totalSecs < 0) return;
  const minutes = Math.floor(totalSecs / 60);
  const seconds = Math.floor(totalSecs - minutes * 60);

  timer.innerHTML = `
  ${String(minutes).padStart(2, '0')} : 
  ${String(seconds).padStart(2, '0')}
  `;
}

function startCountdown(totalSecs) {
  countdown = setInterval(() => {
    totalSecs--;
    showPlayTime(totalSecs);

    if (totalSecs <= 0) {
      stopCountdown();
    }
  }, 1000);
}

function createCarrots(carrotCount) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < carrotCount; i++) {
    let uuid = self.crypto.randomUUID();
    const carrots = new Image();
    carrots.src = './asset/img/carrot.png';
    carrots.alt = 'carrot';
    carrots.className = 'carrot';
    carrots.dataset.click = uuid;
    carrots.style.transform = `translate(${
      Math.random() * (visibleGameWindowWidth - 100)
    }px, ${Math.random() * (visibleGameWindowHeight - 100)}px)`;
    fragment.appendChild(carrots);
  }
  main.appendChild(fragment);
}

function createBugs(bugCount) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < bugCount; i++) {
    const bugs = new Image();
    bugs.src = './asset/img/bug.png';
    bugs.alt = 'bug';
    bugs.className = 'bug';
    bugs.style.transform = `translate(${
      Math.random() * (visibleGameWindowWidth - 100)
    }px, ${Math.random() * (visibleGameWindowHeight - 100)}px)`;
    fragment.appendChild(bugs);
  }
  main.appendChild(fragment);
}

// Playing game event
gameWindow.addEventListener('click', HandleOnGoingGame);

function HandleOnGoingGame(event) {
  let target = event.target;
  clickCarrots(target);
  clickBugs(target);
}
function clickCarrots(target) {
  const clickedCarrot = target.dataset.click;
  if (!clickedCarrot) return;
  target.remove();
  carrotCount--;
  carrotCounter.innerHTML = carrotCount;
  if (carrotCount === 0) {
    showAlert('You won 🥳');
  }
}
function clickBugs(target) {
  const clickedBug = target.classList.contains('bug');
  if (!clickedBug) {
    return;
  } else {
    showAlert('You Lose 🥲');
  }
}
function showAlert(message) {
  notif.classList.add('show-notification');
  notifText.textContent = message;
  stopCountdown();
  gameWindow.removeEventListener('click', HandleOnGoingGame);
}

function stopCountdown() {
  clearInterval(countdown);
  countdown = null;
}
function winGame() {
  //showing notification
  //stop playTime()
  //stop clicking events
}

function loseGame() {
  //showing notification
  //stop playTime()
  //stop clicking events
}

function replayGame() {
  //stop timer
  //stop clicking event
  //reset global variable as inital values
  //   startGame();
}
