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
    // this.playerTurn = false;
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

    playGame(player) {
      if (this.player1.id === player && this.player2.isTurn === false && this.player2.hand.length > 0) {
        this.centralPile.unshift(this.player1.playCard());
        this.player1.hand.shift();
        this.player1.isTurn = false;
        this.player2.isTurn = true;
        console.log(`player 1 played ${this.centralPile[0].value}`);
      }
      else if (this.player2.id === player && this.player1.isTurn === false && this.player1.hand.length > 0) {
        this.centralPile.unshift(this.player2.playCard());
        this.player2.hand.shift();
        this.player2.isTurn = false;
        this.player1.isTurn = true;
        console.log(`player 2 played ${this.centralPile[0].value}`);
      } else if (this.player1.hand.length === 0 || this.player2.hand.length === 0) {
        this.outOfCards();
      }
    }

    slapThePile(playerID) {
      if (this.centralPile[0].value === 11 && this.centralPile.length > 0){
        this.clearPile(playerID);
        console.log('SLAPJACK BABY!');
      } else if (this.centralPile.length > 1 && this.centralPile[0].value === this.centralPile[1].value) {
        this.clearPile(playerID);
        console.log('DOUBLE BABY!');
      } else if (this.centralPile.length > 2 && this.centralPile[0].value === this.centralPile[2].value) {
        this.clearPile(playerID);
        console.log('SANDWICH BABY!');
      } else {
        this.transferTopCard(playerID);
      }
    }

    // differentiateSlap(playerID) {
    //   if (this.playerTurn < 2) {
    //     this.transferTopCard(playerID);
    //     console.log('BAD SLAP!');
    //   } else if (this.playerTurn > 2) {
    //     console.log('game over! determine the winner! use the playerID!')
    //   }
    // }

    clearPile(playerID) {
      if (this.player1.id === playerID) {
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
      if (this.player1.id === playerID) {
        this.player2.hand.push(this.player1.hand[0]);
        this.player1.hand.shift();
      } else if (this.player2.id === playerID) {
        this.player1.hand.push(this.player2.hand[0]);
        this.player2.hand.shift();
      }
    }

    outOfCards() {
      if (this.player1.hand.length === 0 && this.centralPile.length < 4) {
        this.cardValues();
        this.centralPile.unshift(this.player2.playCard());
        this.player2.hand.shift()
      } else if (this.player2.hand.length === 0 && this.centralPile.length < 4) {
        this.cardValues();
        this.centralPile.unshift(this.player1.playCard());
        this.player1.hand.shift()
      } else {
        this.cardInventory();
      }
    }

    cardValues() {
      if (this.player1.hand.length === 0) {
        for (var i = 0; i < this.player2.hand.length; i++) {
          if (this.player2.hand[i].value === 11) {
            this.jackCount = true;
            this.playerTurn = 3;
          } else if (this.player2.hand.length === 0) {
            for (var i = 0; i < this.player1.hand.length; i++) {
              if (this.player1.hand[i].value === 11) {
                this.jackCount = true;
                this.playerTurn = 2;
              }
            }
          }
        }
      }
    }

    cardInventory() {
      if (this.jackCount) {
        console.log('the game is over!')
      } else {
        this.shuffleDeck(this.centralPile);
        console.log('pick up the central pile and go through it one more time!')
      }
    }

    playFinalRound() {
      if (this.player1.hand.length === 0 && this.centralPile.length < 4) {
        this.centralPile.unshift(this.player2.playCard());
        this.player2.hand.shift()
      } else if (this.player2.hand.length === 0 && this.centralPile.length < 4) {
        this.centralPile.unshift(player1.playCard());
        this.player1.hand.shift()
      } else {
        console.log('the game is over! Log the win appropriately!');
      }
    }
  }
