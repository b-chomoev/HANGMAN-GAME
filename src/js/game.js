import {KEYBOARD_LETTERS, WORDS} from "./consts.js";
import hg0 from '../assets/hg-0.png';
import hg1 from '../assets/hg-1.png';
import hg2 from '../assets/hg-2.png';
import hg3 from '../assets/hg-3.png';
import hg4 from '../assets/hg-4.png';
import hg5 from '../assets/hg-5.png';
import hg6 from '../assets/hg-6.png';
import hg7 from '../assets/hg-7.png';
import hg8 from '../assets/hg-8.png';
import hg9 from '../assets/hg-9.png';
import hg10 from '../assets/hg-10.png';
import hgwin from '../assets/hg-win.png';

const gameDiv = document.getElementById('game');
const logoH1 = document.getElementById('logo');

let triesLeft;
let winCount;

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
  image.src = `${hg0}`;
  image.alt = 'hangman image';
  image.classList.add('hangman-img');
  image.id = 'hangman-img';

  return image;
}

const checkLetter = (letter) => {
  const word = sessionStorage.getItem('word');
  const inputLetter = letter.toLowerCase();

  if (!word.includes(inputLetter)) {
    const triesCounter = document.getElementById('tries-left');
    triesLeft -= 1;
    triesCounter.innerText = triesLeft;

    const hangmanImg = document.getElementById('hangman-img');
    const hangmanImages = [hg0, hg1, hg2, hg3, hg4, hg5, hg6, hg7, hg8, hg9, hg10];
    hangmanImg.src = hangmanImages[10 - triesLeft];

    if (triesLeft === 0) {
      stopGame('lose');
    }
  } else {
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (currentLetter === inputLetter) {
        winCount += 1;
        if (winCount === word.length) {
          stopGame('win');
          return;
        }
        document.getElementById(`letter_${i}`).innerText = inputLetter.toUpperCase();
      }
    })
  }
}

const stopGame = (status) => {
  document.getElementById('placeholders').remove();
  document.getElementById('tries').remove();
  document.getElementById('keyboard').remove();
  document.getElementById('quit').remove();

  const word = sessionStorage.getItem('word');

  if (status === 'win') {
    document.getElementById('hangman-img').src = hgwin;
    document.getElementById('game').innerHTML += '<h2 class="result-header win">You won!</h2>';
  } else if (status === 'lose') {
    document.getElementById('game').innerHTML += '<h2 class="result-header lose">You lost :(</h2>';
  } else if (status === 'quit') {
    logoH1.classList.remove('logo-sm')
    document.getElementById('hangman-img').remove();
  }

  document.getElementById('game').innerHTML += `<p class="word">The word was: 
    <span class="result-word">${word}</span></p> 
    <button id="play-again" class="button-primary px-5 py-5 mt-5">Start new game</button>`;

  document.getElementById('play-again').onclick = startGame;
}

export const startGame = () => {
  triesLeft = 10;
  winCount = 0;

  logoH1.classList.add('logo-sm')
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem('word', wordToGuess);

  gameDiv.innerHTML = createPlaceholdersHTML();

  gameDiv.innerHTML += '<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">10</span></p>'

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'button') {
      event.target.disabled = true;
      checkLetter(event.target.id)
    }
  })

  const hangmanImg = createHangmanImg();

  gameDiv.prepend(hangmanImg);
  gameDiv.appendChild(keyboardDiv);

  gameDiv.insertAdjacentElement('beforeend', '<button id="quit" class="button-secondary px-2 py-1 mt-4">Quit</button>')

  document.getElementById('quit').onclick = () => {
    const isSure = confirm('Are you sure you want to quit and lose progress?');
    if (isSure) {
      stopGame('quit');
    }
  }
}
