/**
 * Class to evaluate all possible moves and obtain the best move for the computer
 * which follows the Minimax algorithm: https://en.wikipedia.org/wiki/Minimax
 * 
 * Author: Caitlin Pinn
 */
function Minimax() {

	return {
		//given the current state of the game, returns the best possible move
		//if multiple moves are equivalent chooses a random move
		findBestMove : findBestMove
	}

	function findBestMove(board) {
		var moves = board.getAvailableMoves();
		var bestMoves = [];
		var score = -Infinity;

		for(var i = 0; i < moves.length; i++) {
			board.register(AI, moves[i]);

			var currScore = minimax(board, HUMAN);

			if(currScore > score) {
				score = currScore;
				bestMoves = [moves[i]];
			} else if (currScore === score) {
				bestMoves.push(moves[i]);
			}
			board.unregister(moves[i]);
		}
		
		return bestMoves[Math.floor(Math.random() * bestMoves.length)];
	}

	function minimax(board, playerTurn) {
		var win = board.isWin();	
		switch(win) {
			case AI:
				return 1;
			case HUMAN:
				return -1;
			case TIE:
				return 0;
			case NO_WINNER:
				break;
		}

		var avaliableMoves = board.getAvailableMoves();
		var score = playerTurn === AI ? -Infinity : Infinity;
		var minmaxOp = playerTurn === AI ? Math.max : Math.min;
		
		for(var i = 0; i < avaliableMoves.length; i++) {
			board.register(playerTurn, avaliableMoves[i]);

            var currScore = minimax(board, playerTurn === AI ? HUMAN : AI);
			score = minmaxOp(currScore, score);

            board.unregister(avaliableMoves[i]);
		}

		return score;
	}
}
