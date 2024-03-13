const gussedDisplay = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector("#letter");
const progressDisplay = document.querySelector(".word-in-progress");
const remainingDisplay = document.querySelector(".remaining");
const remainingGuesses = `<span></span> guesses`;
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

const guessedLetters = [];

function updateProgress(word) {
	const secretWord = word.split("");
	const circle = "●";
	const placeholder = [];

	secretWord.forEach(function (char, i) {
		placeholder.push(circle);
	});

	progressDisplay.innerHTML = placeholder.join("");
}

updateProgress(word);

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
	}
}
