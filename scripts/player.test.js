import Player from './player.js';

test('Place ships', () => {
    const player = new Player();
    const npc = new Player();

    player.placeShip(2, 'horizontal', [2, 2]);
    npc.placeShip(2, 'horizontal', [2, 2]);

    expect(player.board.occupied(2, 2)).toBe(true);
    expect(npc.board.occupied(2, 2)).toBe(true)
})

test('Attack opposing boards', () => {
    const player = new Player();
    const npc = new Player();

    player.placeShip(2, 'horizontal', [2, 2]);
    npc.placeShip(2, 'horizontal', [2, 2]);

    player.attackOpponent([2, 2], npc.board);
    expect(npc.board.hitAttacks).toContainEqual([2, 2]);

    npc.attackOpponent([3, 3], player.board);
    expect(player.board.missedAttacks).toContainEqual([3, 3]);
})

test('Not allowed to hit same coordinate twice', () => {
    const player = new Player();
    const npc = new Player();

    npc.placeShip(2, 'horizontal', [2, 2]);

    player.attackOpponent([2, 2], npc.board);
    expect(npc.board.hitAttacks).toContainEqual([2, 2]);

    expect(() => {
        player.attackOpponent([2, 2], npc.board);
    }).toThrow('Already attacked this spot, try again.');
})

test('Computer generates an exhaustive turn list', () => {
    const player = new Player();
    const npc = new Player();
    
    expect(npc.turnList).toHaveLength(100);
    expect(() => {
        for (let index = 0; index < 100; index++) {
            npc.attackOpponent(npc.generateTurn(), player.board);
        }
    }).not.toThrow();
})

