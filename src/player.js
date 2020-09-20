class Player {
  constructor(id) {
    this.id = id;
    this.wins = 0;
    this.hand = [];
    this.isTurn = false;
  }

  playCard() {
    return this.hand[0];
  }

  saveWinsToStorage() {
    
  }
}
