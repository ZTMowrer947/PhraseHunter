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
            case "easy":    // Easy, 5 hearts
                return 5;
            
            case "medium":  // Medium, 3 hearts
                return 3;

            case "hard":    // Hard, only 1 heart
                return 1;
        }
    }

    // Randomly retrieve a phrase from the array
    getRandomPhrase() {
        // Get the most times that a phrase has been displayed
        const mostTimesDisplayed = this.phrases
            // Find the most number of times a phrase has been displayed
            .reduce((currentMostTimesDisplayed, phrase) =>
                // If the current phrase has been displayed more times than the current highest,
                phrase.timesDisplayed > currentMostTimesDisplayed ?
                    // Set the current highest to that
                    phrase.timesDisplayed :
                    // Otherwise, leave the current highest as is
                    currentMostTimesDisplayed,
            0); // Start out at 0

        // Filter out phrases that have been displayed the most
        let lessDisplayedPhrases = this.phrases
            .filter((phrase) => phrase.timesDisplayed < mostTimesDisplayed);

        // If all phrases have been displayed the same number of times (or not at all),
        const phrases = lessDisplayedPhrases.length === 0 ?
            // Use all of them
            this.phrases :
            // Otherwise, use the less displayed phrases
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
        // Get letter
        const letter = $button.text();

        // Find matches of letter in phrase
        const $matchedLettersInPhrase = $(`#phrase li.${letter}`);

        // If there are none,
        if ($matchedLettersInPhrase.length === 0) {
            // Add "wrong" class to button to indicate that it was incorrect
            $button.addClass("wrong");

            // Remove a life
            this.removeLife()
        } else {
            // Otherwise, show the matched letter
            Phrase.showMatchedLetter(letter);

            // Check to see if the player has won
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
        // Check if there are no more letters hidden
        const hasWon = $("#phrase .letter.hide").length === 0;

        // If the player has won, end the game with a "win" result
        if (hasWon)
            this.gameOver("win");
    }

    // End the game, displaying the proper message for a win or a loss.
    gameOver(status) {
        // Determine game over message
        const gameOverMessage = status === "win" ?  // If the player won,
            // Display the win message
            "Congratulations, you win!" :
            // Otherwise, display the lose message
            "Sorry, you lost.";

        // Display overlay
        $("#overlay")
            .animateCSS("fadeIn faster") // Fade in overlay
            .removeClass("hide")         // Show after animation finishes
            .addClass(status)            // Add class corresponding to game result
            .children("#game-over-message") // Get game over message area
            .first()                        // Only get the first one
            .text(gameOverMessage)          // Set the game over message
            .siblings("#btn__reset")        // Get the reset button
            .text("Play again");            // Set its text to "Play again"
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
                // This method of adding attributes to newly created elements from http://api.jquery.com/jQuery/#jQuery-html-attributes
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

            // Reset and reenable any chosen keyboard keys
            $("#qwerty .key")
                .prop("disabled", false)
                .removeClass("chosen wrong");

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
