import {KEYBOARD_LETTERS, WORDS} from "./consts.js";

const gameDiv = document.getElementById('game');

const createPlaceholdersHTML = () => {
    const word = sessionStorage.getItem('word');
    const wordArray = Array.from(word);

    const placeholderHTML = wordArray.reduce((acc, curr, i) =>
        acc + `<h1 id="letter_${i}" class="letter"> _ </h1>`, ''
    )

    return `<div id="placeholders" class="placeholders-wrapper">${placeholderHTML}</div>`;
}

export const starGame = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    const wordToGuess = WORDS[randomIndex];
    sessionStorage.setItem('word', wordToGuess);

    gameDiv.innerHTML = createPlaceholdersHTML();
}

console.log(KEYBOARD_LETTERS);