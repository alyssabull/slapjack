var newGame = new Game;
var centralPile = document.querySelector('.central-pile');

newGame.shuffleDeck(newGame.cards);
newGame.beginGame();

window.addEventListener('keydown', function(event) {
  if (event.key === 'q') {
    player1Deals();
  } else if (event.key === 'p') {
    player2Deals();
  } else if (event.key === 'f') {
    newGame.slapThePile(newGame.player1);
  } else if (event.key === 'j') {
    newGame.slapThePile(newGame.player2);
  }
});

function player1Deals() {
  centralPile.innerHTML = "";
  newGame.playGame(newGame.player1);
  var player1Card =
  `<div><img src=${newGame.centralPile[0].src} class="player1-deck"><div>`
  centralPile.insertAdjacentHTML('afterbegin', player1Card);
}
function player2Deals() {
  centralPile.innerHTML = "";
  newGame.playGame(newGame.player2);
  var player1Card =
  `<div><img src=${newGame.centralPile[0].src} class="player2-deck"><div>`
  centralPile.insertAdjacentHTML('afterbegin', player1Card);
}
