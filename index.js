const winningCombination = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]
];
let player1Name, player2Name;
let player1Moves = [], player2Moves = [];
let winner = -1, current, initial, totalCount = 0;

const gridContainer = document.getElementById('grid-container');
const winnerElement = document.getElementById('winner');
const player1NameElement = document.getElementById('player1Name');
const player2NameElement = document.getElementById('player2Name');
const profileContainer = document.getElementById('profileContainer');
const playAgainButton = document.getElementById('play-again')

const handleInputChange = (event, id) => {
    if (id == 'player1') player1Name = event.target.value;
    else player2Name = event.target.value;
};

const savePlayersName = () => {
    if (!player1Name || !player2Name) return;

    const players = [
        { name: player1Name, symbol: initial === 'X' ? 'X' : 'O' },
        { name: player2Name, symbol: initial === 'X' ? 'O' : 'X' }
    ];

    player1NameElement.textContent = `${players[0].name} will play as ${players[0].symbol}`;
    player2NameElement.textContent = `${players[1].name} will play as ${players[1].symbol}`;

    gridContainer.style.opacity = '1';
    gridContainer.style.pointerEvents = 'all';
    profileContainer.style.display = 'none';
};

const playAgain = () => {
    // function to reset the boards and variables to reset the game for current players
    player1Moves = [];
    player2Moves = [];
    totalCount = 0;
    winner = -1;
    winnerElement.textContent = '';
    playAgainButton.style.display = 'none';
    gridContainer.innerHTML = '';
    initializeGame();
}

const initializeGame = () => {
    // entry function to create board and selecting the initial player
    if (player1Name && player2Name) {
        gridContainer.style.opacity = '1';
        gridContainer.style.pointerEvents = 'all';
    }
    else {
        gridContainer.style.opacity = '0.1';
        gridContainer.style.pointerEvents = 'none';
    }

    current = Math.floor(Math.random() * 2) + 1;
    initial = current === 1 ? 'X' : 'O';

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const gridItem = document.createElement('button');
            gridItem.classList.add('grid-item');
            gridItem.dataset.index = 3 * row + col + 1;
            gridContainer.appendChild(gridItem);
        }
    }
};

const handleClick = (event) => {
    // function to handle the onClick event on gridItem
    const element = event.target;
    const val = parseInt(element.dataset.index, 10);

    if (element.textContent || winner !== -1) return;

    ++totalCount;

    if (current === 1) {
        if (initial === 'X') player1Moves.push(val);
        else player2Moves.push(val);
        element.textContent = 'X';
        current = 2;
    } else {
        if (initial === 'O') player1Moves.push(val);
        else player2Moves.push(val);
        element.textContent = 'O';
        current = 1;
    }

    if (checkWinner(player1Moves)) {
        winner = 1;
        winnerElement.textContent = `WooHoo, the Winner is ${player1Name}`;
        gridContainer.style.pointerEvents = 'none';
    }

    if (checkWinner(player2Moves)) {
        winner = 2;
        winnerElement.textContent = `WooHoo, the Winner is ${player2Name}`;
        gridContainer.style.pointerEvents = 'none';
    }

    element.style.cursor = 'not-allowed';

    if (totalCount === 9 && winner === -1) {
        winnerElement.textContent = 'You both are smart, try some tricks to win';
    }
    if (totalCount == 9 || winner != -1) {
        playAgainButton.style.display = 'block'

    }
};

const checkWinner = (playerMoves) => {
    // function to check whether player moves contains any possible winning combination
    for (const combination of winningCombination) {
        if (combination.every(cell => playerMoves.includes(cell))) {
            highlightWinningCells(combination);
            return true;
        }
    }
    return false;
};

const highlightWinningCells = (winningCells) => {
    // function to create animation for winning combination
    for (const index of winningCells) {
        const cell = gridContainer.querySelector(`[data-index='${index}']`);
        cell.classList.add('winning');
    }
};

gridContainer.addEventListener('click', handleClick);
initializeGame();