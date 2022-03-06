const fallBackWords = [
  "the",
  "of",
  "and",
  "a",
  "to",
  "in",
  "is",
  "you",
  "that",
  "it",
  "he",
  "was",
  "for",
  "on",
  "are",
  "as",
  "with",
  "his",
  "they",
  "I",
  "at",
  "be",
  "this",
  "have",
  "from",
  "or",
  "one",
  "had",
  "by",
  "word",
  "but",
  "not",
  "what",
  "all",
  "were",
  "we",
  "when",
  "your",
  "can",
  "said",
  "there",
  "use",
  "an",
  "each",
  "which",
  "she",
  "do",
  "how",
  "their",
  "if",
  "will",
  "up",
  "other",
  "about",
  "out",
  "many",
  "then",
  "them",
  "these",
  "so",
  "some",
  "her",
  "would",
  "make",
  "like",
  "him",
  "into",
  "time",
  "has",
  "look",
  "two",
  "more",
  "write",
  "go",
  "see",
  "number",
  "no",
  "way",
  "could",
  "people",
  "my",
  "than",
  "first",
  "water",
  "been",
  "call",
  "who",
  "oil",
  "its",
  "now",
  "find",
  "long",
  "down",
  "day",
  "did",
  "get",
  "come",
  "made",
  "may",
  "part",
];

// fetch("https://random-word-api.herokuapp.com/word?number=100")
//   .then((res) => res.json())
//   .then((data) => {
//     words = data || fallBackWords;
//     btnPlayRef.addEventListener("click", startGame);
//     btnPlayAgainRef.addEventListener("click", startGame);
//   });

const currentWordRef = document.querySelector(".current-word");
const typedWordRef = document.querySelector("#typed-word");
const resultMsgRef = document.querySelector(".result-msg");
const resultIconRef = document.querySelector(".result-icon");
const scoreCountRef = document.querySelector("#score-count");

const correctRef = document.querySelector(".middle-left");
const incorrectRef = document.querySelector(".middle-right");

const modalPlayRef = document.querySelector(".modal-play");
const modalPlayAgainRef = document.querySelector(".modal-play-again");

const btnPlayRef = document.querySelector("#btn-play");
const btnPlayAgainRef = document.querySelector("#btn-play-again");

let words = fallBackWords;
let currentIdx = -1;
let score = 0;
let speed = 0.3;

btnPlayRef.addEventListener("click", startGame);
btnPlayAgainRef.addEventListener("click", startGame);

function startGame() {
  setNewWord();
  score = 0;
  scoreCountRef.innerHTML = 0;
  correctRef.innerHTML = "";
  incorrectRef.innerHTML = "";
  modalPlayRef.classList.add("hide");
  modalPlayAgainRef.classList.add("hide");
  setTimeout(wordFrame, 500);
}

function setNewWord() {
  currentIdx = parseInt(Math.random() * words.length);
  currentWordRef.innerText = words[currentIdx];
}

let posY = 0;
function wordFrame() {
  if (correctRef.childElementCount === 10) {
    resultMsgRef.innerText = "You win";
    resultIconRef.style.transform = "rotate(0deg)";
    modalPlayAgainRef.classList.remove("hide");
    return;
  } else if (incorrectRef.childElementCount === 10) {
    resultMsgRef.innerText = "You lose";
    resultIconRef.style.transform = "rotate(65deg)";
    modalPlayAgainRef.classList.remove("hide");
    return;
  }

  if (score === 3) {
    speed = 0.4;
  } else if (speed === 7) {
    speed = 0.6;
  }

  if (parseInt(posY) == 100) {
    pushIncorrect(words[currentIdx]);
    setNewWord();
    posY = 0;
  } else {
    posY += speed;
    currentWordRef.style.top = `${posY}%`;
  }

  requestAnimationFrame(wordFrame);
}

function pushIncorrect(word) {
  scoreCountRef.innerText = --score;
  incorrectRef.innerHTML =
    `<div class="incorrect-word">${word}</div>` + incorrectRef.innerHTML;
}

function pushCorrect(word) {
  scoreCountRef.innerText = ++score;
  correctRef.innerHTML =
    `<div class="correct-word">${word}</div>` + correctRef.innerHTML;
}

typedWordRef.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (e.target.value === words[currentIdx]) {
      pushCorrect(words[currentIdx]);
      setNewWord();
      typedWordRef.value = "";
      posY = 0;
    }
  }
});
