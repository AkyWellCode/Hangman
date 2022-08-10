var wordGlobal, lives = 5, correctLetters = 0;

function addWordAndKeyboard() {
  var word = document.getElementById("wordAdd").value, wordToGuess = document.getElementById("word"), addKeyboard = document.getElementById("addKeyboard"), livesStatus = document.getElementById("livesStatus"),  number = 97, idLetters = 0;
  const wordLength = word.length, numberOfLetters = 26;
  wordGlobal = word;
  for (let i = 0; i < wordLength; ++i) { /* word buttons */
    var button = document.createElement("button");
    button.id = idLetters;
    button.innerHTML = '';
    button.className = "btn btn-dark wordSpace";
    wordToGuess.append(button);
    ++idLetters;
  }
  for (let i = 0; i < numberOfLetters; ++i) { /* Add Keyboard */
    var letter = String.fromCharCode(number);
    var button = document.createElement("button");
    button.id = letter;
    button.innerHTML = letter;
    button.className = "btn btn-outline-secondary wordSpace";
    button.onclick = function() {enterLetters(this.id)};
    addKeyboard.append(button);
    ++number;
  }
  livesStatus.style.color = "green";
  livesStatus.style.fontSize = "x-large";
  livesStatus.innerText = "You have " + lives + " more lives"; /* Add the status of lives text */
  return false;
}

function enterLetters(clicked_id) {
  var wordSplit = wordGlobal.split(''), wordSplitLength = wordGlobal.length, wrongLetter = 0, restart = document.getElementById("restart"), restartButton = document.createElement("button");;
  for (let i = 0; i <= wordSplitLength; ++i) { /* If we click on a correct letter -> we add the letter on the right assigned box */
    if (wordSplit[i] == clicked_id) {
      ++correctLetters;
      wrongLetter = 1;
      var changeName = document.getElementById(i);
      changeName.innerText = clicked_id;
    }
  }
  if (correctLetters === wordSplitLength) { /* Win alert + restart button */
    alert("You won the game!!!");
    restartButton.innerHTML = "Restart Game";
    restartButton.className = "btn btn-outline-warning btn-lg";
    restartButton.onclick = () => {
       window.location.reload();
    }
    restart.append(restartButton);
  }
  if (wrongLetter === 0 && lives > 1) { /* Display how many lives do we have (we don't lost yet) */
    --lives;
    document.getElementById("livesStatus").innerHTML = "You have " + lives + " more lives";
  } else if (wrongLetter === 0 && lives === 1) { /* Game lost alert + restart button */
    alert("You lost the game!!!");
    --lives;
    document.getElementById("livesStatus").innerHTML = "You have " + lives + " more lives";
    restartButton.innerHTML = "Restart Game";
    restartButton.className = "btn btn-outline-warning btn-lg";
    restartButton.onclick = () => {
       window.location.reload();
    }
    restart.append(restartButton);
  }
  return false;
}
