// Phrase.js: Phrase class for creation and management of phrases.
class Phrase {
    // Construct new Phrase object with a given phrase
    constructor(phrase) {
        this.phrase = phrase;
    }

    /* 
        Add letter placeholders to display when game starts,
        Replacing each placeholder with the letter when correctly guessed.
    */
    addPhraseToDisplay() {
        // Get phrase ul
        const phraseUl = $("#phrase ul");

        // Split phrase into each character
        const phraseCharacters = this.phrase.split("");

        // Add each character to phrase ul
        phraseCharacters.forEach(char => {
                // Determine classes for new element
                const classList = `hide ${
                    char === " " ?      // If character is a space
                    "space" :           // Add "space" class
                    `letter ${char}`    // Otherwise, add "letter" classes along with class of character itself
                }`;

                // Create and add character to unordered list
                $("<li></li>")              // Create list item
                    .text(char)             // Set text to the character
                    .addClass(classList)    // Add proper classes
                    .appendTo(phraseUl);    // Append to unordered list
        });
    }

    // Check if selected letter matches a letter in the phrase
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    // Reveal letter on board that matches selection
    static showMatchedLetter(letter) {
        $(`#phrase .${letter}`)     // Get matching letter(s)
            .removeClass("hide")    // Remove "hide" class
            .addClass("show")       // Add "show" class
    }
}
