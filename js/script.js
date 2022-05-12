let circleTurn;
const X_Class= 'x';
const CIRCLE_Class= 'circle';
const restartButton = document.getElementById('restartButton');
const WINNING_COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const board= document.getElementById('board');
const cellElements= document.querySelectorAll('[data-cell]');
const winningMessageElement= document.getElementById('winningMessage');
const winningMessagetextElement= document.querySelector('[data-winning-message-text]');

cellElements.forEach(cell=>{
    cell.addEventListener('click',handleClick,{once:true});
})

startGame();

restartButton.addEventListener('click',startGame)
function startGame(){
    circleTurn=false;
    cellElements.forEach(cell=>{
        cell.classList.remove(X_Class);
        cell.classList.remove(CIRCLE_Class);
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click',handleClick,{once:true});
})
setBoardHoverClass()
winningMessageElement.classList.remove('show');
}

function handleClick(e){
    const cell=e.target;
    const currentClass=circleTurn? CIRCLE_Class:X_Class

    placeMark(cell,currentClass);
    if(checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    }else{
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw){
    if(draw){
        winningMessagetextElement.innerText='Draw!';
    }else{
        winningMessagetextElement.innerText =`${circleTurn? "O's":"X's"} Wins !`
    }
    winningMessageElement.classList.add('show')
}
function isDraw(){
    return [...cellElements].every(cell=>{
       return cell.classList.contains(X_Class)|| cell.classList.contains(CIRCLE_Class)
    })
}
function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}
function swapTurns(){
    circleTurn=!circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(X_Class);
    board.classList.remove(CIRCLE_Class);
    if (circleTurn){
        board.classList.add(CIRCLE_Class);
    }
    else{
        board.classList.add(X_Class);
    }
}
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination=>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}