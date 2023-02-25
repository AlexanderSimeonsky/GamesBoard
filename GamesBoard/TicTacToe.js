const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';
const resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', resetGame);

const cells = document.querySelectorAll('td');
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});


function handleClick(event) {

    const row = event.target.parentElement.rowIndex;
    const col = event.target.cellIndex;
    
    if (board[row][col] !== '') {
        return;
    }
    
    event.target.textContent = currentPlayer;
    board[row][col] = currentPlayer;
    
    if (checkWinner() || checkTie()) {
        endGame();
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {

    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
            return true;
        }
    }
    
    for (let j = 0; j < 3; j++) {
        if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== '') {
            return true;
        }
    }
    
    if ((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') ||
        (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '')) {
        return true;
    }
    
    return false;
}

function checkTie() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

function endGame() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
    if (checkWinner()) {
        alert(`Player ${currentPlayer} wins!`);
    } else {
        alert('Tie game!');
    }
    resetGame();
}

function resetGame(){

    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    
    currentPlayer = 'X';
    
    cells.forEach(cell => {
        cell.textContent = '';
    });
    
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

}

