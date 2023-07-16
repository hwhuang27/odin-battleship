import Ship from './ship.js';

class Gameboard{
    constructor(){
        this.board = this.initializeBoard();
    }

    initializeBoard(){
        const board = new Array(10);
        for (let index = 0; index < board.length; index++) {
            board[index] = new Array(10).fill(0);
        }
        return board;
    }

    placeShip(length, orientation, row, col){
        if ((length + col) > 10 || (length + row) > 10){
            throw new Error('Ship cannot fit onto board');
        }

        const ship = new Ship(length);
        if (orientation === 'horizontal'){
            for (let index = 0; index < ship.length; index++) {
                if(this.occupied(row, col + index)){
                    throw new Error('There is an existing ship at this spot');
                }
            }        
            for (let index = 0; index < ship.length; index++) {
                this.board[row][col + index] = ship;
            }
        }
        else if (orientation === 'vertical'){
            for (let index = 0; index < ship.length; index++) {
                if (this.occupied(row + index, col)) {
                    throw new Error('There is an existing ship at this spot');
                }
            }        
            for (let index = 0; index < ship.length; index++) {
                this.board[row + index][col] = 1;
            }
        }
    }

    occupied(row, col){
        if (this.board[row][col] !== 0){
            return true;
        }
        return false;
    }

    receiveAttack(){
        
    }
}

// const gameboard = new Gameboard();
// gameboard.placeShip(2, 'horizontal', 2, 2);
// console.table(gameboard.board);

export default Gameboard;