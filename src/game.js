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
      {value: 11, src: './assets/green-jack.png'},
      {value: 12, src: './assets/green-queen.png'},
      {value: 13, src: './assets/green-king.png'},
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

    playGame(player) {
      if (this.centralPile.length === 52 && this.lastPlayer === 0) {
          this.shuffleDeck(this.centralPile);
          this.beginGame();
          this.centralPile = [];
          return 'It\'s a draw! Shuffle and deal again!';
      } else if (this.player1 === player && this.player2.isTurn === false && this.lastPlayer === 0) {
        this.centralPile.unshift(this.player1.playCard());
        this.player1.hand.shift();
        this.player1.isTurn = false;
        this.player2.isTurn = true;
        return '';
      }
      else if (this.player2 === player && this.player1.isTurn === false && this.lastPlayer === 0) {
        this.centralPile.unshift(this.player2.playCard());
        this.player2.hand.shift();
        this.player2.isTurn = false;
        this.player1.isTurn = true;
        return '';
      }
      else if (this.player1.hand.length === 0 || this.player2.hand.length === 0) {
        var onePlayerMessage = this.onePlayerDeal(player);
        return onePlayerMessage;
      }
    }

    slapThePile(player) {
      if (this.centralPile[0].value === 11 && this.centralPile.length > 0){
        var message = this.slapJack(player);
        return message;
      } else if (this.centralPile.length > 1 && this.centralPile[0].value === this.centralPile[1].value && this.lastPlayer === 0) {
        this.clearPile(player);
        return `DOUBLES!!!!!!!! Player ${player.id} takes the pile!`;
      } else if (this.centralPile.length > 2 && this.centralPile[0].value === this.centralPile[2].value && this.lastPlayer === 0) {
        this.clearPile(player);
        return `SANDWICH!!!!!!!! Player ${player.id} takes the pile!`;
      } else {
        var message = this.differentiateSlap(player);
        return message;
      }
    }

    slapJack(player) {
      if (this.lastPlayer === 0) {
        this.clearPile(player);
        return `SLAPJACK!!!!!!!! Player ${player.id} takes the pile!`
      } else if (this.lastPlayer !== player) {
        this.clearPile(player);
        this.lastPlayer = 0;
      }
    }

    differentiateSlap(player) {
      if (this.lastPlayer === 0) {
        this.transferTopCard(player);
        return `DOUBLES!!!!!!!! Player ${player.id} gives their top card!`;
      } else if (this.lastPlayer === player) {
        return 'GAME OVER!!!!!!!'
      }
    }

    clearPile(player) {
      if (this.player1 === player) {
        for (var i = 0; i < this.centralPile.length; i++) {
          this.player1.hand.push(this.centralPile[i]);
          this.shuffleDeck(this.player1.hand);
        }
      } else if (this.player2 === player) {
        for (var i = 0; i < this.centralPile.length; i++) {
        this.player2.hand.push(this.centralPile[i]);
        this.shuffleDeck(this.player2.hand);
        }
      }
      this.centralPile = [];
    }

    transferTopCard(player) {
      if (this.player1 === player) {
        this.player2.hand.push(this.player1.hand[0]);
        this.player1.hand.shift();
      } else if (this.player2 === player) {
        this.player1.hand.push(this.player2.hand[0]);
        this.player2.hand.shift();
      }
    }

    onePlayerDeal(player) {
      if (this.player2 === player && this.centralPile.length < 52) {
        this.player1.isTurn = false;
        this.cardValues();
        this.centralPile.unshift(this.player2.playCard());
        this.player2.hand.shift()
        return 'Player 2 has all the cards! Player 1, last chance to slap a jack!';
      } else if (this.player1 === player && this.centralPile.length < 52) {
        this.player2.isTurn = false;
        this.cardValues();
        this.centralPile.unshift(this.player1.playCard());
        this.player1.hand.shift()
        return 'Player 1 has all the cards! Player 2, last chance to slap a jack!';
      } else {
        this.cardInventory(player);
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

    cardInventory(player) {
      if (this.jackCount) {
        console.log(`The game is over! ${player} won!`);
      } else if (!this.jackCount) {
        for (var i = 0; i < this.centralPile.length; i++) {
          player.hand.push(this.centralPile[i]);
          this.shuffleDeck(player.hand);
        }
        this.centralPile = [];
        this.lastPlayer = player.id;
        this.finalRound(player);
      }
    }

    finalRound(player) {
      if (this.player1 === player) {
        this.centralPile.unshift(this.player1.playCard());
        this.player1.hand.shift()
        console.log(`FINAL ROUND player 1 played ${this.centralPile[0].value}`);
        console.log(this.player1.hand.length);
    } else if (this.player2 === player) {
        this.cardValues();
        this.centralPile.unshift(this.player2.playCard());
        this.player2.hand.shift()
        console.log(`FINAL ROUND player 2 played ${this.centralPile[0].value}`);
        console.log(this.player2.hand.length);
    }
  }
}
