var player = HUMAN;
var board = new GameBoard();
var minimax = new Minimax();
var gameOver = false;

$(document).ready(function(){
    initializeGame();
          
    $("#restart").click(restartGame);
});

function makeComputerMove(board) {
    var move = minimax.findBestMove(board);
    board.setState(AI, move);
    player = HUMAN;
}

function humanMove(move) {
    board.setState(HUMAN, move);
    player = AI;
}

function humanClick(clickEvent){
    if(!gameOver) {
        var move = clickEvent.target.id;
        if(!board.isValidMove(move)) {
            return;
        }

        humanMove(move);
        checkWin();

        if(!gameOver){
            makeComputerMove(board);
            checkWin();
        }
    }
}

function setWinningText(win) {
    var message = win === TIE ? TIE.name : win.name + " Won";
    $("#gameState").text("Game Over " + message);
}

function unsetWinningText() {
    $("#gameState").text("");
}

function initializeGame() {
    restartGame();
    $('.square').click(humanClick);
}

function restartGame() {
    board.clearBoard();
    unsetWinningText();
    gameOver = false;
    player = HUMAN;
}

function checkWin(){
    var winningPlayer = board.isWin();

    if(winningPlayer === NO_WINNER) {
        return;
    }

    setWinningText(winningPlayer);
    gameOver = true;
}