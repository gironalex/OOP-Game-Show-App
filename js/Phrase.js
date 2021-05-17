/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 /*****************
* Global Variables
******************/
const phraseDOMChild = document.querySelector('#phrase ul');
const phraseHtmlCollectionDOM = document.getElementsByClassName('letter');

/*************
* Phrase Class
**************/

class Phrase {
    constructor(phrase) {
    this.phrase = phrase.toLowerCase();
    }

    /**
    * Adds letter placeholders to the display when the game starts.
    * @return {innerHTML} - html syntax of the letters in the phrase.
    **/
    addPhraseToDisplay() {
        let phraseToDisplay = '';
        this.phrase.split('').forEach(letter => {
            if (letter === ' ') {
                phraseToDisplay += `<li class="space"> </li>`;
            } else {
                phraseToDisplay += `<li class="hide letter ${letter}">${letter}</li>`;
            }
        });
        return phraseDOMChild.innerHTML = phraseToDisplay;
    }

    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    * @return (boolean) - True if the letter is in the phrase, false if it is not
    **/
    checkLetter(letter) {
        return this.phrase.split('').includes(letter);
    };

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    **/
    showMatchedLetter(letter) {  
        Array.from(phraseHtmlCollectionDOM).forEach(element => {
            this.checkLetter(letter) && letter === element.textContent ? element.className = `show letter ${letter}` : null;
        });
    }

}