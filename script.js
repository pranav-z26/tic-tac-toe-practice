const btns = document.querySelectorAll('.btn');
const resetBtn = document.getElementById('reset-btn');
const winnerText = document.getElementById('winner-text');
const currentPlayerText = document.getElementById('current-player');

let turn0 = true; // O is the first player
let gameActive = true;
let movesCount = 0;

const winnersArray = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Initialize event listeners
btns.forEach((btn) => {
    btn.addEventListener('click', handleButtonClick);
});

resetBtn.addEventListener('click', resetGame);

function handleButtonClick(e) {
    const btn = e.target;
    
    if (btn.innerText !== '' || !gameActive) return;
    
    const player = turn0 ? 'O' : 'X';
    btn.innerText = player;
    btn.setAttribute('data-player', player);
    btn.disabled = true;
    movesCount++;
    
    // Update visual state
    btn.style.animation = 'none';
    setTimeout(() => {
        btn.style.animation = '';
    }, 10);
    
    // Check for winner
    const winner = checkWinner();
    if (winner) {
        endGame(winner);
    } else if (movesCount === 9) {
        // Draw
        endGame('Draw');
    } else {
        // Switch player
        turn0 = !turn0;
        updatePlayerStatus();
    }
}

function checkWinner() {
    for (let combination of winnersArray) {
        const [a, b, c] = combination;
        const p1 = btns[a].innerText;
        const p2 = btns[b].innerText;
        const p3 = btns[c].innerText;
        
        if (p1 !== '' && p1 === p2 && p2 === p3) {
            // Highlight winning cells
            [a, b, c].forEach(index => {
                btns[index].style.opacity = '1';
                btns[index].classList.add('winner-pulse');
            });
            return p1;
        }
    }
    return null;
}

function endGame(result) {
    gameActive = false;
    
    if (result === 'Draw') {
        winnerText.innerText = "🤝 It's a Draw!";
    } else {
        winnerText.innerText = `🎉 Player ${result} Wins! 🎉`;
    }
    
    // Disable all remaining buttons
    btns.forEach(btn => {
        btn.disabled = true;
    });
    
    currentPlayerText.innerText = 'Game Over';
}

function updatePlayerStatus() {
    const currentPlayer = turn0 ? 'O' : 'X';
    currentPlayerText.innerText = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
    btns.forEach(btn => {
        btn.innerText = '';
        btn.removeAttribute('data-player');
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.classList.remove('winner-pulse');
    });
    
    turn0 = true;
    gameActive = true;
    movesCount = 0;
    winnerText.innerText = '';
    updatePlayerStatus();
}

// Initialize game
updatePlayerStatus();