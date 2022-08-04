var wordGlobal, lives = 5, correctLetters = 0;

function addWordAndKeyboard() {
  var word = $('#wordAdd').val();
  var wordLength = word.length;
  var numberOfLetters = 26, number = 97, idLetters = 0;
  wordGlobal = word;
  while (wordLength > 0) { /* Assign one box for every letter of the word */
    --wordLength;
    $('#addWord').append(`
      <button type="button" class="btn btn-dark btn-lg" id="`+ idLetters +`"></button>
      `)
    ++idLetters;
  }
  while (numberOfLetters >= 1) { /* Add Keyboard */
    var letter = String.fromCharCode(number)
    --numberOfLetters;
    $('#addKeyboard').append(`
    <button type="button" class="btn btn-outline-secondary" id="`+ letter +`" onClick="return enterLetters(this.id)">`+ letter +`</button>
      `)
    ++number;
  }
  $('#livesStatus').append(`
    <p style="color:green; font-size: 35px;" id="livesLeft"> You have `+ lives +` more lives</p>
  `); /* Add the status of lives text */
  return false;
}

function enterLetters(clicked_id) {
  var letter = clicked_id, wordSplit = wordGlobal.split(''), wordSplitLength = wordGlobal.length, wrongLetter = 0;
  for (var i = 0; i <= wordSplitLength; ++i) { /* If we click on a correct letter -> we add the letter on the right assigned box */
    if (wordSplit[i] == letter) {
      ++correctLetters;
      wrongLetter = 1;
      $('#'+ i +'').html(letter);
    }
  }
  if (correctLetters == wordSplitLength) { /* Win alert + restart button */
    alert("You won the game!!!");
    $('#restart').append(`
      <button type="button" class="btn btn-outline-warning btn-lg" onClick="return restart()">Restart game</button>
    `)
  }
  if (wrongLetter == 0 && lives > 1) { /* Display how many lives do we have (we don't lost yet) */
    --lives;
    $('#livesLeft').remove();
    $('#livesStatus').append(`
      <p style="color:green; font-size: 35px;" id="livesLeft"> You have `+ lives +` more lives</p>
    `);
  } else if (wrongLetter == 0 && lives == 1) { /* Game lost alert + restart button */
    alert("You lost the game!!!");
    $('#restart').append(`
      <button type="button" class="btn btn-outline-warning btn-lg" onClick="return restart()">Restart game</button>
      `)
  }
  return false;
}

function restart() { /* Refresh page on button click */
  window.location.reload();
}
