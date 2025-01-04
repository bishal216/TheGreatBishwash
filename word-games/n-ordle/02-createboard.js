var devMode = false;

const createBoard = (container, word, index, noOfAttempts) => {
  const gameBoard = document.createElement("div");
  gameBoard.id = `board-${index}`;
  gameBoard.classList.add("game-board");
  gameBoard.dataset.index = index;

  if (devMode) {
    addDevModeTitle(gameBoard, word);
  }

  for (let row = 0; row < noOfAttempts; row++) {
    const gridRow = document.createElement("div");
    gridRow.id = `board-${index}-row-${row}`;
    gridRow.classList.add("grid-row");

    for (let col = 0; col < word.length; col++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");
      cell.id = `board-${index}-row-${row}-col-${col}`;
      cell.setAttribute(
        "aria-label",
        `Board ${index + 1}, Row ${row + 1}, Column ${col + 1}`
      );
      gridRow.appendChild(cell);
    }

    gameBoard.appendChild(gridRow);
  }

  container.appendChild(gameBoard);
  return gameBoard;
};

const addDevModeTitle = (board, word) => {
  const title = document.createElement("h3");
  title.textContent = `Word: ${word.toUpperCase()}`;
  title.classList.add("board-title");
  board.appendChild(title);
};
