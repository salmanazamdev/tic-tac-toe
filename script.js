// Variables
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.querySelector(".status");
const resetButton = document.querySelector(".reset");
const clickSound = new Audio("assets/click.mp3");
const winSound = new Audio("assets/win.mp3");
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];
let currentPlayer = "X";
let gameActive = true;

// Function to update the status message
function updateStatus(message) {
  statusDisplay.textContent = message;
}

// Check for a winner
function checkWinner() {
  const winningCombinations = [
    [[0, 0], [0, 1], [0, 2]], // Rows
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]], // Columns
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]], // Diagonals
    [[0, 2], [1, 1], [2, 0]]
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a[0]][a[1]] && 
        board[a[0]][a[1]] === board[b[0]][b[1]] && 
        board[a[0]][a[1]] === board[c[0]][c[1]]) {
      
      // Highlight winning cells
      combo.forEach(([row, col]) => {
        document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`).classList.add("winning");
      });
      return true;
    }
  }
  return false;
}

// Handle cell clicks
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.classList.contains("taken")) return;

    clickSound.play(); // Play click sound
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    board[row][col] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWinner()) {
      winSound.play(); // Play win sound
      updateStatus(`Player ${currentPlayer} wins!`);
      gameActive = false;
      return;
    }

    if (board.flat().every(cell => cell)) {
      updateStatus("It's a draw!");
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus(`Player ${currentPlayer}'s turn`);
  });
});

// Reset the game
resetButton.addEventListener("click", () => {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  currentPlayer = "X";
  gameActive = true;
  updateStatus(`Player X's turn`);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.className = "cell"; // Reset classes
  });
});
