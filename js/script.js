const gussedDisplay = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector("#letter");
const progressDisplay = document.querySelector(".word-in-progress");
const remainingDisplay = document.querySelector(".remaining");
const remainingGuesses = `<span></span> guesses`;
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

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
