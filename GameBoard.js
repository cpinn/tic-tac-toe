/**
 * Class to hold state of the Tic Tac Toe board
 * 
 * Author: Caitlin Pinn
 */

var WINNING_STATES = [
		// horizontal wins
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		// vertical wins
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		// diagonal wins
		[0, 4, 8],
		[6, 4, 2]
	];

var EMPTY = {
    value : " "};
var HUMAN = {
    value : "X", 
    name: "Human"};
var AI = {
    value: "O", 
    name: "Computer"};
var TIE = {
    name: "A Tie"};
var NO_WINNER = {};

function GameBoard() {

	return {
		//checks for a win by human or ai or a tie game
		isWin : isWin,
		//checks if the gameboard is full
		isFull : isFull, 
		//checks for a win given a player
		isWinPlayer : isWinPlayer,
		//resets the board for a new game
		clearBoard : clearBoard, 
		//given a player and a position, sets the board state and adds visible css information to board
		setState : setState, 
		//given a position, checks that the board is EMPTY at that position
		isValidMove : isValidMove, 
		//gets the current avaliable (EMPTY) positions on the board
		getAvailableMoves : getAvailableMoves, 
		//given a player and a position, sets the board state
		register : register, 
		//given a position, removes the current state and sets the board at that position to EMPTY
		unregister : unregister,
		//prints out the current board to the console
		printStates : printStates,
	}

	var states;

	function clearBoard() {
		this.states = [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY];
		
	   for (var i = 0; i < 9; i++) {
	        $("#" + i).removeClass("X").removeClass("O").text("");
	    }
	}

	function isWinPlayer(player) {
	    winner = 0
	    for (i = 0; i < WINNING_STATES.length; i++){
	           a = WINNING_STATES[i][0];
	           b = WINNING_STATES[i][1];
	           c = WINNING_STATES[i][2];
	          
	           if (this.states[a] === player 
	           	&& this.states[b] === player 
	           	&& this.states[c] === player){
	              return true;
	          } 
	    }
	    return false;
	}

	function isFull() {
		for (var i = 0; i < 9; i++) {
	        if(this.states[i] === EMPTY){
	        	return false;
	        }
	    }
	    return true;
	}

	function isWin(){
		if(this.isWinPlayer(AI)){
			return AI;
		}
		if(this.isWinPlayer(HUMAN)){
			return HUMAN;
		}
		if(this.isFull()) {
			return TIE;
		}

		return NO_WINNER;
	}

	function setState(player, position) {
	    this.register(player, position);
	    $("#" + position).addClass(player.value).text(player.value);
	}

	function register(player, position) {
	    this.states[position] = player;   
	}

	function unregister(position) {
	    this.states[position] = EMPTY;   
	}

	function isValidMove(position) {
	    return this.states[position] == EMPTY;
	}

	function getAvailableMoves() {
		var avaliableMoves = [];
		for (var i = 0; i < this.states.length; i++) {
	        if(this.states[i] === EMPTY){
	        	avaliableMoves.push(i);
	        }
	    }

	    return avaliableMoves;
	}

	function printStates() {
		var msg = "Board state: ["
		for (var i = 0; i < this.states.length; i++) {
			msg += " " + this.states[i].value + " ";
	    }
	    msg += "]";
	    console.log(msg);
	}

}
