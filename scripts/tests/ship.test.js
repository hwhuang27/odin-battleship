import Ship from '../ship.js';

test('Create ship object with correct properties', () => {
    const newShip = new Ship(3);
    expect(newShip.length).toBe(3);
    expect(newShip.timesHit).toBe(0);
    expect(newShip.sunk).toBe(false);
});

test('Ship on hit increases hit counter', () => {
    const newShip = new Ship(3);
    newShip.hit();
    expect(newShip.timesHit).toBe(1);
})

test('Ship is sunk when all parts are hit', () => {
    const newShip = new Ship(2);
    newShip.hit();
    newShip.hit();
    expect(newShip.isSunk()).toBe(true);
})