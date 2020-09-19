var player1 = new Player;
var player2 = new Player;

class Game {
  constructor() {
    this.cards =[
      // {value: 1, src: './assets/blue-01.png'},
      // {value: 2, src: './assets/blue-02.png'},
      // {value: 3, src: './assets/blue-03.png'},
      // {value: 4, src: './assets/blue-04.png'},
      // {value: 5, src: './assets/blue-05.png'},
      // {value: 6, src: './assets/blue-06.png'},
      // {value: 7, src: './assets/blue-07.png'},
      // {value: 8, src: './assets/blue-08.png'},
      {value: 9, src: './assets/blue-09.png'},
      {value: 10, src: './assets/blue-10.png'},
      {value: 11, src: './assets/blue-jack.png'},
      {value: 12, src: './assets/blue-queen.png'},
      // {value: 13, src: './assets/blue-king.png'},
      // {value: 1, src: './assets/gold-01.png'},
      // {value: 2, src: './assets/gold-02.png'},
      // {value: 3, src: './assets/gold-03.png'},
      // {value: 4, src: './assets/gold-04.png'},
      // {value: 5, src: './assets/gold-05.png'},
      // {value: 6, src: './assets/gold-06.png'},
      // {value: 7, src: './assets/gold-07.png'},
      // {value: 8, src: './assets/gold-08.png'},
      // {value: 9, src: './assets/gold-09.png'},
      // {value: 10, src: './assets/gold-10.png'},
      // {value: 11, src: './assets/gold-jack.png'},
      // {value: 12, src: './assets/gold-queen.png'},
      // {value: 13, src: './assets/gold-king.png'},
      // {value: 1, src: './assets/green-01.png'},
      // {value: 2, src: './assets/green-02.png'},
      // {value: 3, src: './assets/green-03.png'},
      // {value: 4, src: './assets/green-04.png'},
      // {value: 5, src: './assets/green-05.png'},
      // {value: 6, src: './assets/green-06.png'},
      // {value: 7, src: './assets/green-07.png'},
      // {value: 8, src: './assets/green-08.png'},
      // {value: 9, src: './assets/green-09.png'},
      // {value: 10, src: './assets/green-10.png'},
      // {value: 11, src: './assets/green-11.png'},
      // {value: 12, src: './assets/green-12.png'},
      // {value: 13, src: './assets/green-13.png'},
      // {value: 1, src: './assets/red-01.png'},
      // {value: 2, src: './assets/red-02.png'},
      // {value: 3, src: './assets/red-03.png'},
      // {value: 4, src: './assets/red-04.png'},
      // {value: 5, src: './assets/red-05.png'},
      // {value: 6, src: './assets/red-06.png'},
      // {value: 7, src: './assets/red-07.png'},
      // {value: 8, src: './assets/red-08.png'},
      // {value: 9, src: './assets/red-09.png'},
      // {value: 10, src: './assets/red-10.png'},
      // {value: 11, src: './assets/red-jack.png'},
      // {value: 12, src: './assets/red-queen.png'},
      // {value: 13, src: './assets/red-king.png'},
    ];
    this.centralPile = [];
    this.playerTurn = 0;
    this.jackCount = false;
  }

  shuffleDeck(deck) {
    var currentIndex = deck;
    var temporaryValue;
    var randomIndex;

    //while there are remaining elements in the array
    while(currentIndex !== 0) {
      //Pick one of the remaining elements using a random number
      //Multiply it by the length of the array (since Math.random gives a number between 0-1) and floor the number so there is no decimal
      randomIndex = Math.floor(Math.random() * currentIndex);
      //subtract one from the length of the array so the next time the loop is ran it will decrease by one
      currentIndex -= 1;

      //swap the random index with the current element
      //the temporary value will be assigned to the cards array at the current index
      temporaryValue = deck[currentIndex];
      //take the cards array at the current index and assign to the the cards array at the random index, the random index is now the random number generated above
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
      }
      return deck;
    }

    beginGame() {
      var player1Hand = this.cards.slice(0,2);
      var player2Hand = this.cards.slice(2,4);
      player1.hand = player1Hand;
      player2.hand = player2Hand;
    }

    playGame() {
      if (this.playerTurn === 0 && player2.hand.length > 0) {
        this.centralPile.unshift(player1.playCard());
        player1.hand.shift()
        this.playerTurn = 1;
        console.log(this.centralPile);
      } else if (this.playerTurn === 1 && player1.hand.length > 0) {
        this.centralPile.unshift(player2.playCard());
        player2.hand.shift()
        this.playerTurn = 0;
        console.log(this.centralPile);
      } else {
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
        console.log('BAD SLAP!');
      }
    }

    clearPile(playerID) {
      if (player1.id === playerID) {
        for (var i = 0; i < this.centralPile.length; i++) {
          player1.hand.push(this.centralPile[i]);
        }
      } else {
        for (var i = 0; i < this.centralPile.length; i++) {
        player2.hand.push(this.centralPile[i]);
        }
      }
      this.centralPile = [];
    }

    transferTopCard(playerID) {
      if (player1.id === playerID) {
        player2.hand.push(player1.hand[0]);
        player1.hand.shift();
      } else if (player2.id === playerID) {
        player1.hand.push(player2.hand[0]);
        player2.hand.shift();
      }
    }

    outOfCards() {
      if (player1.hand.length === 0 && this.centralPile.length < 4) {
        this.cardValues();
        this.centralPile.unshift(player2.playCard());
        player2.hand.shift()
      } else if (player2.hand.length === 0 && this.centralPile.length < 4) {
        this.cardValues();
        this.centralPile.unshift(player1.playCard());
        player1.hand.shift()
      } else {
        this.finalSlap();
      }
    }

    cardValues() {
      if (player1.hand.length === 0) {
        for (var i = 0; i < player2.hand.length; i++) {
          if (player2.hand[i].value === 11) {
            this.jackCount = true;
            this.playerTurn = 1;
      } else if (player2.hand.length === 0) {
        for (var i = 0; i < player1.hand.length; i++) {
          if (player1.hand[i].value === 11) {
            this.jackCount = true;
            this.playerTurn = 0;
          }
        }
      }
      }
      }
    }

    finalSlap() {
      if (this.jackCount) {
        console.log('the game is over!')
      } else {
        this.shuffleDeck(this.centralPile);
        this.
        console.log('pick up the central pile and go through it one more time!')
      }
    }
  }
