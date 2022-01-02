'use strict';

//Selecting elements
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let current0El = document.querySelector('#current--0');
let current1El = document.querySelector('#current--1');
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');

//Starting Conditions

let currentScore, activePlayer, scores, playing;

const init = function () {
    currentScore = 0;
    scores = [0, 0];
    activePlayer = 0;
    playing = true;

    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add('hidden');
}

init();

//Switching player conditions
const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
    currentScore = 0;
}

//When dice is rolled
btnRoll.addEventListener('click', function () {
    if (playing) {

        //Generating new number
        let dice = Number(Math.trunc(Math.random() * 6) + 1);
        // console.log(dice);

        //Display rolled dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //Add to current score if not 1
        if (dice !== 1) {
            currentScore = currentScore + dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
            // console.log(currentScore);
            // current0El.textContent = currentScore;
        }
        else { // If it's switch to next player
            switchPlayer();
        }
    }
});
btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] = scores[activePlayer] + currentScore;
        console.log(scores);
        score0El.textContent = scores[0];
        score1El.textContent = scores[1];
        if (scores[activePlayer] >= 20) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            switchPlayer();
        }
    }
});
btnNew.addEventListener('click', init);