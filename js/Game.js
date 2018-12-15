// Game.js: Game class for game status and interaction.
class Game {
    /* 
        Construct a new game, initializing the "missed" property and
        passing in the given array of phrases to the new game
    */
    constructor(phrases) {
        this.missed = 0;
        this.phrases = phrases;
    }

    // Randomly retrieve a phrase from the array
    getRandomPhrase() {
        // Generate random index from 0 (inclusive) to length of "phrases" array (exclusive)
        const randomIndex = Math.floor(Math.random() * this.phrases.length);

        // Return phrase at that index
        return this.phrases[randomIndex];
    }

    /*
        Check if button clicked by player matches a letter in the phrase.
            If it doesn't match, call removeLife() to deduct a life.
            If it does, call showMatchedLetter() to show the letter and checkForWin() to check if player has won.
    */
    handleInteraction($button) {
        const letter = $button.text();

        const $matchedLettersInPhrase = $(`#phrase li.${letter}`);

        if ($matchedLettersInPhrase.length === 0)
            this.removeLife()
        else {
            Phrase.showMatchedLetter(letter);
            this.checkForWin();
        }
    }

    // Remove a life, remove a heart from the board, and (if player is out of lives) end the game.
    removeLife() {
        // Increment miss counter
        this.missed++;

        // Remove a heart from the board
        $("#scoreboard .tries img:not([src$='liveHeart.png`)")
            .last()
            .attr("src", "images/lostHeart.png");

        // If miss counter is at 5, end the game
        if (this.missed === 5)
            this.gameOver("loss");
    }

    // Check to see if player has selected all letters in the phrase
    checkForWin() {
        const hasWon = $("#phrase .letter.hide").length === 0;
        if (hasWon)
            this.gameOver("win");
    }

    // End the game, displaying the proper message for a win or a loss.
    gameOver(status) {
        const gameOverMessage = status === "win" ?
            "Congratulations, you win!" :
            "Sorry, you lost.";

        $("#overlay")
            .removeClass("hide")
            .addClass(status)
            .children("#game-over-message")
            .first()
            .text(gameOverMessage);
    }

    // Start the game
    startGame() {
        // Reset miss counter
        this.missed = 0;

        // Get phrase
        const phrase = this.getRandomPhrase();

        // Add it to display
        phrase.addPhraseToDisplay();
    }
}
