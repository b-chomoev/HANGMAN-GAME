import {KEYBOARD_LETTERS, WORDS} from "./consts.js";

const gameDiv = document.getElementById('game');
const logoH1 = document.getElementById('logo');

const createPlaceholdersHTML = () => {
  const word = sessionStorage.getItem('word');
  const wordArray = Array.from(word);

  const placeholderHTML = wordArray.reduce((acc, curr, i) =>
    acc + `<h1 id="letter_${i}" class="letter"> _ </h1>`, ''
  )

  return `<div id="placeholders" class="placeholders-wrapper">${placeholderHTML}</div>`;
}

const createKeyboard = () => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  keyboard.id = 'keyboard';

  const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, curr) => {
    return acc + `<button class="button-primary keyboard-button" id="${curr}">${curr}</button>`
  }, '');

  keyboard.innerHTML = keyboardHTML;
  return keyboard;
}

const createHangmanImg = () => {
  const image = document.createElement('img');
  image.src = '../../images/hg-5.png';
  image.alt = 'hangman image';
  image.classList.add('hangman-img');
  image.id = 'hangman-img';

  return image;
}

export const starGame = () => {
  logoH1.classList.add('logo-sm')
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem('word', wordToGuess);

  gameDiv.innerHTML = createPlaceholdersHTML();

  gameDiv.innerHTML += '<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">10</span></p>'

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener('click', (event) => {
    console.log(event.target.id);
  })

  const hangmanImg = createHangmanImg();

  gameDiv.prepend(hangmanImg);
  gameDiv.appendChild(keyboardDiv);
}