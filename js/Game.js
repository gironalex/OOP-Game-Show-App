/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 /*****************
* Global Variables
******************/
const overlayDOM = document.getElementById('overlay');
const gameOverMessageDOM = document.getElementById('game-over-message');
const keysButtonDOM = document.querySelectorAll('.keyrow button');
const heartTriesHtmlDocumentDOM = document.querySelectorAll('.tries img');

/***********
* Game Class
************/
 class Game {
     constructor() {
         this.missed = 0;
         this.phrases = this.createPhrases();
         this.activePhrase = null;
     }

    /**
    * Creates phrases for use in game
    * @return {array} An array of phrase objects that could be used in the game
    **/
    createPhrases() {
        const phrasesArray = [
                                new Phrase('A piece of cake'),
                                new Phrase('Barking up the wrong tree'),
                                new Phrase('Curiosity Killed The Cat'),
                                new Phrase('Cry Over Spilled Milk'),
                                new Phrase('Burst Your Bubble'),
                                new Phrase('May the force be with you'),
                                new Phrase('Your guess is as good as mine'),
                                new Phrase('Life is like a box of chocolates'),
                                new Phrase('Hit the nail on the head'),
                                new Phrase('The whole nine yards')
                             ];
        return phrasesArray
    };

    /** 
    * Selects random phrase from phrases property 
    * @return {Object} - Phrase object chosen to be used 
    **/ 
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    /**
    * Begins game by selecting a random phrase and displaying it to user
    **/
    startGame() {
        overlayDOM.style.visibility = 'hidden';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    };

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    **/
    handleInteraction(button) {
        if(button.disabled === false){
            if (this.activePhrase.checkLetter(button.textContent)) {
                    this.activePhrase.showMatchedLetter(button.textContent);
                    button.classList.add('chosen');
                    button.disabled = true;   
            } else if (!this.activePhrase.checkLetter(button.textContent)) { 
                    button.classList.add('wrong');
                    button.disabled = true;
                    this.removeLife();
            }
            this.checkForWin() ? this.gameOver(true) : null;
        } 
    };

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't won
    **/
    checkForWin() {
        return document.querySelectorAll('.letter').length === document.querySelectorAll('.show').length;
    };

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        this.missed++
        heartTriesHtmlDocumentDOM[this.missed-1].src = 'images/lostHeart.png';
        if (this.missed === 5) {
            heartTriesHtmlDocumentDOM[this.missed-1].src = 'images/lostHeart.png';
            this.gameOver(false);
        }
    };

    /**
    * Displays game over message, later resets the game to its initial values.
    * @param {boolean} gameWon - Whether or not the user won the game
    **/
    gameOver(gameWon) {
        if (gameWon) {
            overlayDOM.className = 'win';
            gameOverMessageDOM.textContent = 'Great job! You got the phrase!';
            overlayDOM.style.visibility = 'visible';
        } else {
            overlayDOM.className = 'lose';
            gameOverMessageDOM.textContent = `Oh no, the correct phrase was: '${this.activePhrase.phrase}'`;
            overlayDOM.style.visibility = 'visible';
        }
        this.reset();
    };

    /**
    * Resets the game after the gameOver method
    * Items to reset: the missed count, deleting the phrase HTML children, the keys, and the image hearts.
    **/
    reset() {
        this.missed = 0;
        phraseDOMChild.children.innerHTML = '';
        Array.from(keysButtonDOM).forEach(key => {
            key.disabled = false;
            key.classList.remove('chosen', 'wrong');
        });
        Array.from(heartTriesHtmlDocumentDOM).forEach(image => {
            image.src = 'images/liveHeart.png';
        });
    }
 }