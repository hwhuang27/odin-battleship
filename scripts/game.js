import Player from './player.js';
import { setupDefaultShips, generatePlayerGrid, generateNPCGrid, renderShips } from './display.js';

const player = new Player();
const npc = new Player();

const player_board = player.board.board;
const npc_board = npc.board.board;

const player_grid = document.querySelector('.player-grid');
const npc_grid = document.querySelector('.npc-grid');

setupDefaultShips(player, npc);

generatePlayerGrid(player_grid);
generateNPCGrid(npc_grid);

renderShips(player_board, 'player');
renderShips(npc_board, 'npc');
