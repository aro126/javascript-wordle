const inputs = document.querySelector(".inputs"),
    resetBtn = document.querySelector(".reset-btn"),
    typingInput = document.querySelector(".typing-input");

let word, guess = 0, letter = 0, currInput = 0;

// Selects a random word for the game
function randomWord() {
    word = wordList[Math.floor(Math.random() * wordList.length)];
    guess = 0, letter = 0, currInput = 0;

    let html = "";
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < word.length; i++) {
            html += `<input id="word` + j.toString() + `char` + i.toString() + `" type="text" disabled>`;
            inputs.innerHTML = html;
        }
    }
    inputs.style.gridTemplateColumns = ((100 / word.length).toString() + "% ").repeat(word.length);
}
randomWord();

// Takes in an input element and checks if it's value is in the word
function checkLetter(input) {
    let ind = 0;
    let key = input.value;
    if (word.includes(key)) {
        ind = Number(input.id.charAt(input.id.length - 1));
        if (word[ind] == key) {
            input.style.backgroundColor = "green";
            //inputs.querySelectorAll("input")[i].value = key;
            return 1;
        } else {
            input.style.backgroundColor = "yellow";
        }
    } else {
        input.style.backgroundColor = "red";
    }
    return 0;
}

// Checks current word and, if correct, calls correctGuess()
function guessWord() {
    let currGuess = word.length * guess;
    let correct = 0;
    for (let i = 0; i < word.length; i++) {
        correct += checkLetter(inputs.querySelectorAll("input")[currGuess + i]);
    }
    if (correct == word.length) {
        correctGuess();
    } else if (guess == 4) {
        wrongGuess();
    } else {
        guess++;
        letter = 0;
    }
}

// Alerts player that they've won the game
function correctGuess() {
    alert(`Congrats! You found the word ${word.toUpperCase()}`);
    return randomWord();
}

// Alerts player that they're out of guesses and lets them know the correct word
function wrongGuess() {
    alert(`Sorry! The correct word was ${word.toUpperCase()}`);
    return randomWord();
}

// Keeps track of current input value
function letterGuess(e) {
    let key = e.target.value.toLowerCase();
    if (key.match(/^[A-Za-z]+$/) && letter < word.length) {
        inputs.querySelectorAll("input")[currInput].value = key;
        letter++;
        currInput++;
    }
    typingInput.value = "";
}

function specialKeys(e) {
    let key = e.key;
    if (key == "Backspace" && letter != 0) {
        letter--;
        currInput--;
        inputs.querySelectorAll("input")[currInput].value = "";
    } else if (key == "Enter" && letter == word.length) {
        guessWord();
    }
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", letterGuess);
typingInput.addEventListener("keyup", specialKeys)
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());