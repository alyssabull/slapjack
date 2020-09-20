var newGame = new Game;

newGame.shuffleDeck(newGame.cards);
newGame.beginGame();
// newGame.playGame();

window.addEventListener('keydown', function(event) {
  if (event.key === 'q') {
    newGame.playGame(newGame.player1.id);
  } else if (event.key === 'p') {
    newGame.playGame(newGame.player2.id);
  } else if (event.key === 'f') {
    newGame.slapThePile(newGame.player1.id);
  } else if (event.key === 'j') {
    newGame.slapThePile(newGame.player2.id);
  }
});
