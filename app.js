const x = "x";
const o = "o";
let oTurn;
const winimgCollection = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// Select DOM
const cellEl = document.querySelectorAll(".cell");
const bord = document.querySelector("#bord");
const popText = document.querySelector("[data-pop-text]");
const restartBtn = document.querySelector("#restart-btn");
// Event Listener
startGame();
restartBtn.addEventListener("click", startGame);
// Function
function startGame() {
  oTurn = false;
  cellEl.forEach((cell) => {
    cell.classList.remove(x);
    cell.classList.remove(o);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  showHover();
  popText.parentElement.classList.remove("show");
}
function handleClick(cells) {
  // Show Turn
  let cell = cells.target;
  const currentClass = oTurn ? o : x;
  cell.classList.add(currentClass);
  // Check Win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDrow()) {
    endGame(true);
  } else {
    oTurn = !oTurn;
    showHover();
  }
}
function showHover() {
  bord.classList.remove("x");
  bord.classList.remove("o");
  if (oTurn) {
    bord.classList.add("o");
  } else {
    bord.classList.add("x");
  }
}
function checkWin(currentClass) {
  return winimgCollection.some((comb) => {
    return comb.every((index) => {
      return cellEl[index].classList.contains(currentClass);
    });
  });
}
function endGame(drow) {
  if (drow) {
    popText.innerText = "Drow!";
  } else {
    popText.innerText = `${oTurn ? "O's" : "X's"} Wins`;
  }
  popText.parentElement.classList.add("show");
}
function isDrow() {
  return [...cellEl].every((cell) => {
    return cell.classList.contains(x) || cell.classList.contains(o);
  });
}
