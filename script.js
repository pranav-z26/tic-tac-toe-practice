const btns = document.querySelectorAll('.btn');

let turn0 = true; //first time

const winnersArray = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        if (turn0) {
            btn.innerText = 'O';
            btn.style.backgroundColor = '#FF52A0';
            turn0 = false;
        }
        else {
            btn.innerText = 'X';
            btn.style.backgroundColor = '#6367FF';
            turn0 = true;
        }
        btn.disabled = true;

        checkWinner();
    })
})

function checkWinner() {
    for (let i of winnersArray) {
        let p1 = btns[i[0]].innerText;
        let p2 = btns[i[1]].innerText;
        let p3 = btns[i[2]].innerText;

        console.log({ p1, p2, p3 })

        if (p1 != '' && p2 != '' && p3 != '') {
            if (p1 == p2 && p2 == p3) {
                showWinner(p1);
                // resetGame();
                let resetBtn = document.getElementById('reset-btn');
                resetBtn.style.display = 'block';
                resetBtn.addEventListener('click', resetGame);

            }
        }
    }
}

function resetGame() {
    btns.forEach(btn => {
        btn.innerText = '';
        btn.style.backgroundColor = '';
        btn.disabled = false;
    });
    turn0 = true;
    const winnerText = document.getElementById('winner-text');
    winnerText.innerText = '';
}

function showWinner(winner) {
    const winnerText = document.getElementById('winner-text');
    winnerText.innerText = `Winner is - ${winner}`;

}