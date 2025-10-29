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

// Background Audio
const bgSound = document.querySelector('.audio-bg');
const bgBtn = document.querySelector('.bg-btn');

gameWindow.addEventListener('click', onBgSound);

function onBgSound(event) {
  const icon = bgBtn.querySelector('i');
  if (event.target !== icon) {
    return;
  } else {
    playBgSound();
  }
}
function playBgSound() {
  if (bgSound.paused) {
    bgBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    bgSound.currentTime = 0;
    bgSound.play();
  } else {
    bgBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    bgSound.pause();
  }
}
// Sound effects
const carrotSound = new Audio('./asset/sound/carrot_pull.mp3');
carrotSound.preload = 'auto';
const bugSound = new Audio('./asset/sound/bug_pull.mp3');
bugSound.preload = 'auto';
const gameWinSound = new Audio('./asset/sound/game_win.mp3');
gameWinSound.preload = 'auto';
const gameLoseSound = new Audio('./asset/sound/alert.wav');
gameLoseSound.preload = 'auto';

// Global variables
let countdown;
let totalSecs = 10;
let carrotCount = 3;
let bugCount = 4;

// Starting game event
gameWindow.addEventListener('click', handleGameStart);

function handleGameStart(event) {
  const playIcon = playBtn.querySelector('i');
  //   const playIcon = event.target.classList.contains('fa-play');
  if (event.target !== playIcon) {
    return;
  } else {
    // UI: Buttons change
    playBtn.classList.add('pause');
    pauseBtn.classList.remove('pause');

    startGame(totalSecs, carrotCount, bugCount);
  }
}

function startGame(totalSecs, carrotCount, bugCount) {
  createCarrots(carrotCount);
  createBugs(bugCount);
  carrotCounter.innerHTML = carrotCount;
  showPlayTime(totalSecs);
  startCountdown(totalSecs);
  bgSound.play();
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
      loseGame();
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(countdown);
  countdown = null;
}

// Playing game event
gameWindow.addEventListener('click', handleOnGoingGame);

function handleOnGoingGame(event) {
  let target = event.target;
  clickCarrots(target);
  clickBugs(target);
}

function clickCarrots(target) {
  const clickedCarrot = target.dataset.click;
  if (!clickedCarrot) return;
  target.remove();
  carrotSound.play();
  carrotCount--;
  carrotCounter.innerHTML = carrotCount;
  if (carrotCount === 0) {
    winGame();
  }
}

function clickBugs(target) {
  const clickedBug = target.classList.contains('bug');
  if (!clickedBug) {
    return;
  } else {
    bugSound.play();
    loseGame();
  }
}

function showAlert(message) {
  notif.classList.add('show-notification');
  notifText.textContent = message;
  pauseBtn.style.visibility = 'hidden';
  stopGame();
}

function removeAlert() {
  notif.classList.remove('show-notification');
  pauseBtn.style.visibility = 'visible';
}
function stopGame() {
  stopCountdown();
  gameWindow.removeEventListener('clcik', handleGameStart);
  gameWindow.removeEventListener('click', handleOnGoingGame);
}

function winGame() {
  showAlert('You won 🥳');
  stopGame();
  gameWinSound.play();
}

function loseGame() {
  showAlert('You Lose 🥲');
  stopGame();
  gameLoseSound.play();
}
// Pauding game event
gameWindow.addEventListener('click', pauseGame);
function pauseGame(event) {
  const icon = pauseBtn.querySelector('i');
  if (event.target !== icon) {
    return;
  } else {
    showAlert('Replay❓');
  }
}

// Replaying  game event
gameWindow.addEventListener('click', replayGame);

function replayGame(event) {
  const replayIcon = event.target.classList.contains('fa-rotate-right');
  if (!replayIcon) {
    return;
  } else {
    removeAlert();
    //stop timer
    //stop clicking event
    stopGame();
    //remove existing elemtns
    document.querySelectorAll('.carrot').forEach((item) => item.remove());
    document.querySelectorAll('.bug').forEach((item) => item.remove());
    //reset global variable as inital values
    totalSecs = 10;
    carrotCount = 3;
    bugCount = 4;
    //another round
    startGame(totalSecs, carrotCount, bugCount);
    gameWindow.addEventListener('click', handleOnGoingGame);
  }
}
