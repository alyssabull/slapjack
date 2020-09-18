class Player {
  constructor(id, wins, hand) {
    this.id = Date.now();
    this.wins = 0;
    this.hand = [];
  }

  playCard() {
    return this.hand[0];
    // this.hand.shift();
    // console.log(this.hand);
  }

  saveWinsToStorage() {

  }
}
