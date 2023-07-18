import Gameboard from './gameboard.js';

class Player{
    constructor(){
        this.board = new Gameboard();
        this.turnList = this.generateTurnList();
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
            return oppBoard.receiveAttack(coordinates);
        }
    }

    isArrayInArray(arr, item) {
        let item_as_string = JSON.stringify(item);
        let contains = arr.some(elem => { 
            return JSON.stringify(elem) === item_as_string;
        })
        return contains;
    }

    generateTurn(){
        return this.turnList.pop();
    }

    generateTurnList(){
        let list = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const coord = [i, j];
                list.push(coord);
            }
        }
        list = this.shuffle(list);
        return list;
    }

    shuffle(array) {
        // Fisher-Yates shuffle
        let oldElement;
        for (let i = array.length - 1; i > 0; i--) {
            let rand = Math.floor(Math.random() * (i + 1));
            oldElement = array[i];
            array[i] = array[rand];
            array[rand] = oldElement;
        }
        return array;
    }

    allSunk(){
        return this.board.allShipsSunk();
    }
}

export default Player;