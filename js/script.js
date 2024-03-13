const gussedDisplay = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector("#letter");
const progressDisplay = document.querySelector(".word-in-progress");
const remainingDisplay = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];

let remainingGuesses = 8;

getWord();

async function getWord() {
	const response = await fetch(
		"https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
	);
	const words = await response.text();
	const wordArray = await words.split("\n");
	const randomIndex = Math.floor(Math.random() * wordArray.length);
	const randomWord = wordArray[randomIndex].trim();

	word = randomWord;
	createPlaceholders(randomWord);
}

function createPlaceholders(word) {
	const secretWord = word.split("");
	const placeholder = [];

	for (let letter of secretWord) {
		placeholder.push("●");
	}

	progressDisplay.innerText = placeholder.join("");
}

guessButton.addEventListener("click", function (e) {
	e.preventDefault();
	const letter = letterInput.value;
	letterInput.value = "";
	message.innerHTML = "";

	const playersInput = checkInput(letter);

	if (playersInput) {
		makeGuess(playersInput);
	}
});

function checkInput(input) {
	const acceptedLetter = /[a-zA-Z]/;

	if (input.length <= 0) {
		message.innerHTML = "No letter provided! Please enter a letter.";
		return;
	}
	if (input.length > 1) {
		message.innerHTML = "Please enter a single letter from A-Z.";
		return;
	}
	if (!input.match(acceptedLetter)) {
		message.innerHTML = "Invalid character entered. Enter a letter.";
		return;
	}
	return input;
}

function makeGuess(letter) {
	const capLetter = letter.toUpperCase();
	console.log(capLetter);
	if (guessedLetters.includes(capLetter)) {
		message.innerHTML = `You've already tried letter ${capLetter}. Try again.`;
	} else {
		guessedLetters.push(capLetter);
		showGuessedLetters();
		countGuesses(capLetter);
		checkForMatches(guessedLetters);
	}
}

function showGuessedLetters() {
	gussedDisplay.innerHTML = "";
	const newList = guessedLetters.map(function (item) {
		return `<li>${item}</li>`;
	});
	gussedDisplay.innerHTML = newList.join("");
}

function checkForMatches(guessedLetters) {
	const wordUpper = word.toUpperCase();
	const wordArray = wordUpper.split("");
	const updateMatches = [];

	for (let char of wordArray) {
		if (guessedLetters.includes(char)) {
			updateMatches.push(char);
		} else {
			updateMatches.push("●");
		}
	}
	progressDisplay.innerText = updateMatches.join("");
	checkPlayerWon();
}

function countGuesses(guess) {
	const wordUpper = word.toUpperCase();
	if (!wordUpper.includes(guess)) {
		remainingGuesses--;
		message.innerHTML = `Wrong guess! Try  again.`;
	} else {
		message.innerHTML = `Good guess! The letter ${guess} is in the word.`;
	}
	if (remainingGuesses === 0) {
		message.innerHTML = `Game Over! The secrect word is ${wordUpper}.`;
	}
	if (remainingGuesses <= 1) {
		remainingGuessesSpan.innerHTML = `${remainingGuesses} guess`;
	} else {
		remainingGuessesSpan.innerHTML = `${remainingGuesses} guesses`;
	}
}

function checkPlayerWon() {
	if (word.toUpperCase() === progressDisplay.innerText) {
		message.classList.add("win");
		message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
	}
}
