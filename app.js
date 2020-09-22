const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame(){
  const gameBoard = new GameBoard();
  const playerOne = new PlayerOne(gameBoard);
  const compPlayer= new CompPlayer(gameBoard);
  let turn = 0;

  this.start= function(){//refers to ticTacToeGame
  const config={ childList:true };
  const observer = new MutationObserver(() =>takeTurn());
  gameBoard.positions.forEach((el) => observer.observe(el, config));
  takeTurn();
  }

  function takeTurn(){
    if(gameBoard.checkForWinner()){
      return;
    }

    if(turn % 2 === 0){
      playerOne.takeTurn();
    }else{
      compPlayer.takeTurn();
    }

    turn++;
  }
}

function GameBoard(){
  this.positions= Array.from(document.querySelectorAll(".col"));

  this.checkForWinner = function(){
    let winner = false;
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];


    const positions = this.positions;
    winningCombinations.forEach((winningCombo) =>{
      const post0InnerText= positions[winningCombo[0]].innerText;
      const post1InnerText= positions[winningCombo[1]].innerText;
      const post2InnerText= positions[winningCombo[2]].innerText;

      const isWinningCombo = post0InnerText !== '' &&
      post0InnerText === post1InnerText &&
       post1InnerText === post2InnerText

       if(isWinningCombo){
         winner=true;
         winningCombo.forEach((index) =>{
           positions[index].className +=' winner';
  
         });
       }
    });

    return winner;
  }

}

function PlayerOne(gameBoard){
this.takeTurn= function(){
gameBoard.positions.forEach(el => 
  el.addEventListener('click', handleTurnTaken));
 
};

function handleTurnTaken(event){
  event.target.innerText='X';
  gameBoard.positions .forEach(el => 
    el.removeEventListener('click', handleTurnTaken));

}
}

function CompPlayer(gameBoard){
this.takeTurn=function(){
  let availablePositions = gameBoard.positions.filter((p) => p.innerText=== '');
  const move = Math.floor(Math.random() * availablePositions.length);
  availablePositions[move].innerText='O';

}
}