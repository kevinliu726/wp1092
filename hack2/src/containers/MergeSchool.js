// Designed by Ming-Yang, Ho (https://github.com/Kaminyou)
import React, { Component } from 'react';
import Header from '../components/Header';
import Board2048 from '../components/Board2048'
import '../containers/MergeSchool.css';

let secret_seed = 1;
const tokenString = "Kaminyou".split("");
for(let i = 0; i < tokenString.length; i++){
    secret_seed *= tokenString[i].charCodeAt(0);
    secret_seed = secret_seed % 0xffffffff;
}

class MergeSchool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [[0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [2,2,0,0]], // the 4*4 board
            qs_ranking: 32768, // qs ranking now 
            best_qs_ranking: 32768, // the best ranking
            gameover: false, // flag for game over
            step: 0, // step
            win: false, // flag for win i.e. get a "65536" grid
            seed: secret_seed
        };
        document.onkeydown = this.handleKeyDown.bind(this);
    }

    // Pesudo random number generator
    // 4 bytes hashing function By Thomas Wang or Robert Jenkins
    prng = (seed, salt, mod) => {
        let temp = seed + salt;
        temp = (temp+0x7ed55d16) + (temp<<12);
        temp = (temp^0xc761c23c) ^ (temp>>19);
        temp = (temp+0x165667b1) + (temp<<5);
        temp = (temp+0xd3a2646c) ^ (temp<<9);
        temp = (temp+0xfd7046c5) + (temp<<3);
        temp = (temp^0xb55a4f09) ^ (temp>>16);
        if( temp < 0 ) temp = 0xffffffff + temp;
        return (temp % mod);
    }   
    
    // Create board and add two "2" and reset everything required
    initializeBoard = () => {
        let board = [[0,0,0,0],
                     [0,0,0,0],
                     [0,0,0,0],
                     [0,0,0,0]];
        let boardset = this.putGridRandom(board, true);
        boardset = this.putGridRandom(boardset.board, true);
        this.setState({board: boardset.board, qs_ranking: 32768, step: 0});
    }

    
    
    // Get all empty x y coordinates in board
    getEmptyGrid = (board) => {
        let empty_grid = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j<4; j++) {
                if (board[i][j] === 0) {
                    empty_grid.push([i, j])
                }
            }
        }
        return empty_grid;
    }
    
    // Put one "2" in random empty grid
    putGridRandom = (board, init) => {
        let empty_grid = this.getEmptyGrid(board);
        let random_num = this.prng(this.state.seed, this.state.step, empty_grid.length);
        if (init){
            random_num = this.prng(this.state.seed, 0, empty_grid.length);
        } 
        let random_empty_grid = empty_grid[random_num];
        board[random_empty_grid[0]][random_empty_grid[1]] = 2;
        return {board};
    }
    
    // Check if one move is effecitve
    justifyMove = (prev, next) => {
        var prev_string = JSON.stringify(prev)
        var new_string = JSON.stringify(next)
        return (prev_string !== new_string) ? true : false;
    }
    
    // Move
    moveGrid = (direction) => {
        if (!this.state.gameover) {
            if (direction === 'right') {
                const nextBoard = this.moveRight(this.state.board);
                this.checkAndUpdateAfterMove(nextBoard);
            } 
            if (direction === 'left') {
                const nextBoard = this.moveLeft(this.state.board);
                this.checkAndUpdateAfterMove(nextBoard);
            } 
            if (direction === 'up') {
                const nextBoard = this.moveUp(this.state.board);
                this.checkAndUpdateAfterMove(nextBoard);
            } 
            if (direction === 'down') {
                const nextBoard = this.moveDown(this.state.board);
                this.checkAndUpdateAfterMove(nextBoard);
            }
        }
    }


    // Check everything after one move including gameover and win
    // Also, the step, ranking, best ranking should be updated here
    checkAndUpdateAfterMove = (nextBoard) => {
        if (this.justifyMove(this.state.board, nextBoard.board)) {
            const nextBoardSetWithRandom = this.putGridRandom(nextBoard.board, false);
            let qsRankNow = this.state.qs_ranking;
            let stepNow = this.state.step;
            stepNow+=1;
            let boardZeroNum = 0;
            for(let i = 0; i < this.state.board.length; i++){
                for(let j = 0; j < this.state.board[i].length; j++) {
                    if(this.state.board[i][j] === 0) {
                        boardZeroNum++;
                    }

                }
            }
            let nextBoardZeroNum = 0;
            for(let i = 0; i < nextBoard.board.length; i++){
                for(let j = 0; j < nextBoard.board[i].length; j++) {
                    if(nextBoard.board[i][j] === 0) {
                        nextBoardZeroNum++;
                    }

                }
            }
            if(boardZeroNum === nextBoardZeroNum) {
                qsRankNow--;
            }
            
            if(qsRankNow < this.state.best_qs_ranking) {
                this.setState({best_qs_ranking: qsRankNow});
            }
            this.setState({board: nextBoardSetWithRandom.board, qs_ranking: qsRankNow, step: stepNow});
            if (this.checkGameover(nextBoardSetWithRandom.board)) {
                this.setState({gameover: true});
            }
        }
    }

    moveRight = (prevBoard) => {
        let board = [];
        let combination = 0;
    
        for (let r = 0; r < prevBoard.length; r++) {
            let row = [];      
            for (let c = 0; c < prevBoard[r].length; c++) {
                let current = prevBoard[r][c];
                (current === 0) ? row.unshift(current) : row.push(current);
            }
            board.push(row);
        }
    
        for (let r = 0; r < board.length; r++) {
            // special case
            if ((board[r][0] === board[r][1]) && (board[r][0] !== 0) && (board[r][2] === board[r][3]) && (board[r][2] !== 0)) {
                board[r][3] = board[r][3] * 2;
                board[r][2] = board[r][1] * 2;
                board[r][1] = 0;
                board[r][0] = 0;
                combination += 2;
                continue;
            }

            for (let c = board[r].length - 1; c > 0; c--) {
                if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c - 1] = 0;
                    combination += 1;
                } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
                    board[r][c] = board[r][c - 1];
                    board[r][c - 1] = 0;
                }
            }
        }
        return {board, combination};
    }

    moveUp = (prevBoard) => {
        let board = this.rotateClockwise(prevBoard);
        let nextboard = this.moveRight(board);
        board = this.rotateCounterClockwise(nextboard.board);
        let combination = nextboard.combination;
        return {board, combination};
    }
    
    // Movedown function
    moveDown = (prevBoard) => {
        let board = this.rotateCounterClockwise(prevBoard);
        let nextboard = this.moveRight(board);
        board = this.rotateClockwise(nextboard.board);
        let combination = nextboard.combination;
        return {board, combination};
    }
    
    // Moveleft function
    moveLeft = (prevBoard) => {
        let board = this.rotateClockwise(this.rotateClockwise(prevBoard));
        let nextboard = this.moveRight(board);
        board = this.rotateClockwise(this.rotateClockwise(nextboard.board));
        let combination = nextboard.combination;
        return {board, combination};
    };
    
    // Rotate the matrix clockwisely
    rotateClockwise = (matrix) => {
        let result = [];
        for(let i = 0; i < matrix[0].length; i++) {
            let row = matrix.map(e => e[i]).reverse();
            result.push(row);
        }
        return result;
    };
    
    // Rotate the matrix counterclockwisely
    rotateCounterClockwise = (matrix) => {
        return this.rotateClockwise(this.rotateClockwise(this.rotateClockwise(matrix)));
    };
    
    // Check if it is gameover
    checkGameover = (board) => {
        return false;
    };

    // Check if it is win
    checkWin = (board) => {
        // #########################
        // # 10 Implement yourself
        // #########################
        return false;
    };

    handleKeyDown(event) {
        event.preventDefault();
        if (event.keyCode === 37) {
            this.moveGrid("left");
        }
        if (event.keyCode === 38) {
            this.moveGrid("up");
        }
        if (event.keyCode === 39) {
            this.moveGrid("right");
        }
        if (event.keyCode === 40) {
            this.moveGrid("down");
        }
    }

    // Useful function for you to check the endgame
    setBadEnd = () => {
        let nextBoard = [[2,4,2,4],
                        [4,2,4,2],
                        [2,4,2,128],
                        [4,128,2,2]];
        this.setState({board: nextBoard});
    }
    
    // Useful function for you to check the best result
    setGoodEnd = () => {
        let nextBoard = [[2,2,4,8],
                        [128,64,32,16],
                        [256,512,1024,2048],
                        [32768,16384,8192,4096]];
        this.setState({board: nextBoard});
    }

    render() {
        return (
            <>      
                <Header qs_ranking={this.state.qs_ranking} best_qs_ranking={this.state.best_qs_ranking} step={this.state.step} reset={this.initializeBoard}/>
                <Board2048 className="wrapper" board={this.state.board} gameover={this.gameover}/>
                <div className="btn-groups">
                    <div className="btn-useful" id="badend-btn" onClick={this.setBadEnd}>BadEnd</div>
                    <div className="btn-useful" id="goodend-btn" onClick={this.setGoodEnd}>GoodEnd</div>
                </div>
            </>
        );
    }
};

export default MergeSchool;