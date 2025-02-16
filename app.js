// app.js

// Select all buttons in the game
const buttons = document.querySelectorAll('.btn');
let currentPlayer = 'X'; // Start with Player X
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Game board state
let isGameActive = true; // Game status

// Function to handle button click
function handleButtonClick(event) {
    const button = event.target;
    const index = button.getAttribute('data-index');

    // Check if the button is already clicked or the game is over
    if (gameBoard[index] !== '' || !isGameActive) {
        return;
    }

    // Update the game board and button text
    gameBoard[index] = currentPlayer;
    button.textContent = currentPlayer;
    button.classList.add('btn-outline-success'); // Change button color to indicate selection

    // Check for a win or draw
    if (checkWin()) {
        alert(`Player ${currentPlayer} wins!`);
        isGameActive = false;
        return;
    } else if (gameBoard.every(cell => cell !== '')) {
        alert("It's a draw!");
        isGameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to check for a win
function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer;
    });
}

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});