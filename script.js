const btns = document.querySelectorAll('.btn');

let turn0 = true; //first time

const winnersArray = [
    [0,1,2],
    [0,3,6]
]

btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        if(turn0){
            btn.innerText = 'O';
            btn.style.backgroundColor = '#FF52A0';
            turn0 = false;
        }
        else{
            btn.innerText = 'X';
            btn.style.backgroundColor = '#6367FF';
            turn0 = true;
        }
        btn.disabled = true;

        checkWinner();
    })
})

function checkWinner(){
    for(let i of winnersArray){
        let p1 = btns[i[0]].innerText;
        let p2 = btns[i[1]].innerText;
        let p3 = btns[i[2]].innerText;

        console.log({p1, p2, p3})

        if(p1!='' && p2!='' && p3!=''){
            if(p1==p2 && p2==p3){
                alert(`Winner is - ${p1}`)
                resetGame();
            }
        }
    }
}

function resetGame(){
    btns.forEach(btn => {
        btn.innerText = '';
        btn.style.backgroundColor = '';
        btn.disabled = false;
    });
    turn0 = true;
}