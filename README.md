# Project #1: Java RISK!
## The JavaScript Conquest Game

### How to Play

The objective of the game is to conquer the gameboard by changing all the board's territories to your player's color. You do this by attacking the other Player's territory and attempt to capture them. You also need to make sure that your own territories are well-defended.

- The board is always split in half for both players. Both the territory and the amount of power given is random.
- Every turn the power of the Player's territories increases by 1, so playing defense for a turn is viable.
- You can only attack adjacent territories, no diagonals! Can only attack if your territory's power is greater than 1.
- You can attack any number of times with your territories until you end your turn. Attacking is always optional!
- The chance of taking the enemy's territory depends on your territory's power, the greater the number, the better.
- You can use your captured territory for further attacks. Be warned that the attacking territory is left with a power of one.

---

### Technology Used

- HTML
- CSS
- JavaScript
- Brackets
- Google Chrome

---

### Approach Taken

- Create game board and divide the game's pieces among the two players.
- Provide a button to switch controls between both players.
- Provides 2 unique colors for both players to provide a visual difference.
- Provides a visual text/icon that shows which Player's turn is it.
- Check to see if the 2 cells clicked are nearby or not with their positions.
- Check to see if the 2 cells clicked belong to the same player or not.
- Create and display 2 dices after 2 cells were clicked back to back.
- Assign a different number value to all the game board's pieces.
- Use the number value to determine the number of rolls and total number on a dice.
- Always check to see if all the pieces were taken by a Player to see if someone won.

---

### User Stories

- As a user, I like to be able to end my turn with the click of a button.
- As a user, I like to restart and play the game again after winning or losing.
- As a user, I like to be able to see the dice results for both players.
- As a user, I like to know whose player turn is it right now. 

---

### Unsolved Problems

Managed to resolve all the problems that occurred during Project development. Don't know if there's any underlining issues within the code (bugs and such).