// Basic variables: scores and players
let scores, roundScore, activePlayer, gamePlaying, lastDice, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    // 1. Random number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';

    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';

    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice1 + dice2;
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }

    /*
      if (dice === 6 && lastDice === 6) {
        // Player looses score
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
      } else if (dice !== 1) {
        // Add score
        roundScore += dice;
        document.querySelector(
          '#current-' + activePlayer
        ).textContent = roundScore;
      } else {
        // Next player
        nextPlayer();
      }
  
      lastDice = dice;
    }*/
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update UI
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    let input = document.querySelector('.final-score').value;

    // Undefined, 0, null or "" are coerced to false
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Check if player won the game
    checkWinner();
  }
});

function nextPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  roundScore = 0; // reset roundScore

  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

function checkWinner() {
  if (scores[activePlayer] >= winningScore) {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document
      .querySelector('.player-' + activePlayer + '-panel')
      .classList.add('winner');
    document
      .querySelector('.player-' + activePlayer + '-panel')
      .classList.remove('active');
    gamePlaying = false;
  } else {
    // Next Player
    nextPlayer();
  }
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0]; // global score
  roundScore = 0; // round score
  activePlayer = 0; // 0 is first player, 1 second
  gamePlaying = true;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
}
