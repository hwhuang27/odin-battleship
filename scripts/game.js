import Player from './player.js';
import { setPlayerShips, setNPCShips, generatePlayerGrid, generateNPCGrid, renderShips } from './display.js';

const player = new Player();
const npc = new Player();

const player_board = player.board.board;
const npc_board = npc.board.board;

const player_grid = document.querySelector('.player-grid');
const npc_grid = document.querySelector('.npc-grid');

setPlayerShips(player);
setNPCShips(npc);

generatePlayerGrid(player_grid);
generateNPCGrid(npc_grid, player, npc);

renderShips(player_board, 'player');
// renderShips(npc_board, 'npc');
