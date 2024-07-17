document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("game-board");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Create game board cells dynamically
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const index = clickedCell.dataset.index;

        if (gameBoard[index] === "" && !checkGameOver()) {
            gameBoard[index] = currentPlayer;
            updateBoard();
            
            if (!checkGameOver()) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                if (currentPlayer === "O") {
                    makeAIMove();
                }
            }
        }
    }

    function makeAIMove() {
        // Implement your AI logic here (e.g., minimax algorithm)
        // For simplicity, the AI currently makes a random move

        let emptyCells = gameBoard.reduce((acc, val, index) => (val === "" ? acc.concat(index) : acc), []);
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameBoard[randomIndex] = currentPlayer;

        updateBoard();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function updateBoard() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.textContent = gameBoard[index];
        });
    }

    function checkGameOver() {
        // Check rows, columns, and diagonals for a win
        for (let i = 0; i < 3; i++) {
            // Check rows
            if (checkWin(gameBoard[i * 3], gameBoard[i * 3 + 1], gameBoard[i * 3 + 2])) {
                alertWinner(`Player ${gameBoard[i * 3]} wins!`);
                resetGame();
                return true;
            }
    
            // Check columns
            if (checkWin(gameBoard[i], gameBoard[i + 3], gameBoard[i + 6])) {
                alertWinner(`Player ${gameBoard[i]} wins!`);
                resetGame();
                return true;
            }
        }
    
        // Check diagonals
        if (checkWin(gameBoard[0], gameBoard[4], gameBoard[8])) {
            alertWinner(`Player ${gameBoard[0]} wins!`);
            resetGame();
            return true;
        }
        if (checkWin(gameBoard[2], gameBoard[4], gameBoard[6])) {
            alertWinner(`Player ${gameBoard[2]} wins!`);
            resetGame();
            return true;
        }
    
        // Check for a draw
        if (!gameBoard.includes("")) {
            alertDraw("Game Over! It's a draw.");
            resetGame();
            return true;
        }
    
        return false;
    }
    
    function alertWinner(message) {
        const resultDisplay = document.createElement("div");
        resultDisplay.classList.add("result-message");
        resultDisplay.textContent = message;
        document.body.appendChild(resultDisplay);
    
        setTimeout(() => {
            resultDisplay.remove();
        }, 3000); // Remove the message after 3 seconds
    }
    
    function alertDraw(message) {
        const resultDisplay = document.createElement("div");
        resultDisplay.classList.add("result-message");
        resultDisplay.textContent = message;
        document.body.appendChild(resultDisplay);
    
        setTimeout(() => {
            resultDisplay.remove();
        }, 3000); // Remove the message after 3 seconds
    }
    
    function checkWin(cell1, cell2, cell3) {
        return cell1 !== "" && cell1 === cell2 && cell2 === cell3;
    }
    

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        updateBoard();
        currentPlayer = "X";
    }
});
