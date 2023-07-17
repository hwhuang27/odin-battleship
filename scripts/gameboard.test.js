import Gameboard from './gameboard.js';

test('Create Ship and place onto board', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(2, 'horizontal', [2, 2]);
    expect(gameboard.occupied(2, 2)).toBe(true);
    expect(gameboard.occupied(2, 3)).toBe(true);
})

test('Place Ship illegally (offboard)', () => {
    const gameboard = new Gameboard();

    expect(() => {
        gameboard.placeShip(3, 'horizontal', [2, 8]);
    }).toThrow('Ship cannot fit onto board');
});

test('Place Ship illegally (on existing ship)', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(2, 'horizontal', [2, 2]);

    expect(() => {
        gameboard.placeShip(2, 'vertical', [2, 3]);
    }).toThrow('There is an existing ship at this spot');
});

test('Attack a pair of coordinates', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(2, 'horizontal', [2, 2]);

    gameboard.receiveAttack([3, 3]);
    expect(gameboard.missedAttacks).toContainEqual([3,3]);

    gameboard.receiveAttack([2, 2]);
    expect(gameboard.hitAttacks).toContainEqual([2, 2]);
    expect(gameboard.board[2][2].timesHit).toBe(1);
})

test('Gameboard reports if all ships are sunk', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(2, 'horizontal', [2, 2]);
    gameboard.placeShip(2, 'vertical', [4, 4]);

    gameboard.receiveAttack([2, 2]);
    gameboard.receiveAttack([2, 3]);
    expect(gameboard.board[2][2].isSunk()).toBe(true);

    gameboard.receiveAttack([4, 4]);
    gameboard.receiveAttack([5, 4]);
    expect(gameboard.board[4][4].isSunk()).toBe(true);

    expect(gameboard.allShipsSunk()).toBe(true); 
})
