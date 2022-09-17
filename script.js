"use strict";

const newGame = document.querySelector(".new-game");

const roll = document.querySelector(".roll-dice");
const hold = document.querySelector(".hold");

const player = document.querySelector(".player");
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0EL = document.querySelector(".score-0");
const score1EL = document.querySelector(".score-1");
const score = document.querySelector(".score");
const current0EL = document.querySelector(".current-0");
const current1EL = document.querySelector(".current-1");
const currentscore0 = document.getElementById("current-score0");
const currentscore1 = document.getElementById("current-score1");
const dice = document.querySelector(".dice");

const random = Math.floor(Math.random() * 6) + 1;
//starting conditions

let current, activePlayer, playing, scores;

const init = function () {
  current = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  dice.classList.add("hidden");
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  currentscore0.textContent = 0;
  currentscore1.textContent = 0;
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player1EL.classList.remove("player--active");

  player0EL.classList.add("player--active");
};

init();
const switchPlayer = function () {
  document.getElementById(`current-score${activePlayer}`).textContent = 0;
  current = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};
const btnroll = roll.addEventListener("click", function () {
  if (playing) {
    const random = Math.floor(Math.random() * 6) + 1;
    //display dice
    dice.classList.remove("hidden");
    dice.src = `dice-${random}.png`;
    if (random !== 1) {
      current = current + random;
      document.getElementById(`current-score${activePlayer}`).textContent =
        current;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

hold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += current;
    document.querySelector(`.score-${activePlayer}`).textContent =
      scores[activePlayer];
    //first to reach 100 becomes the winner

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      dice.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener("click", init);
