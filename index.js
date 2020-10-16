const startBtn = document.querySelector(".start-button");
const gameInfo = document.querySelector(".game-info");
const board = document.querySelector(".board");
const tables = document.querySelectorAll(".table-cell");
const scoreDisplay = document.querySelectorAll(".score");
const userDisplay = document.querySelectorAll(".user");

const TURN_CN = "turn";

let isPlaying = false;
let count = 0;
let turn = "O";
let oScore = 0;
let xScore = 0;

function removeClassList() {
  userDisplay.forEach((user) => user.classList.remove(TURN_CN));
}

function gameOver(text) {
  isPlaying = false;
  startBtn.textContent = "RESTART GAME";
  titleChange(text);
}

function titleChange(text) {
  gameInfo.textContent = text;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function gameResult() {
  let arr = [];
  Array.from(tables).forEach((table) => arr.push(table.textContent));
  const result = calculateWinner(arr);

  if (result !== null) {
    gameOver(`${result} win!`);
    removeClassList();
    result === "O" ? oScore += 1 : xScore += 1;
    scoreDisplay[0].textContent = oScore;
    scoreDisplay[1].textContent = xScore;
  } else if (count === 9) {
    gameOver("draw!");
    removeClassList();
  }
}

function handleBoardClick(event) {
  const clickPoint = event.target.textContent;

  if (isPlaying && clickPoint === "") {
    event.target.textContent = turn;
    count += 1;
    count % 2 === 0 ? turn = "O" : turn = "X";
    titleChange(`${turn} turn`);
    userDisplay.forEach((user) => user.classList.toggle(TURN_CN));
    gameResult();
  }
}

function handleStartClick() {
  if (isPlaying) {
    return;
  }

  isPlaying = true;
  count = 0;
  turn = "O";
  Array.from(tables).forEach((table) => table.textContent = "");
  titleChange(`${turn} turn`);
  userDisplay[0].classList.add(TURN_CN);
}

function init() {
  startBtn.addEventListener("click", handleStartClick);
  board.addEventListener("click", handleBoardClick);
}
init();
