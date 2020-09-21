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
    this.jackCount = false;
    this.isFinals = false;
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
      if (this.centralPile.length === 52 && this.isFinals === false) {
          this.shuffleDeck(this.centralPile);
          this.beginGame();
          this.centralPile = [];
          return 'It\'s a draw! Shuffle and deal again!';
      } else if (this.player1 === player && this.player2.isTurn === false && this.isFinals === false) {
        this.centralPile.unshift(this.player1.playCard());
        this.player1.hand.shift();
        this.player1.isTurn = false;
        this.player2.isTurn = true;
        return '';
      } else if (this.player2 === player && this.player1.isTurn === false && this.isFinals === false) {
        this.centralPile.unshift(this.player2.playCard());
        this.player2.hand.shift();
        this.player2.isTurn = false;
        this.player1.isTurn = true;
        return '';
      } else if (this.player1.hand.length === 0 || this.player2.hand.length === 0) {
        this.isFinals = true;
        var onePlayerMessage = this.playFinalRound(player);
        return onePlayerMessage;
      }
    }

    slapThePile(player) {
      if (this.centralPile[0].value === 11 && this.centralPile.length > 0){
        var message = this.slapJack(player);
        return message;
      } else if (this.centralPile.length > 1 && this.centralPile[0].value === this.centralPile[1].value && this.isFinals === false) {
        this.clearPile(player);
        return `DOUBLES!!!!!!!! Player ${player.id} takes the pile!`;
      } else if (this.centralPile.length > 2 && this.centralPile[0].value === this.centralPile[2].value && this.isFinals === false) {
        this.clearPile(player);
        return `SANDWICH!!!!!!!! Player ${player.id} takes the pile!`;
      } else {
        var message = this.differentiateSlap(player);
        return message;
      }
    }

    slapJack(player) {
      if (this.isFinals === false) {
        this.clearPile(player);
        return `SLAPJACK!!!!!!!! Player ${player.id} takes the pile!`;
      } else if (this.isFinals === true) {
        var finalMessage = this.finalSlap(player);
        return finalMessage;
      }
    }

    finalSlap(player) {
      if (player.hand.length === 0) {
        this.isFinals = false;
        this.clearPile(player);
        return `Nice slap! Player ${player.id} is back in the game!`;
      } else {
        this.isFinals = false;
        this.centralPile = [];
        this.player1.hand = [];
        this.player2.hand = [];
        this.beginGame();
        this.winCount();
        return 'GAME OVER!!!!!!!'
      }
    }

    differentiateSlap(player) {
      if (this.isFinals === false) {
        this.transferTopCard(player);
        return `BAD SLAP!!!!!!!! Player ${player.id} gives their top card!`;
      } else if (this.isFinals == true) {
        this.isFinals = false;
        this.centralPile = [];
        this.player1.hand = [];
        this.player2.hand = [];
        this.beginGame();
        this.winCount();
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

    playFinalRound(player) {
      if (player.hand.length !== 0) {
        player.isFinalPlayer = true;
        this.cardValues(player);
        this.centralPile.unshift(player.playCard());
        player.hand.shift()
        return `Player ${player.id} has all the cards! Last chance to slap a jack!`;
      } else if (player.isFinalPlayer === true) {
        var jackCountMessage = this.cardInventory(player);
        return jackCountMessage;
      } else {
        return `No cards left! Other player must deal to the center!`;
      }
    }

    cardValues(player) {
        for (var i = 0; i < player.hand.length; i++) {
          if (player.hand[i].value === 11) {
            this.jackCount = true;
          }
        }
    }

    cardInventory(player) {
      if (this.jackCount) {
        this.centralPile = [];
        return `The game is over! Player ${player.id} won!`;
      } else if (!this.jackCount) {
        for (var i = 0; i < this.centralPile.length; i++) {
          player.hand.push(this.centralPile[i]);
          this.shuffleDeck(player.hand);
        }
        this.centralPile = [];
        return 'No Jacks, the pile will be dealt again!'
      }
    }

}
