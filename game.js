let wordGlobal, lives = 5, correctLetters = 0;

function startGame() {
  createBlocks();
  addKeyboard();
  addLivesText();
}

function createBlocks() {
  let word = document.getElementById("wordAdd").value, idLetters = 0, wordLength = word.length;
  wordGlobal = word;
  for (let i = 0; i < wordLength; ++i) {
    let button = document.createElement("button");
    button.id = idLetters;
    button.innerHTML = '';
    button.className = "btn btn-dark wordSpace";
    document.getElementById("word").append(button);
    ++idLetters;
  }
}

function addKeyboard() {
  let number = 97;
  for (let i = 0; i < 26; ++i) {
    let button = document.createElement("button");
    button.id = String.fromCharCode(number);
    button.innerHTML = String.fromCharCode(number);
    button.className = "btn btn-outline-warning wordSpace";
    button.onclick = function() {gameUpdate(this.id)};
    document.getElementById("addKeyboard").append(button);
    ++number;
  }
}

function addLivesText() {
  document.getElementById("livesStatus").style.color = "green";
  document.getElementById("livesStatus").style.fontSize = "x-large";
  document.getElementById("livesStatus").innerHTML = "You have " + lives + " more lives left."
}

function gameUpdate(clicked_id) {
  let wordSplit = wordGlobal.split(''), wordSplitLength = wordGlobal.length;
  checkSolution(wordSplit, wordSplitLength, clicked_id);
  checkEndGame(wordSplitLength);
}

function checkSolution(wordSplit, wordSplitLength, clicked_id) {
  let correct = 0;
  for (let i = 0; i <= wordSplitLength; ++i) {
    if (wordSplit[i] === clicked_id) {
      correct = 1;
      ++correctLetters;
      document.getElementById(i).innerText = clicked_id;
    }
  }
  if (correct === 0) {
    --lives;
    document.getElementById("livesStatus").innerHTML = "You have " + lives + " more lives left."
  }
}

function checkEndGame(wordSplitLength) {
  document.getElementById("endGame").style.color = "red";
  document.getElementById("endGame").style.fontSize = "x-large";
  if (correctLetters === wordSplitLength) {
    document.getElementById("endGame").innerHTML = "Congratulation, you won the game!!!"
    addRestartButton();
  } else if (lives === 0) {
    document.getElementById("endGame").innerHTML = "You lost the game!!!"
    addRestartButton();
  }
}

function addRestartButton() {
  let button = document.createElement("button");
  button.innerHTML = "Restart Game";
  button.className = "btn btn-outline-warning wordSpace";
  button.onclick = function() {restartGame()};
  document.getElementById("restart").append(button);
}

function restartGame() {
  window.location.reload();
}
