# SlapJack Final Solo Project

## Project Description

In this project, I built an application that allows two users to play a game of SlapJack. Start the game by shuffling and dealing the deck before enjoying fast-paced, edge of your seat fun! Each player has an assigned key to 'deal' and to 'slap'. First player to have all cards in their hand is declared the winner! May the best slapper win!

- [Project Brief and Rubric](https://frontend.turing.io/projects/module-1/slapjack.html)

## Learning Goals

Create a functioning game of slapJack that can be played between 2 players by:

- Building an entire web app from scratch using the three primary frontend languages, accomplishing:
  - semantic HTML
  - clean and organized CSS styles
  - DRY JavaScript with a focus on SRP

- Working between multiple JavaScript files and using two classes to structure the Data Model
- Using event delegation to assign 'deal' and 'slap' keys to each player

- Strategically approaching the game logic by utilizing a planning gist to break down the flow of solving the big problem into smaller, bite size problems
- Focusing on the game logic and working the game fully in the console before transferring to the DOM to deepen understanding of the relationship between the Data Model and DOM
- Utilizing localStorage to persist win data on page refresh

## Functionality

- Select the shuffle and deal the deck buttons to start the game; each player's deck has a unique color

- Player 1’s keyboard controls:

  - `q` to deal a card
  - `f` to slap

  Player 2’s keyboard controls:

  - `p` to deal a card
  - `j` to slap

- Once the deck is shuffled and dealt, players alternate dealing the cards from their hand into the center pile. The central pile will alternate colors corresponding to each player to show which player has just dealt to the center

- During game play, players can 'slap' the pile. If the slap is a 'good' slap (a jack, doubles or sandwich) the player receives the entire central pile to their hand which is automatically shuffled before returning to play. If the slap is 'bad', the player who executed the bad slap gives the opposing player their top card.

- Once one player runs out of cards, you're in final round mode! The player who still has cards left deals to the center and the player without cards has a final chance to slap their way back in (this time, only a jack can save them!) If they slap a jack, they receive the central pile and are back in the game! If the player with the cards slaps or if they have a bad slap, they lose!

- Once a game is complete, a new game can be started by pressing the 'q' or 'p' keys. They shuffle button will reappear and players are eligible to play again! Upon a new game, the updated wins will be displayed. These wins will persist on page refresh.

![gif of website functioning](https://media.giphy.com/media/oekVvpSoyKhkPe83A1/giphy.gif)

### Challenges

- Transferring the console game to the DOM and not 'seeing' the result
  - Playing out multiple iterations of game play in the console
  - Building out the game and player classes for transferability to the DOM
- Working within multiple class .js files 
  - Ensuring the DOM and Data Model stayed separate
  - Strategically organizing functionality so that files could appropriately 'talk' to each other
  - Deciding the best sequence of a function's execution to ensure that all the necessary information was provided 

### Wins

- Breaking down a complex problem in ordered, smaller bite-size chunks by utilizing a planning gist to organize thoughts
- Creating complete game functionality in the console before displaying anything on the DOM
- Effectively refactoring after each iteration with the next step in mind
- Utilizing localStorage for multiple instances of a class that persisted on page load
- Using the debugger tool to solve errors one step at a time

## Set Up Instructions

1. Fork [this repository](https://github.com/alyssabull/slapjack) and clone it down to your machine.
2. Move into that directory: `cd slapjack`.
3. Run `open index.html` to run the app!

## Contributors

* [Alyssa Bull](https://github.com/alyssabull)
* [Scott Ertmer](https://github.com/sertmer) - Project Manager

