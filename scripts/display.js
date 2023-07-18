import Player from './player.js';
import {defaultShipSetup} from './game.js';

const player = new Player();
const npc = new Player();

defaultShipSetup(player, npc);

const player_grid = document.querySelector('.player-grid');
const npc_grid = document.querySelector('.npc-grid');

function generatePlayerGrid(grid){
    for (let index = 0; index < 100; index++) {
        const newCell = document.createElement('div');
        newCell.classList.add('cell');
        // eventlisteners here
        grid.appendChild(newCell);
    }
}

generatePlayerGrid(player_grid);
generatePlayerGrid(npc_grid);
