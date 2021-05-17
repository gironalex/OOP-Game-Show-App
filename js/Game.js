/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 /*****************
* Global Variables
******************/
const overlayDOM = document.getElementById('overlay');
const heartTriesHtmlDocumentDOM = document.querySelectorAll('.tries img');
const gameOverMessageDOM = document.getElementById('game-over-message');
const keysButtonDOM = document.querySelectorAll('.keyrow button');

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
        if (this.activePhrase.checkLetter(button.textContent)) {
            this.activePhrase.showMatchedLetter(button.textContent);
            button.classList.add('chosen');
            button.disabled = true;
            this.checkForWin() ? this.gameOver(true) : null;      
        } else { 
            this.removeLife();
            button.classList.add('wrong');
            button.disabled = true;
        }
    };

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't won
    **/
    checkForWin() {
        let isGameWon;
        Array.from(phraseHtmlCollectionDOM).forEach(element => {
           if (element.classList.contains('hide')) {
               isGameWon = false;
           } else {
               isGameWon = true;
           } 
        });
        return isGameWon
    };

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        this.missed++
        if (this.missed === 1) {
            heartTriesHtmlDocumentDOM[0].src = 'images/lostHeart.png';
        } else if (this.missed === 2) {
            heartTriesHtmlDocumentDOM[1].src = 'images/lostHeart.png';
        } else if (this.missed === 3) {
            heartTriesHtmlDocumentDOM[2].src = 'images/lostHeart.png';
        } else if (this.missed === 4) {
            heartTriesHtmlDocumentDOM[3].src = 'images/lostHeart.png';
        } else if (this.missed === 5) {
            heartTriesHtmlDocumentDOM[4].src = 'images/lostHeart.png';
            this.gameOver(this.checkForWin());
        }
    };

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    **/
    gameOver(gameWon) {
        if (gameWon) {
            overlayDOM.className = 'win';
            gameOverMessageDOM.textContent = 'Great job!';
            overlayDOM.style.visibility = 'visible';
            this.reset();
        } else {
            overlayDOM.className = 'lose';
            gameOverMessageDOM.textContent = 'Sorry, better luck next time!';
            overlayDOM.style.visibility = 'visible';
            this.reset();
        }
    };

    /**
    * resets the game to its initial state
    **/
    reset() {
        phraseDOMChild.children.innerHTML = '';
        
        Array.from(keysButtonDOM).forEach(key => {
            key.classList.remove('chosen');
            key.classList.remove('wrong');
            key.disabled = false;
        });
        
        Array.from(heartTriesHtmlDocumentDOM).forEach(image => {
            image.src = 'images/liveHeart.png';
        });
    }
 }
