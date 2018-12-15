// Treehouse FSJS Techdegree Unit 4 Project
// app.js: Main scriping application.

// Phrases as strings
const phraseStrings = [
    "Hello World",
    "This is a test",
    "This will be replaced",
    "By actual phrases",
    "Later on",
];

// Phrases as Phrase objects
const phrases = phraseStrings
    .filter(phraseStr => phraseRegex.test(phraseStr)) // Filter out invalid phrases (contain characters that are not letters or spaces)
    .map(phraseStr => new Phrase(phraseStr));         // Map each string to a Phrase object

// Create new game object
const game = new Game(phrases);

// Hide start screen overlay
const resetDisplay = () => {
    $("#overlay")
        .addClass("hide")
        .removeClass("win lose");
};

// Disable button on the onscreen keyboard after the respective letter is selected.
const markButton = $button => {
    $button
        .prop("disabled", "disabled")
        .addClass("chosen");

    game.handleInteraction($button)
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

        // Mark button with matching character
        markButton($(`#qwerty .key:contains('${char}')`));
    }
});
