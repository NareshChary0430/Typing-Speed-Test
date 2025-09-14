const typingText = document.querySelector('.text-typing p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
  const paragraph = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing is a fundamental skill that can enhance productivity and communication.",
    "Practice makes perfect, so keep typing to improve your speed and accuracy.",
    "JavaScript is a versatile programming language used for web development.",
    "Consistent practice can lead to significant improvements in typing speed."
  ];

  const randomIndex = Math.floor(Math.random() * paragraph.length);
  typingText.innerHTML = '';
  for(const char of paragraph[randomIndex]){
    typingText.innerHTML += `<span>${char}</span>`;
  }
  typingText.querySelectorAll('span')[0].classList.add('active');
  document.addEventListener('keydown', () => input.focus());
  typingText.addEventListener('click', () => input.focus());
}

function startTimer() {
  if (timeLeft > 0) {
    timer = setInterval(() => {
      timeLeft--;
      time.innerText = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timer);
        input.disabled = true;
      }
    }, 1000);
  }
}

function initTyping() {
  const characters = typingText.querySelectorAll('span');
  let typedChar = input.value.split('')[charIndex];

  if (!isTyping) {
    startTimer();
    isTyping = true;
  }

  if (typedChar == null) {
    characters[charIndex].classList.remove('active');
    return;
  }

  if (typedChar === characters[charIndex].innerText) {
    characters[charIndex].classList.remove('active');
    charIndex++;
    if (charIndex < characters.length) {
      characters[charIndex].classList.add('active');
    } else {
      clearInterval(timer);
      input.disabled = true;
    }
  } else {
    mistake++;
  }

  mistakes.innerText = mistake;
  let timeSpent = maxTime - timeLeft;
  wpm.innerText = timeSpent > 0 ? Math.floor(((charIndex - mistake) / 5) / (timeSpent / 60)) : 0;
  cpm.innerText = charIndex - mistake;
}

function resetGame() {
  clearInterval(timer);
  loadParagraph();
  input.value = '';
  timeLeft = maxTime;
  charIndex = 0;
  mistake = 0;
  isTyping = false;
  time.innerText = maxTime;
  mistakes.innerText = 0;
  wpm.innerText = 0;
  cpm.innerText = 0;
  input.disabled = false;
}

loadParagraph();
input.addEventListener('input', initTyping);
btn.addEventListener('click', resetGame);
