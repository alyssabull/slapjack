var newGame = new Game;
var centralPile = document.querySelector('.central-pile');
var displayMessage = document.querySelector('.display-message')

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
  centralPile.innerHTML = '';
  newGame.playGame(newGame.player1);
  var player1Card =
  `<div><img src=${newGame.centralPile[0].src} class="player1-deck"><div>`
  centralPile.insertAdjacentHTML('afterbegin', player1Card);
}

function player2Deals() {
  centralPile.innerHTML = '';
  newGame.playGame(newGame.player2);
  var player1Card =
  `<div><img src=${newGame.centralPile[0].src} class="player2-deck"><div>`
  centralPile.insertAdjacentHTML('afterbegin', player1Card);
}

function player1Slaps() {
  displayMessage.innerText = '';
  centralPile.innerHTML = ''
  var currentCard = newGame.centralPile[0].value;
  newGame.slapThePile(newGame.player1);
  if (currentCard === 11) {
    displayMessage.innerText = 'SLAPJACK! Player 1 takes the pile!';
  } else if (currentCard === newGame.centralPile[1]) {
    displayMessage.innerText = 'DOUBLES! Player 1 takes the pile!';
  } else if (currentCard === newGame.centralPile[2]) {
    displayMessage.innerText = 'SANDWICH! Player 1 takes the pile!';
  } else {
    displayMessage.innerText = 'BAD SLAP! Player 2 takes your top card!';
  }
}

function player2Slaps() {
  displayMessage.innerText = '';
  centralPile.innerHTML = ''
  var currentCard = newGame.centralPile[0].value;
  newGame.slapThePile(newGame.player2);
  if (currentCard === 11) {
    displayMessage.innerText = 'SLAPJACK! Player 2 takes the pile!';
  } else if (currentCard === newGame.centralPile[1]) {
    displayMessage.innerText = 'DOUBLES! Player 2 takes the pile!';
  } else if (currentCard === newGame.centralPile[2]) {
    displayMessage.innerText = 'SANDWICH! Player 2 takes the pile!';
  } else {
    displayMessage.innerText = 'BAD SLAP! Player 1 takes your top card!';
  }
}
