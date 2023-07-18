
function defaultShipSetup(player, npc){
    player.placeShip(2, 'horizontal', [1, 1]);
    player.placeShip(3, 'horizontal', [3, 1]);
    player.placeShip(3, 'horizontal', [5, 1]);
    player.placeShip(4, 'horizontal', [7, 1]);
    player.placeShip(5, 'horizontal', [9, 1]);

    npc.placeShip(2, 'vertical', [1, 1]);
    npc.placeShip(3, 'vertical', [1, 3]);
    npc.placeShip(3, 'vertical', [1, 5]);
    npc.placeShip(4, 'vertical', [1, 7]);
    npc.placeShip(5, 'vertical', [1, 9]);
}

export {defaultShipSetup};