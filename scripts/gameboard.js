import Ship from './ship.js';

class Gameboard{
    constructor(){
        this.board = this.initializeBoard();
        this.missedAttacks = [];
        this.hitAttacks = [];
        this.ships = [];
    }

    initializeBoard(){
        const board = new Array(10);
        for (let index = 0; index < board.length; index++) {
            board[index] = new Array(10).fill(0);
        }
        return board;
    }

    placeShip(length, orientation, coordinates){
        const [row, col] = coordinates;

        if (((length + col) > 10 && orientation === 'horizontal') || 
            ((length + row) > 10 && orientation === 'vertical')){
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
                this.board[row + index][col] = ship;
            }
        }

        this.ships.push(ship);
    }

    occupied(row, col){
        if (this.board[row][col] !== 0){
            return true;
        }
        return false;
    }

    receiveAttack(coordinates){
        const [row, col] = coordinates;

        if(this.occupied(row, col)){
            this.board[row][col].hit();
            this.hitAttacks.push(coordinates);
        }
        else{
            this.missedAttacks.push(coordinates);
        }
    }

    allShipsSunk(){
        let result = true;
        this.ships.forEach(ship => {
            if(!ship.isSunk()){
                result = false;
            }
        });
        return result;
    }

}

// const gameboard = new Gameboard();
// gameboard.placeShip(2, 'horizontal', 2, 2);
// gameboard.placeShip(2, 'vertical', 3, 3);
// console.table(gameboard.board);

export default Gameboard;