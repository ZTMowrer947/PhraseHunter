# PhraseHunter
Treehouse FSJS Techdegree Unit 4 Project

## Project Description
This project is a simple game where the player must guess the letters in a phrase. The correctly guessed letters are revealed within the phrase, while incorrectly guessed letters cause the player to lose a heart

The player continues to guess until they revesl all the letters in the phrase (and win) or lose all of their hearts (and lose).

## Project Criteria
### Expectations Being Met
#### Phrase.js
- A constructor is included that accepts a phrase
- Includes the following methods:
    - `addPhraseToDisplay()`, which displays the phrase on the game board.
    - `checkLetter()`, which checks if a letter is present in the phrase.
    - `showMatchedLetter()`, which reveals the leter(s) on the board matching the player's selection.

#### Game.js
- A constructor is included that adds the following properties:
    - `missed`, the number of incorrect guesses.
    - `phrases`, the list of phrases to use.

- Includes the following methods:
    - `getRandomPhrase()`, which retrieves a random phrase from the `phrases` array.
    - `handleInteration()`, which checks a player's letter selection and assesses win or lose conditions.
    - `checkForWin()`, which checks if the player has guessed all letters in the phrase.
    - `removeLife()`, which removes a life from the player, updates the game board, and checks if the player has lost the game.
    - `gameOver()`, which displays a final win or lose message.
    - `startGame()`, which gets a random phrase and displays it.

#### app.js
- Includes the following functions:
    - `resetDisplay()`, which hides the start screen overlay.
    - `markButton()`, which is called when player selects a letter. It disables the respective button on the on-screen keyboard and calls the Game `handleInteraction()` method.

- The "Start Game" button, when clicked, calls `resetDisplay()` and starts the game (the Game object is created at the beginning of the script).

- An Event listener is present on the onscreen keyboard buttons, so that clicking on one of them calls `markButton()`.

#### Game over
- If a player makes too many wrong guesses, the "lose" overlay is displayed.
- If all the letters in the phrase are revealed, the "win" overlay is displayed.

### Expectations I have exceeded (according to Treehouse)
#### app.js
- An event listener is also present for the "keypress" event for using a physical keyboard, and calls `markButton()` for the associated on-screen keyboard button.

#### Game over
- A button is added to the "win" and "lose" overlays so that the game is reset and can be played again.

### My own additions
#### Styling
- The animate.css library is used along with jQuery for animating overlays and the scoreboard.

#### Phrase.js
- Phrase objects keep track of how many times that they have been displayed.

#### Game.js
- In the `getRandomPhrase()` function, the same phrase will not be shown again after being shown until all other phrases in use are shown the same amount of times.

- A difficulty feature has been added. The gameplay remains the same, as the difficulty levels change only the number of hearts the player has:
    - Easy (default): 5 hearts
    - Medium: 3 hearts
    - Hard: Only 1 heart

#### Game over
- When the player loses, they are given 5 seconds to see what the phrase actually was.
