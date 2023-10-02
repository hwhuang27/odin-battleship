import Player from './player.js';
import { setPlayerShips, setNPCShips, generatePlayerGrid, generateNPCGrid, renderShips} from './display.js';

const refreshButton = document.querySelector('.refresh');

// initialize players
const player = new Player();
const npc = new Player();

// initialize gameboards
const player_board = player.board.board;
const player_grid = document.querySelector('.player-grid');
// const npc_board = npc.board.board;
const npc_grid = document.querySelector('.npc-grid');

// draw grids
generatePlayerGrid(player_grid);
generateNPCGrid(npc_grid, player, npc);

// generate ship positions
setPlayerShips(player);
setNPCShips(npc);

// draw ships
renderShips(player_board, 'player');
// renderShips(npc_board, 'npc');


refreshButton.addEventListener('click', () => {
    window.location.reload();
});


