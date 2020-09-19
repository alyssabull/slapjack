class Player {
  constructor(id, wins, hand) {
    this.id = Math.random();
    this.wins = 0;
    this.hand = [];
  }

  playCard() {
    return this.hand[0];
  }

  saveWinsToStorage() {

  }
}
