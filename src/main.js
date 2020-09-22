var newGame = new Game;
var cardDecks = document.querySelector('.card-decks');
var centralPile = document.querySelector('.central-pile');
var displayMessage = document.querySelector('.display-message');
var player1CardCount = document.querySelector('.player1-card-count');
var player2CardCount = document.querySelector('.player2-card-count');
var shuffleDeckButton = document.querySelector('.shuffle-deck-button');
var beginGameButton = document.querySelector('.begin-game-button');
var player1WinCount = document.querySelector('.player1-win-count');
var player2WinCount = document.querySelector('.player2-win-count');

var storedWins = [];

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
shuffleDeckButton.addEventListener('click', shuffleDeckMessage);
beginGameButton.addEventListener('click', beginGameMessage);

function shuffleDeckMessage() {
  newGame.shuffleDeck(newGame.cards);
  displayMessage.innerText = 'Deck has been shuffled!';
  shuffleDeckButton.classList.add('hidden');
  beginGameButton.classList.remove('hidden');
}

function beginGameMessage() {
  newGame.beginGame();
  cardDecks.classList.remove('hidden');
  player1CardCount.innerText = '26 cards';
  player2CardCount.innerText = '26 cards';
  displayMessage.innerText = 'Cards have been dealt. Player 1 begin!';
  beginGameButton.classList.add('hidden');
}

function playerDeals(player) {
  if (newGame.isShuffled === false) {
    var gameMessage = newGame.playGame(player);
    displayMessage.innerText = gameMessage;
    player1CardCount.innerText = '';
    player2CardCount.innerText = '';
    player1WinCount.innerText = '';
    player2WinCount.innerText = '';
    cardDecks.classList.add('hidden');
    shuffleDeckButton.classList.remove('hidden');
  } else {
    clearInputs();
    var gameMessage = newGame.playGame(player);
    if (gameMessage !== undefined) {
      displayMessage.innerText = gameMessage;
    }
    if (newGame.centralPile[0] === undefined) {
    } else {
      displayWins();
      updateCardCount(player);
      var playerCard =
      `<div><img src=${newGame.centralPile[0].src} class="player${player.id}-deck"><div>`
      centralPile.insertAdjacentHTML('afterbegin', playerCard);
    }
  }
}

function playerSlaps(player) {
  clearInputs();
  var slapMessage = newGame.slapThePile(player);
  updateCardCount(newGame.player1);
  updateCardCount(newGame.player2);
  if (slapMessage !== undefined) {
    displayMessage.innerText = slapMessage;
  }
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

function displayWins() {
  debugger
  getWinsFromStorage();
  var totalPlayer1Wins = 0;
  var totalPlayer2Wins = 0;
  for (var i = 0; i < storedWins.length; i++) {
    if (storedWins[i].player === 'player 1') {
      var player1Wins = storedWins[i].wins;
      totalPlayer1Wins += player1Wins;
    } else if (storedWins[i].player === 'player 2') {
      var player2Wins = storedWins[i].wins;
      var numWins = storedWins[i].wins.value
      totalPlayer2Wins += numWins;
    }
  }
  player1WinCount.innerText = `${totalPlayer1Wins} wins`;
  player2WinCount.innerText = `${totalPlayer2Wins} wins`;
}

function getWinsFromStorage() {
  player1WinCount.classList.remove('hidden');
  player2WinCount.classList.remove('hidden');
  for (var i = 0; i < localStorage.length; i++) {
    var winsInStorage = localStorage.getItem(localStorage.key(i));
    var parsedWins = JSON.parse(winsInStorage);
    storedWins.push(parsedWins);
  }
}
