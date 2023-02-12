"use script";

// html page selectors

const userScore = document.querySelector(".display-score");
const rulesBtn = document.querySelector(".rules-btn");
const userPick = document.querySelectorAll(".btn");
const startContainer = document.querySelector(".start-container");
const gameContainer = document.querySelector(".pick-container");
const winner = document.querySelector(".winner");
const playAgain = document.querySelector(".play-btn");
let userSelection;
let userPoints = 0;

// game functions

const computerSelection = function () {
  const rps = ["rock", "paper", "scissor"];
  const index = Math.floor(Math.random() * (2 - 0 + 1) + 0);
  return rps[index];
};

// console.log(userScore.textContent);

function showHide(message) {
  if (startContainer.classList.contains("hidden")) {
    startContainer.classList.remove("hidden");
    gameContainer.classList.add("hidden");
    computerSelection();
  } else {
    startContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    winner.textContent = message;
  }
}

function game(computerSelection, userSelection) {
  if (userSelection === computerSelection) {
    showHide(`It\'s a tie!`);
  } else if (userSelection === "rock" && computerSelection === "scissors") {
    showHide(`You win`);
    userPoints++;
    userScore.textContent = userPoints;
  } else if (userSelection === "scissor" && computerSelection === "paper") {
    showHide(`You win`);
    userPoints++;
    userScore.textContent = userPoints;
  } else if (userSelection === "paper" && computerSelection === "rock") {
    showHide(`You win`);
    userPoints++;
    userScore.textContent = userPoints;
  } else {
    showHide(`Computer Win`);
  }
}

if (userPick != undefined) {
  for (let i = 0; i < userPick.length; i++) {
    userPick[i].addEventListener("click", function () {
      if (userPick[i].classList.contains("paper")) {
        userSelection = "paper";
        game(computerSelection(), userSelection);
      } else if (userPick[i].classList.contains("rock")) {
        userSelection = "rock";
        game(computerSelection(), userSelection);
      } else {
        userSelection = "scissor";
        game(computerSelection(), userSelection);
      }
    });
  }
}

// REPLAY

playAgain.addEventListener("click", showHide);

// MODAL handeling
const overlay = document.querySelector(".overlay");
const overlayClose = document.querySelector(".close");

function open() {
  overlay.classList.add("open");
}

function close() {
  overlay.classList.remove("open");
}

rulesBtn.addEventListener("click", open);
overlayClose.addEventListener("click", close);
