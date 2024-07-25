import '../css/style.css';
import {darkModeHandler} from "./utils.js";
import {starGame} from "./game.js";

darkModeHandler();

const startGameButton = document.getElementById('startGame');
startGameButton.addEventListener('click', starGame);



