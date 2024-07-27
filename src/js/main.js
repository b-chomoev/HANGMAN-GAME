import '../css/style.css';
import {darkModeHandler} from "./utils.js";
import {startGame} from "./game.js";

darkModeHandler();

const startGameButton = document.getElementById('startGame');
startGameButton.addEventListener('click', startGame);



