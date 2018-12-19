// Treehouse FSJS Techdegree Unit 4 Project
// app.js: Main scriping application.

// Regex for keyboard characters
const charRegex = /^[A-Za-z]$/;

// Phrases as strings
const phraseStrings = [
    "Never doubt yourself",
    "Treehouse is excellent",
    "Giving Up should never be in your vocabulary",
    "Seize the day",
    "Work down to the bone",
    "Computers are awesome",
];

// Phrases as Phrase objects
const phrases = phraseStrings
    .filter(phraseStr => phraseRegex.test(phraseStr)) // Filter out invalid phrases (contain characters that are not letters or spaces)
    .map(phraseStr => new Phrase(phraseStr));         // Map each string to a Phrase object

// Create new game object
const game = new Game(phrases);

// Hide start screen overlay
const resetDisplay = () => {
    // Get overlay
    const $overlay = $("#overlay")

    $overlay
        // Fade out overlay, then do the following
        .animateCSS("fadeOut faster", () => {
            $overlay
                .addClass("hide")           // Hide overlay after animation is finished
                .removeClass("win lose");   // Remove any win or lose result classes
        });
};

// Disable button on the onscreen keyboard after the respective letter is selected.
const markButton = $button => {
    /*
        Proceed only if the letter has not already been chosen, no animations are currently playing,
        and the game is still being played.
    */
    if (!$button.hasClass("chosen") && $(".animated").length === 0 && game.isPlaying) {
        // Handle button interaction
        game.handleInteraction($button);

        $button
            .prop("disabled", "disabled")   // Disable button
            .addClass("chosen");            // Add "chosen" class to indicate that it has been chosen
    }
};

// Start game when "start game" button is clicked
$("#btn__reset").on("click", () => {
    // Hide overlay
    resetDisplay();

    // Start new game
    game.startGame();
});

$("#qwerty button.key").on("click", event => markButton($(event.target)));
$(document).on("keypress", event => {
    // Continue only if we are playing the game
    if ($("#overlay").hasClass("hide")) {
        // Get character
        const char = String
            .fromCharCode(event.which)  // Convert key character code into string
            .toLowerCase();             // Make it lowercase

        // Continue only if the character is alphabetical
        if (charRegex.test(char))
            // Mark button with matching character
            markButton($(`#qwerty .key:contains('${char}')`));
    }
});
