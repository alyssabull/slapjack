class Game {
  constructor() {
    this.player1 = new Player(1);
    this.player2 = new Player(2);
    this.cards =[
      {value: 1, src: './assets/blue-01.png'},
      {value: 2, src: './assets/blue-02.png'},
      {value: 3, src: './assets/blue-03.png'},
      {value: 4, src: './assets/blue-04.png'},
      {value: 5, src: './assets/blue-05.png'},
      {value: 6, src: './assets/blue-06.png'},
      {value: 7, src: './assets/blue-07.png'},
      {value: 8, src: './assets/blue-08.png'},
      {value: 9, src: './assets/blue-09.png'},
      {value: 10, src: './assets/blue-10.png'},
      {value: 11, src: './assets/blue-jack.png'},
      {value: 12, src: './assets/blue-queen.png'},
      {value: 13, src: './assets/blue-king.png'},
      {value: 1, src: './assets/gold-01.png'},
      {value: 2, src: './assets/gold-02.png'},
      {value: 3, src: './assets/gold-03.png'},
      {value: 4, src: './assets/gold-04.png'},
      {value: 5, src: './assets/gold-05.png'},
      {value: 6, src: './assets/gold-06.png'},
      {value: 7, src: './assets/gold-07.png'},
      {value: 8, src: './assets/gold-08.png'},
      {value: 9, src: './assets/gold-09.png'},
      {value: 10, src: './assets/gold-10.png'},
      {value: 11, src: './assets/gold-jack.png'},
      {value: 12, src: './assets/gold-queen.png'},
      {value: 13, src: './assets/gold-king.png'},
      {value: 1, src: './assets/green-01.png'},
      {value: 2, src: './assets/green-02.png'},
      {value: 3, src: './assets/green-03.png'},
      {value: 4, src: './assets/green-04.png'},
      {value: 5, src: './assets/green-05.png'},
      {value: 6, src: './assets/green-06.png'},
      {value: 7, src: './assets/green-07.png'},
      {value: 8, src: './assets/green-08.png'},
      {value: 9, src: './assets/green-09.png'},
      {value: 10, src: './assets/green-10.png'},
      {value: 11, src: './assets/green-11.png'},
      {value: 12, src: './assets/green-12.png'},
      {value: 13, src: './assets/green-13.png'},
      {value: 1, src: './assets/red-01.png'},
      {value: 2, src: './assets/red-02.png'},
      {value: 3, src: './assets/red-03.png'},
      {value: 4, src: './assets/red-04.png'},
      {value: 5, src: './assets/red-05.png'},
      {value: 6, src: './assets/red-06.png'},
      {value: 7, src: './assets/red-07.png'},
      {value: 8, src: './assets/red-08.png'},
      {value: 9, src: './assets/red-09.png'},
      {value: 10, src: './assets/red-10.png'},
      {value: 11, src: './assets/red-jack.png'},
      {value: 12, src: './assets/red-queen.png'},
      {value: 13, src: './assets/red-king.png'},
    ];
    this.centralPile = [];
    this.lastPlayer = 0;
    this.jackCount = false;
  }

  shuffleDeck(deck) {
    for (var i = 0; i < deck.length; i++) {
      var randomIndex = Math.floor(Math.random() * (i+1));
      var newIndex = deck[randomIndex];
      deck[randomIndex] = deck[i];
      deck[i] = newIndex;
    }
      return deck;
  }

    beginGame() {
      var player1Hand = this.cards.slice(0,26);
      var player2Hand = this.cards.slice(26,52);
      this.player1.hand = player1Hand;
      this.player2.hand = player2Hand;
    }

    playGame(playerID) {
      if (this.player1 === playerID && this.player2.isTurn === false && this.player2.hand.length > 0 && this.lastPlayer === 0) {
        this.centralPile.unshift(this.player1.playCard());
        this.player1.hand.shift();
        this.player1.isTurn = false;
        this.player2.isTurn = true;
          console.log(`player 1 played ${this.centralPile[0].value}`);
          console.log(this.player1.hand.length);
      }
      else if (this.player2 === playerID && this.player1.isTurn === false && this.player1.hand.length > 0 && this.lastPlayer === 0) {
        this.centralPile.unshift(this.player2.playCard());
        this.player2.hand.shift();
        this.player2.isTurn = false;
        this.player1.isTurn = true;
          console.log(`player 2 played ${this.centralPile[0].value}`);
          console.log(this.player2.hand.length);
      } else if (this.player1.hand.length === 0 || this.player2.hand.length === 0) {
        this.onePlayerDeal(playerID);
      }
    }

    slapThePile(playerID) {
      if (this.centralPile[0].value === 11 && this.centralPile.length > 0){
        this.slapJack(playerID);
      } else if (this.centralPile.length > 1 && this.centralPile[0].value === this.centralPile[1].value && this.lastPlayer === 0) {
        this.clearPile(playerID);
        console.log('DOUBLE BABY!');
      } else if (this.centralPile.length > 2 && this.centralPile[0].value === this.centralPile[2].value && this.lastPlayer === 0) {
        this.clearPile(playerID);
        console.log('SANDWICH BABY!');
      } else {
        this.differentiateSlap(playerID);
      }
    }

    slapJack(playerID) {
      if (this.lastPlayer === 0) {
        this.clearPile(playerID);
        console.log('SLAPJACK BABY!');
      } else if (this.lastPlayer === playerID) {
        console.log(`GAME OVER! ${this.lastPlayer} wins`);
      } else if (this.lastPlayer !== playerID) {
        this.clearPile(playerID);
        this.lastPlayer = 0;
        console.log('Player is back in the game!');
      }
    }

    differentiateSlap(playerID) {
      if (this.lastPlayer === 0) {
        this.transferTopCard(playerID);
        console.log('BAD SLAP!');
      } else if (this.lastPlayer === playerID) {
        console.log(`game over! ${this.lastPlayer} loses!`)
      } else if (this.lastPlayer !== playerID) {
        console.log(`game over! ${this.lastPlayer} wins!`)
      }
    }

    clearPile(playerID) {
      if (this.player1 === playerID) {
        for (var i = 0; i < this.centralPile.length; i++) {
          this.player1.hand.push(this.centralPile[i]);
          this.shuffleDeck(this.player1.hand);
        }
      } else {
        for (var i = 0; i < this.centralPile.length; i++) {
        this.player2.hand.push(this.centralPile[i]);
        this.shuffleDeck(this.player2.hand);
        }
      }
      this.centralPile = [];
    }

    transferTopCard(playerID) {
      if (this.player1 === playerID) {
        this.player2.hand.push(this.player1.hand[0]);
        this.player1.hand.shift();
      } else if (this.player2 === playerID) {
        this.player1.hand.push(this.player2.hand[0]);
        this.player2.hand.shift();
      }
    }

    onePlayerDeal(playerID) {
      if (this.player2 === playerID && this.player2.hand.length > 0 && this.centralPile.length < 52) {
        this.cardValues();
        this.centralPile.unshift(this.player2.playCard());
        this.player2.hand.shift()
        console.log(`player 2 played ${this.centralPile[0].value}`);
        console.log(this.player2.hand.length);
      } else if (this.player1 === playerID && this.player2.hand.length > 0 && this.centralPile.length < 52) {
        this.cardValues();
        this.centralPile.unshift(this.player1.playCard());
        this.player1.hand.shift()
        console.log(`player 1 played ${this.centralPile[0].value}`);
        console.log(this.player1.hand.length);
      } else {
        this.cardInventory(playerID);
      }
    }

    cardValues() {
      if (this.player1.hand.length === 0) {
        for (var i = 0; i < this.player2.hand.length; i++) {
          if (this.player2.hand[i].value === 11) {
            this.jackCount = true;
            this.lastPlayer = 2;
            console.log('there is a jack in player 2s hand!');
          }
        }
      } else if (this.player2.hand.length === 0) {
        for (var i = 0; i < this.player1.hand.length; i++) {
          if (this.player1.hand[i].value === 11) {
            this.jackCount = true;
            this.lastPlayer = 1;
            console.log('there is a jack in player 1s hand!');
          }
        }
      }
    }

    cardInventory(playerID) {
      if (this.jackCount) {
        console.log(`The game is over! ${playerID} won!`);
      } else {
        for (var i = 0; i < this.centralPile.length; i++) {
          playerID.hand.push(this.centralPile[i]);
          this.shuffleDeck(playerID.hand);
        }
        this.centralPile = [];
        this.lastPlayer = playerID.id;
        console.log('pick up the central pile and go through it one more time!');
      }
    }

  //   playFinalRound(playerID) {
  //
  //   }
  }
