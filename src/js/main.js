import '../css/style.css';
import {darkModeHandler} from "./utils.js";

darkModeHandler();

const startGameButton = document.getElementById('startGame');
startGameButton.addEventListener('click', () => {
    console.log('button clicked');
})



