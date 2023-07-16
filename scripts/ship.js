class Ship{
    constructor(length = 1){
        this.length = length;
        this.timesHit = 0;
        this.sunk = false;    
    }

    hit(){
        this.timesHit++;
    }

    isSunk(){
        if (this.timesHit === this.length) {
            this.sunk = true;
            return true;
        }
        return false;
    }
}

export default Ship;