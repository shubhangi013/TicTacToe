let mode, mark, circleTurn,currentClass,whoStarts;
const WINNING_COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

const X_Class='X';
const O_Class='O';

const cellElements= document.querySelectorAll('[cells]');
const board= document.getElementById('board')
const winningMessageElement=document.getElementById('wonMessage')
const winningMessageText=document.querySelector('[winningMessage]');
const restartButton= document.getElementById('restartBtn');
const singleButton= document.getElementById('singleBtn')
const BotOrHuman= document.getElementById('botOrHuman');




function options(){
    if (document.getElementById('single').checked) {
        mode = "single";
        if((document.getElementById('beatrice').checked==false)&&(document.getElementById('human').checked==false))
        {
            alert("Select who'll start first please!")
            location.reload();

        }
        

    }
    else if (document.getElementById('multiple').checked) {
        // console.log("multiple")
        mode = "multiplayer";
        if(document.getElementById('beatrice').checked)
        { alert("Hey! you can't play with Beatrice if you have someone else")
        document.getElementById('beatrice').checked=false;
        location.reload();
        
    }
        else if(document.getElementById('human').checked)
        { alert("Hey! you can't play with Beatrice if you have someone else")
        document.getElementById('human').checked=false;
        location.reload();
    }

    }
    else{alert("HEY! select a mode please")
    location.reload();

}

    if (document.getElementById('markedX').checked) {
        mark = "cross";
        // circleTurn=false;

    }
    else if (document.getElementById('markedO').checked) {
        mark = "circle";
        // circleTurn=true;

    }
    else{alert("HEY! select a mark please")
    location.reload();}
    if(document.getElementById('beatrice').checked){
        whoStarts="beatrice";
    }
    else if(document.getElementById('human').checked){
        whoStarts="human";
    }
    if (mark != null && mode != null)
    if (mode === 'multiplayer')
        multiPlayer();
    else {
        // BotOrHuman.classList.add('show')
        singlePlayer();
    }
    
}




function multiPlayer(){
 
if(mark=="cross")
{ circleTurn=false}
 else
 {circleTurn=true}

 function startGame() {
    // circleTurn = false
   
    cellElements.forEach(cell => {
      cell.classList.remove(X_Class)
      cell.classList.remove(O_Class)
      cell.removeEventListener('click', boxClick)
      cell.addEventListener('click', boxClick, { once: true })
    })

    winningMessageElement.classList.remove('show')
    document.getElementById('beatrice').checked = false;
    document.getElementById('human').checked = false;
    document.getElementById('single').checked = false;
    document.getElementById('multiple').checked = false;
    document.getElementById('markedO').checked = false;
    document.getElementById('markedX').checked = false;
    location.reload();

  }
restartButton.addEventListener('click', startGame)
function boxClick(e){
    const cell=e.target;
    const currentClass= circleTurn? O_Class: X_Class;
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        // console.log('winner')
        endGame(false)
    }
    else if(isDraw()){
        endGame(true);
    }
    else
    {
        swapTurns();
    }
   

};
function endGame(draw){
    if(draw){
        winningMessageText.innerText="Both are smart! Draw! <(-_-)>";
    } else{
        winningMessageText.innerText=`${circleTurn? "O's win":"X's win"}`
    }
   
    winningMessageElement.classList.add('show')
}
function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn
}

  
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        });
    });
}
function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_Class) || cell.classList.contains(O_Class)
    })
  }

  cellElements.forEach(cell=>{
    cell.addEventListener('click',boxClick, {once:true})
});

}

function singlePlayer(){

    function startGame() {
        // circleTurn = false
       
        cellElements.forEach(cell => {
          cell.classList.remove(X_Class)
          cell.classList.remove(O_Class)
          cell.removeEventListener('click', boxClick)
          cell.addEventListener('click', boxClick, { once: true })
        })
    
        winningMessageElement.classList.remove('show')
        location.reload();

      }
    restartButton.addEventListener('click', startGame)
    const marked= document.getElementById('1');
if(whoStarts==="beatrice"){
if(mark==="cross")
{ currentClass=X_Class
    marked.classList.add(O_Class)

}
 else
 {
     currentClass=O_Class
    marked.classList.add(X_Class)}
}
else if(whoStarts==="human")
{
    if(mark==="cross")
{ currentClass=X_Class

}
 else
 {currentClass=O_Class}
}
function boxClick(e) {
    const cell = e.target;
    
    
    playerMark(currentClass, cell);
    swapTurns();
    botMark(currentClass);
    swapTurns();
    


}
function playerMark(currentClass, cell) {

    cell.classList.add(currentClass);
    checkWinPlayer(currentClass);


}
function swapTurns(){
    if(currentClass===X_Class)
    {currentClass=O_Class}
    else
    {currentClass=X_Class}
}



function botMark(currentClass) {
    let bestScore = -Infinity;
    var index;
    for (var i = 0; i < 9; i++) {
        if (cellElements[i].classList.value === 'cell') {

            cellElements[i].classList.add(currentClass);
            let score = minimax(cellElements, 0, false);
            cellElements[i].classList.remove(currentClass);
            console.log(score)
            if (score > bestScore) {
                bestScore = score;
                index = i;
                
            }



        }
    }

    cellElements[index].classList.add(currentClass);
    cellElements[index].removeEventListener('click', boxClick)
    checkWinAI(currentClass);
}


function minimax(cellElements, depth, isMaximizing) {

    if (((WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })))) {
        return 1;
    }
    else if (((WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass == O_Class ? X_Class : O_Class)
        })
    }))))
    return -1;
    else if ([...cellElements].every(cell => {
        return cell.classList.contains(X_Class) || cell.classList.contains(O_Class)
    })) {
        return 0;
    }
    

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {

            if (cellElements[i].classList.value === 'cell') {
                cellElements[i].classList.add(currentClass);
                let score = minimax(cellElements, depth + 1, false);
                cellElements[i].classList.remove(currentClass);

                bestScore = (score > bestScore) ? score : bestScore;
            }

        }

        return bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {

            if (cellElements[i].classList.value === 'cell') {
                cellElements[i].classList.add(currentClass == O_Class ? X_Class : O_Class);
                let score = minimax(cellElements, depth + 1, true );
                cellElements[i].classList.remove(currentClass == O_Class ? X_Class : O_Class);

                bestScore = (score < bestScore) ? score : bestScore;
            }

        }

        return bestScore;
    }
}




function checkWinPlayer(currentClass) {
    if (checkWin(currentClass)) {

            winningMessageText.innerText="Yay! you won! O_o";
            winningMessageElement.classList.add('show')
      
    }
    else if (isDraw(currentClass)) {
       
        winningMessageText.innerText="Both are smart! Draw! <(-_-)>";
        winningMessageElement.classList.add('show')
    }
    // winningMessageElement.classList.add('show')

}

function checkWinAI(currentClass) {
    if (checkWin(currentClass)) {
        winningMessageText.innerText="Oops! not your day, Beatrice wins ";
        winningMessageElement.classList.add('show')
       
    }
    else if (isDraw(currentClass)) {
        winningMessageText.innerText="Oops! both are smart! Draw! <(-_-)>";
        winningMessageElement.classList.add('show')
    }
    // winningMessageElement.classList.add('show')
}


function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        });
    });
}
function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_Class) || cell.classList.contains(O_Class)
    })
  }

  cellElements.forEach(cell=>{
    cell.addEventListener('click',boxClick, {once:true})
});

}

