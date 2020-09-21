var newGame = new Game;
var centralPile = document.querySelector('.central-pile');
var displayMessage = document.querySelector('.display-message');
var player1CardCount = document.querySelector('.player1-card-count');
var player2CardCount = document.querySelector('.player2-card-count');

newGame.shuffleDeck(newGame.cards);
newGame.beginGame();

window.addEventListener('keydown', function(event) {
  if (event.key === 'q') {
    playerDeals(newGame.player1);
  } else if (event.key === 'p') {
    playerDeals(newGame.player2);
  } else if (event.key === 'f') {
    playerSlaps(newGame.player1);
  } else if (event.key === 'j') {
    playerSlaps(newGame.player2);
  }
});

function playerDeals(player) {
  clearInputs();
  var gameMessage = newGame.playGame(player);
  updateCardCount(player);
  displayMessage.innerText = gameMessage;
  var playerCard =
  `<div><img src=${newGame.centralPile[0].src} class="player${player.id}-deck"><div>`
  centralPile.insertAdjacentHTML('afterbegin', playerCard);
}

function playerSlaps(player) {
  clearInputs();
  var slapMessage = newGame.slapThePile(player);
  updateCardCount(newGame.player1);
  updateCardCount(newGame.player2);
  displayMessage.innerText = slapMessage;
}

function updateCardCount(player) {
  if (newGame.player1 === player) {
    var cardCount = newGame.player1.hand.length
    player1CardCount.innerText = `${cardCount} cards`;
  } else if (newGame. player2 === player) {
    var cardCount = newGame.player2.hand.length
    player2CardCount.innerText = `${cardCount} cards`;
  }
}


function clearInputs() {
  displayMessage.innerText = '';
  centralPile.innerHTML = '';
}
