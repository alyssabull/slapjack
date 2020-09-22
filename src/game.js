class Game {
  constructor() {
    this.player1 = new Player(1);
    this.player2 = new Player(2);
    this.isShuffled = false;
    this.isDealt = false;
    this.isSlapped = false;
    this.cards = cards;
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
      this.isShuffled = true;
      return deck;
  }

  beginGame() {
    var player1Hand = this.cards.slice(0,26);
    var player2Hand = this.cards.slice(26,52);
    this.player1.hand = player1Hand;
    this.player2.hand = player2Hand;
    this.isDealt = true;
  }

  playGame(player) {
      if (this.isShuffled === false ) {
        return 'Shuffle the deck!';
      } else if (this.isDealt === false) {
        return 'Deal the cards!';
      } else if (this.isShuffled === true && this.isDealt === true) {
        var playGameMessage = this.dealToMiddle(player);
        return playGameMessage;
    }
  }

  dealToMiddle(player) {
    if (this.centralPile.length === 51 && this.isFinals === false && this.isSlapped === false) {
      this.resetGame();
      this.centralPile = [];
      return 'It\'s a draw! Shuffle and deal again!';
    } else if (this.player1.hand.length === 0 || this.player2.hand.length === 0) {
      this.isFinals = true;
      debugger
      var onePlayerMessage = this.playFinalRound(player);
      return onePlayerMessage;
    } else {
      this.alternatePlayerTurns(player);
    }
  }

  alternatePlayerTurns(player) {
    if (this.player1 === player && this.player2.isTurn === false && this.isFinals === false) {
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
    }
  }

  slapThePile(player) {
    this.isSlapped = true;
    if (this.centralPile[0].value === 11 && this.centralPile.length > 0){
      var message = this.slapJack(player);
      return message;
    } else if (this.centralPile.length > 1 && this.centralPile[0].value === this.centralPile[1].value && this.isFinals === false) {
      this.clearPile(player);
      return `DOUBLES! Player ${player.id} takes the pile!`;
    } else if (this.centralPile.length > 2 && this.centralPile[0].value === this.centralPile[2].value && this.isFinals === false) {
      this.clearPile(player);
      return `SANDWICH! Player ${player.id} takes the pile!`;
    } else {
      debugger
      var message = this.differentiateBadSlap(player);
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
        this.resetGame();
        this.updateWins(player);
        return `GAME OVER! Player ${player.id} wins!`;
      }
    }

    differentiateBadSlap(player) {
      if (this.isFinals === false) {
        this.transferTopCard(player);
        return `BAD SLAP! Player ${player.id} gives their top card!`;
      } else if (this.isFinals == true) {
        var badSlapMessage = this.determineSlapper(player);
        return badSlapMessage;
      }
    }

    determineSlapper(player) {
      if (player.hand.length === 0) {
        this.endGame(player);
      } else {
        this.isFinals = false;
        this.backInTheGame(player);
        return 'Bad slap! Opponent gets central pile!';
      }
    }

    endGame(player) {
      if (player.id % 2 === 0) {
          var playerWin = this.player1;
          this.updateWins(playerWin)
          return 'GAME OVER!!!!! Player 1 wins!'
        } else {
          var playerWin = this.player2;
          this.updateWins(playerWin);
          return 'GAME OVER!!!!! Player 2 wins!'
        }
      }

    backInTheGame(player) {
      if (this.player1 === player) {
        for (var i = 0; i < this.centralPile.length; i++) {
          this.player2.hand.push(this.centralPile[i]);
          this.shuffleDeck(this.player2.hand);
        }
      } else if (this.player2 === player) {
        for (var i = 0; i < this.centralPile.length; i++) {
        this.player1.hand.push(this.centralPile[i]);
        this.shuffleDeck(this.player1.hand);
        }
      }
      this.centralPile = [];
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
        this.countJacks(player);
        this.centralPile.unshift(player.playCard());
        player.hand.shift()
        return `Player ${player.id} has all the cards! Last chance to slap a jack!`;
      } else if (player.isFinalPlayer === true) {
        var jackCountMessage = this.onePlayerDeal(player);
        return jackCountMessage;
      } else {
        return `No cards left! Other player must deal to the center!`;
      }
    }

    countJacks(player) {
      if (this.player1 === player) {
        for (var i = 0; i < this.player1.hand.length; i++) {
          if (this.player1.hand[i].value === 11) {
            this.jackCount = true;
          }
        }
      } else if (this.player2 === player) {
        for (var i = 0; i < this.player2.hand.length; i++) {
          if (this.player2.hand[i].value === 11) {
            this.jackCount = true;
          }
        }
      }
    }

    onePlayerDeal(player) {
      if (this.jackCount) {
        this.centralPile = [];
        this.resetGame();
        this.updateWins();
        return `The game is over! Player ${player.id} won!`;
      } else if (!this.jackCount) {
        for (var i = 0; i < this.centralPile.length; i++) {
          player.hand.push(this.centralPile[i]);
          this.shuffleDeck(player.hand);
        }
        this.centralPile = [];
        return 'No Jacks were shown, the pile will be dealt again!';
      }
    }

    updateWins(player) {
      player.wins++;
      player.saveWinsToStorage();
    }

    resetGame() {
      this.isShuffled = false;
      this.isDealt = false;
      this.isSlapped = false;
      this.isFinals = false;
      this.centralPile = [];
      this.player1.hand = [];
      this.player2.hand = [];
    }
}
