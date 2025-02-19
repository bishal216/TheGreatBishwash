const boards = []; // State for each board
const guesses = [];
let noOfNordles = 1;
let noOfAttempts = noOfNordles + 5;
const boardContainer = document.getElementById("game-boards");
let currentGuess = "";
// startGame to initialize state for each board

const initializeBoards = (dailyWords) => {
  dailyWords.forEach((word, index) => {
    const board = createBoard(boardContainer, word, index, noOfAttempts);
    boards.push({
      boardElement: board,
      answer: word.toUpperCase(),
      solved: false,
    });
  });
};

const startNewGame = () => {
  noOfNordles = parseInt(document.getElementById("num-nordles").value);
  noOfAttempts = noOfNordles + 5;

  resetBoard(boardContainer, boards, guesses);

  const dailyWords = getDailyWords(words, noOfNordles);
  initializeBoards(dailyWords);

  toggleGameSetup();
};

const resetBoard = (boardContainer, boards, guesses) => {
  boardContainer.innerHTML = "";
  boards.length = 0;
  guesses.length = 0;
};

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/^[A-Za-z]$/.test(key)) {
    if (currentGuess.length < 5) {
      currentGuess += key.toUpperCase(); // Add the letter to currentGuess
      updateCellForAllBoards(
        guesses.length,
        currentGuess.length - 1,
        key.toUpperCase()
      );
    }
  }

  if (key === "Enter") {
    event.preventDefault();
    if (isValidWord(currentGuess)) {
      checkAllBoards(currentGuess);
      guesses.push(currentGuess);
      currentGuess = "";
      if (boards.every((board) => board.solved)) {
        alert("You won!");
        toggleGameSetup();
      } else if (guesses.length == noOfAttempts) {
        alert("You lost!");
        toggleGameSetup();
      }
    }
  }

  if (key === "Backspace") {
    updateCellForAllBoards(guesses.length, currentGuess.length - 1, "");
    currentGuess = currentGuess.slice(0, -1); // Remove the last characters
  }
});

const updateCellForAllBoards = (row, col, value) => {
  boards.forEach((board, index) => {
    if (!board.solved) {
      const cell = board.boardElement.querySelector(
        `#board-${index}-row-${row}-col-${col}`
      );
      if (cell) {
        updateCell(cell, value);
      }
    }
  });
};

const isValidWord = (word) => {
  return words.includes(word.toLowerCase()) && !guesses.includes(word);
};

/**Compares a target word and a guess word to determine the status of each letter.*/
const compareWords = (target, guessWord) => {
  const result = [];
  const targetArray = target.split(""); // Convert target to an array
  const guessArray = guessWord.split(""); // Convert guessWord to an array
  const targetLetterCounts = {}; // To track available letters in the target word

  // Count occurrences of each letter in the target word
  targetArray.forEach((letter) => {
    targetLetterCounts[letter] = (targetLetterCounts[letter] || 0) + 1;
  });

  // First pass: Identify "RIGHT" matches
  guessArray.forEach((letter, index) => {
    if (letter === targetArray[index]) {
      result[index] = "RIGHT"; // Exact match
      targetLetterCounts[letter]--; // Reduce available count for this letter
    } else {
      result[index] = "NOT"; // Default to "NOT" for now
    }
  });

  // Second pass: Identify "IN" matches for remaining letters
  guessArray.forEach((letter, index) => {
    if (result[index] === "NOT" && targetLetterCounts[letter] > 0) {
      result[index] = "IN"; // Letter is in the word but wrong position
      targetLetterCounts[letter]--; // Reduce available count for this letter
    }
  });

  return result;
};

const CLASS_CORRECT = "correct";
const CLASS_IN_WORD = "in-word";
const CLASS_NOT_IN_WORD = "not-in-word";

const updateCell = (cell, value, className) => {
  cell.textContent = value.toUpperCase();
  if (className) {
    cell.classList.add(className);
  }
};

const checkBoard = (board, currentGuess, currentRow, boardIndex) => {
  if (board.solved) return;

  const target = board.answer;
  const result = compareWords(target, currentGuess);

  const rowElement = board.boardElement.querySelector(
    `#board-${boardIndex}-row-${currentRow}`
  );

  updateRowCells(rowElement, result);

  if (isBoardSolved(result)) {
    board.solved = true;
  }
};

const updateRowCells = (rowElement, result) => {
  rowElement.querySelectorAll(".grid-cell").forEach((cell, index) => {
    if (result[index] === "RIGHT") {
      cell.classList.add(CLASS_CORRECT);
    } else if (result[index] === "IN") {
      cell.classList.add(CLASS_IN_WORD);
    } else if (result[index] === "NOT") {
      cell.classList.add(CLASS_NOT_IN_WORD);
    }
  });
};

const isBoardSolved = (result) => result.every((answer) => answer === "RIGHT");

const checkAllBoards = (currentGuess) => {
  const currentRow = guesses.length;

  boards.forEach((board, index) => {
    checkBoard(board, currentGuess, currentRow, index);
  });
};

const helpDialog = document.querySelector("#how-to-play");
const showButton = document.querySelector("#showHelp");
const closeButton = document.querySelector("#close-help");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  helpDialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  helpDialog.close();
});
