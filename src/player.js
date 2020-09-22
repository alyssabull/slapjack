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
    var stringifiedWins = JSON.stringify(this.wins);
    localStorage.setItem('storedWins', stringifiedWins);
    return this.wins;
  }
}
