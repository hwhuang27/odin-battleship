import Gameboard from './gameboard.js';

class Player{
    constructor(){
        this.board = new Gameboard();
    }
    
    placeShip(length, orientation, coordinates){
        this.board.placeShip(length, orientation, coordinates);
    }

    attackOpponent(coordinates, oppBoard){
        if (this.isArrayInArray(oppBoard.missedAttacks, coordinates) || 
            this.isArrayInArray(oppBoard.hitAttacks, coordinates)){
            throw new Error('Already attacked this spot, try again.');
        }
        else{
            oppBoard.receiveAttack(coordinates);
        }
    }

    isArrayInArray(arr, item) {
        let item_as_string = JSON.stringify(item);
        let contains = arr.some(elem => { 
            return JSON.stringify(elem) === item_as_string;
        })
        return contains;
    }  
}

export default Player;