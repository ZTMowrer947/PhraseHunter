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

    // Self-explanatory, gets the game difficulty
    get difficulty() {
        return $("#difficulty").val();
    }

    // Determine the number of hearts that the player has
    get totalHearts() {
        // Considering the difficulty value, return the number of hearts corresponding to it
        switch (this.difficulty) {
            case "easy":
                return 5;
            
            case "medium":
                return 3;

            case "hard":
                return 1;
        }
    }

    // Randomly retrieve a phrase from the array
    getRandomPhrase() {
        // Get the most times that a phrase has been displayed
        const mostTimesDisplayed = this.phrases
            .reduce((currentMostTimesDisplayed, phrase) =>
                phrase.timesDisplayed > currentMostTimesDisplayed ?
                    phrase.timesDisplayed :
                    currentMostTimesDisplayed,
            0);

        // Filter out phrases that have been displayed the most
        let lessDisplayedPhrases = this.phrases
            .filter((phrase) => phrase.timesDisplayed < mostTimesDisplayed);

        /*
            If all phrases have been displayed the same number of times (or not at all),
            use them all. Otherwise, use the lesser displayed phrases. 
        */
        const phrases = lessDisplayedPhrases.length === 0 ?
            this.phrases :
            lessDisplayedPhrases

        // Generate random index from 0 (inclusive) to length of "phrases" array (exclusive)
        const randomIndex = Math.floor(Math.random() * phrases.length);

        // Return phrase at that index
        return phrases[randomIndex];
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
        const $heart = $("#scoreboard .tries img[src$='liveHeart.png']")
            .last();

        $heart
            .animateCSS("fadeOut faster", () => {
                $heart.attr("src", "images/lostHeart.png");

                // If miss counter is greater than or equal to the total number of hearts, end the game
                // ("this" is referring to the game object)
                if (this.missed >= this.totalHearts)
                    this.gameOver("lose");
            });
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
            .animateCSS("fadeIn faster")
            .removeClass("hide")
            .addClass(status)
            .children("#game-over-message")
            .first()
            .text(gameOverMessage)
            .siblings("#btn__reset")
            .text("Play again");
    }

    // Start the game
    startGame() {
        // Auto end game if there are no phrases to use
        if (this.phrases.length === 0) {
            $("#overlay")
                .removeClass("hide") // Show overlay
                .addClass("nophrases lose")
                .children("#game-over-message")
                .text("Sorry, there are no phrases to hunt for.") // Set error text
                .siblings("#btn__reset")
                .remove();           // Remove reset button: We can't continue without any phrases
        } else {
            // Reset miss counter
            this.missed = 0;

            // Clear overlay game over text
            $("#overlay #game-over-message")
                .text("");

            // Remove all hearts
            $("#scoreboard li")
                .remove()

            // Add in the amount corresponding to the total number of hearts to have
            for (let i = 0; i < this.totalHearts; i++) {
                const $heartImage = $("<img />", {
                    src: "images/liveHeart.png",
                    alt: "Heart Icon",
                    height: 35,
                    width: 30,
                });

                $("<li>", { class: "tries" })
                    .append($heartImage)
                    .appendTo("#scoreboard ol");
            }

            // Reset any chosen keyboard keys
            $("#qwerty .key")
                .prop("disabled", false)
                .removeClass("chosen");

            // Remove previous phrase, if any have been loaded
            $("#phrase li")
                .remove();

            // Get phrase
            const phrase = this.getRandomPhrase();

            // Add it to display
            phrase.addPhraseToDisplay();
        }
    }
}
