// Initialisation du jeu
const boardSize = 5;
const shipPositions = [{ row: 1, col: 1 }, { row: 3, col: 3 }];
let hits = 0;
let misses = 0;
let gameOver = false;

// Création de la grille du jeu
function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Reset du plateau

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-row', row);
            cell.setAttribute('data-col', col);
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

// Gestion de la cellule cliquée
function handleCellClick(event) {
    if (gameOver) return;

    const row = parseInt(event.target.getAttribute('data-row'));
    const col = parseInt(event.target.getAttribute('data-col'));

    if (checkHit(row, col)) {
        event.target.classList.add('hit');
        hits++;
        document.getElementById('message').textContent = `Touché! Vous avez trouvé ${hits} bateau(s).`;
    } else {
        event.target.classList.add('miss');
        misses++;
        document.getElementById('message').textContent = `Manqué! Vous avez raté ${misses} fois.`;
    }

    if (hits === shipPositions.length) {
        gameOver = true;
        document.getElementById('message').textContent = "Félicitations! Vous avez coulé tous les bateaux!";
    }
}

// Vérification si la case contient un bateau
function checkHit(row, col) {
    return shipPositions.some(ship => ship.row === row && ship.col === col);
}

// Initialiser le jeu
createBoard();
