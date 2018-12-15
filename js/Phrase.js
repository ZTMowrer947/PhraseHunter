// Phrase.js: Phrase class for creation and management of phrases.

// Regular expression for phrases (can only contain letters and spaces).
const phraseRegex = /^[A-z][A-z ]+$/;

class Phrase {
    // Construct new Phrase object with a given phrase
    constructor(phrase) {
        // Ensure that phrase contains only letters and spaces
        if (phraseRegex.test(phrase))
            // Convert phrase to lower case and then pass it to the instance "phrase" property
            this.phrase = phrase.toLowerCase();
        else
            /* 
                Throw error if phrase is invalid.
                (NOTE)
                Based on how phrases are constructed in the project's current form, 
                this error message would never occur normally because invalid phrases are filtered out before construction.
                
                If I expand this to use a database or something of the sort, however, this error could be used for
                informing the user that some phrases are not available.
            */
            throw new Error("Phrase can only consist of letters and spaces!");
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
    // "static" here means that this method is attached to the class itself, rather than an instance of it.
    static showMatchedLetter(letter) {
        $(`#phrase .${letter}`)     // Get matching letter(s)
            .removeClass("hide")    // Remove "hide" class
            .addClass("show")       // Add "show" class
    }
}
