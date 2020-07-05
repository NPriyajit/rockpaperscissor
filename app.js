const selectionList = [
  { name: "rock", sign: "✊", beats: "scissor" },
  { name: "paper", sign: "✋", beats: "rock" },
  { name: "scissor", sign: "✌️", beats: "paper" },
];
const endCol = document.querySelector("[data-final-column]");
const selectionBtns = document.querySelectorAll("[data-item]");
const yourScoreSpan = document.querySelector("#yourScore");
const computerScoreSpan = document.querySelector("#computerScore");
const newGame = document.querySelector(".button");

function main() {
  selectionBtns.forEach((selectionBtn) => {
    selectionBtn.addEventListener("click", (e) => {
      let selected = selectionBtn.dataset.item;
      manipulate(selected);
    });
  });
  //Resting to new game
  newGame.addEventListener("click", () => {
    document.querySelectorAll(".output").forEach(function (a) {
      a.remove();
    });
    yourScoreSpan.innerText = "0";
    computerScoreSpan.innerText = "0";
  });
}

function manipulate(selected) {
  let yourItem = selectionList.find(
    (selectItem) => selectItem.name === selected
  );
  let getComputer = () => {
    return selectionList[Math.floor(Math.random() * selectionList.length)];
  };
  let computerItem = getComputer();
  const computerWinner = isWinner(computerItem, yourItem);
  const youWinner = isWinner(yourItem, computerItem);
  setResult(computerItem, computerWinner);
  setResult(yourItem, youWinner);
  if (youWinner) incrementScore(yourScoreSpan);
  if (computerWinner) incrementScore(computerScoreSpan);
}

function isWinner(me, opponent) {
  return me.beats == opponent.name;
}

function setResult(selection, winner) {
  const div = document.createElement("div");
  div.classList.add("output");
  div.innerText = selection.sign;
  if (winner) div.classList.add("winner");
  endCol.after(div);
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

window.addEventListener("load", main);
