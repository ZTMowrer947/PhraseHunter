// Treehouse FSJS Techdegree Unit 4 Project
// app.js: Main scriping application.

// Phrases to use
const phrases = [
    "Hello World",
    "This is a test",
    "This will be replaced",
    "By actual phrases",
    "Later on",
];

// Create new game object
const game = new Game(phrases);

// Hide start screen overlay
const resetDisplay = () => {
    $("#overlay").addClass("hide");
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
