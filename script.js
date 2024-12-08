document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const gameScreen = document.getElementById('gameScreen');
    const gameBoard = document.getElementById('gameBoard');
    const startButton = document.getElementById('startGame');
    const cells = [];
    const rows = 5;
    const cols = 5;

    let gameStarted = false;
    let mines = [];
    let revealedCells = 0;
    let totalMines = 5;

    // Função para criar o tabuleiro
    function createBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = `cell-${i}-${j}`;
                cell.onclick = () => revealCell(i, j);
                gameBoard.appendChild(cell);
                cells.push(cell);
            }
        }
    }

    // Função para iniciar o jogo
    startButton.addEventListener('click', () => {
        loadingScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        createBoard();
        generateMines();
        gameStarted = true;
    });

    // Função para gerar minas aleatórias
    function generateMines() {
        mines = [];
        while (mines.length < totalMines) {
            const randomRow = Math.floor(Math.random() * rows);
            const randomCol = Math.floor(Math.random() * cols);
            const cellId = `cell-${randomRow}-${randomCol}`;
            if (!mines.includes(cellId)) {
                mines.push(cellId);
            }
        }
    }

    // Função para revelar as células
    function revealCell(row, col) {
        const cell = document.getElementById(`cell-${row}-${col}`);
        if (cell.classList.contains('revealed')) return;

        cell.classList.add('revealed');
        if (mines.includes(cell.id)) {
            cell.style.backgroundColor = 'red';
            alert('Você perdeu! A mina explodiu!');
        } else {
            cell.style.backgroundColor = 'green';
            revealedCells++;
            if (revealedCells === (rows * cols - totalMines)) {
                alert('Você ganhou!');
            }
        }
    }
});