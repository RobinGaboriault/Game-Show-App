
/* Variables */ 

var missed = 0;
const startButton = document.querySelector('a.btn__reset');
var qwerty = document.getElementById("qwerty");


var phrases = [
    "Hello There",
    "Fancy meeting you here",
    "I wish to speak to your manager",
    "Join the dark side, we have cookies",
    "So uncivilised"
];

/* Create a random number  */
function randomPhrase(array) {
  return array[Math.round(Math.random() * (array.length - 1))].split('');
}


/* Take array from above and append elements    */
function displayRandomPhrase(array) {
  for (let i= 0; i < array.length; i++) {
    const li = document.createElement('li');
    li.textContent = array[i].toUpperCase();
    document.querySelector('ul').appendChild(li);
    if(array[i] != ' ') {
      li.classList.add('letter');
    } else {
      li.classList.add('space');
    }
  }
 }

/*Show if the letter clickec is present or not  */
function verifyLetter(button) {
  const letters = document.querySelectorAll('.letter');
  let game = null;
  
  for (let i = 0; i < letters.length; i++) {
    if (button.textContent.toUpperCase() == letters[i].textContent) {
      game = button.textContent;
      letters[i].classList.add('found');
    }
  }
  return game;
}


function verifyWin() {
 const foundLetters = document.querySelectorAll('.found');
 const letters = document.querySelectorAll('.letter');
 const overlay = document.querySelector('#overlay');
 
 if (foundLetters.length == letters.length) {
   overlay.classList.replace('start', 'win');
   overlay.children[0].textContent = 'You Win!';
   overlay.children[1].textContent = 'Play anothe round!';
   overlay.style.display = '';
  } else if (missed === 5) {
   overlay.classList.replace('start', 'lose');
   overlay.children[0].textContent = 'You lost!';
   overlay.children[1].textContent = 'Better luck next time';
   overlay.display.style = '';
  }
}

/* Replay game */
function replay() {
  location.reload();
}



/* Start game or reset it */
startButton.addEventListener('click', () => {
  if (startButton.textContent === 'Start Game') {
    startButton.parentElement.style.display = 'none';
  } else {
    replay();
  }
});


/* Listen for click keyboard letters */

qwerty.addEventListener('click', (event) => {
  const buttonClick = event.target;
  
  if (event.target.tagName === 'BUTTON') {
    buttonClick.className = 'chosen';
    buttonClick.disabled = true;
    
    const letterFound = verifyLetter(buttonClick);
    
    if (letterFound === null) {
      missed += 1;
    }
    
    if (missed >= 1 && missed <= 5) {
      const lives = document.getElementsByTagName('img');
      lives[missed - 1].src = 'images/lostHeart.png';
    }
  }
  verifyWin();
});



/* Initiate game */ 
const phrasesArray = randomPhrase(phrases);
displayRandomPhrase(phrases);