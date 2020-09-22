class Player {
  constructor(id) {
    this.id = id;
    this.wins = 0;
    this.hand = [];
    this.isTurn = false;
    this.isFinalPlayer = false;
  }

  playCard() {
    return this.hand[0];
  }

  saveWinsToStorage() {
    var win = {id: Date.now(), player: `player ${this.id}`, wins: 1};
    var stringifiedWins = JSON.stringify(win);
    localStorage.setItem(win.id, stringifiedWins);
  }
}
