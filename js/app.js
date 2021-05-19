/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/*****************
* Global Variables
******************/
const startGameButton = document.getElementById('btn__reset');
let game;
const keysDOM = document.querySelector('#qwerty');

/************************
* Start Game / Reset Game
*************************/
startGameButton.addEventListener('click', () => {
        game = new Game();
        game.startGame();
});

/***************************************
* Playing the Game w/ on Screen Keyboard
****************************************/
keysDOM.addEventListener('click', (e) => {
    e.target && e.target.nodeName == "BUTTON" ? game.handleInteraction(e.target) : null;
})

/**************************************
* Playing the Game w/ Physical Keyboard
***************************************/
window.addEventListener('keydown', (e) => {
    if(game && overlayDOM.style.visibility == 'hidden'){
        Array.from(keysButtonDOM).forEach(button => {
            button.textContent === e.key.toLowerCase() ? game.handleInteraction(button): null;
        });
    }
})

