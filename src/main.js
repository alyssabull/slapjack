var newGame = new Game;
var centralPile = document.querySelector('.central-pile');
var displayMessage = document.querySelector('.display-message');

newGame.shuffleDeck(newGame.cards);
newGame.beginGame();

window.addEventListener('keydown', function(event) {
  if (event.key === 'q') {
    player1Deals();
  } else if (event.key === 'p') {
    player2Deals();
  } else if (event.key === 'f') {
    player1Slaps();
  } else if (event.key === 'j') {
    player2Slaps();
  }
});

function player1Deals() {
  clearInputs();
  newGame.playGame(newGame.player1);
  var player1Card =
  `<div><img src=${newGame.centralPile[0].src} class="player1-deck"><div>`
  centralPile.insertAdjacentHTML('afterbegin', player1Card);
}

function player2Deals() {
  clearInputs();
  newGame.playGame(newGame.player2);
  var player1Card =
  `<div><img src=${newGame.centralPile[0].src} class="player2-deck"><div>`
  centralPile.insertAdjacentHTML('afterbegin', player1Card);
}

function player1Slaps() {
  clearInputs();
  var topCard = newGame.centralPile[0].value;
  var secondCard = newGame.centralPile[1].value || null;
  var thirdCard = newGame.centralPile[2].value || null;
  newGame.slapThePile(newGame.player1);
  if (topCard === 11) {
    displayMessage.innerText = 'SLAPJACK! Player 1 takes the pile!';
  } else if (topCard === secondCard) {
    displayMessage.innerText = 'DOUBLES! Player 1 takes the pile!';
  } else if (topCard === thirdCard) {
    displayMessage.innerText = 'SANDWICH! Player 1 takes the pile!';
  } else {
    displayMessage.innerText = 'BAD SLAP! Player 2 takes your top card!';
  }
}

function player2Slaps() {
  clearInputs();
  var topCard = newGame.centralPile[0].value;
  var secondCard = newGame.centralPile[1].value || null;
  var thirdCard = newGame.centralPile[2].value || null;
  newGame.slapThePile(newGame.player1);
  if (topCard === 11) {
    displayMessage.innerText = 'SLAPJACK! Player 2 takes the pile!';
  } else if (topCard === secondCard) {
    displayMessage.innerText = 'DOUBLES! Player 2 takes the pile!';
  } else if (topCard === thirdCard) {
    displayMessage.innerText = 'SANDWICH! Player 2 takes the pile!';
  } else {
    displayMessage.innerText = 'BAD SLAP! Player 1 takes your top card!';
  }
}

function clearInputs() {
  displayMessage.innerText = '';
  centralPile.innerHTML = '';
}
