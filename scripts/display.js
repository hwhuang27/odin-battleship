function setPlayerShips(player, npc) {
    player.placeShip(2, 'vertical', [7, 5]);
    player.placeShip(3, 'vertical', [6, 2]);
    player.placeShip(3, 'horizontal', [4, 4]);
    player.placeShip(4, 'horizontal', [2, 1]);
    player.placeShip(5, 'vertical', [4, 8]);
}

function setNPCShips(npc){
    npc.placeShip(2, 'horizontal', [0, 0]);
    npc.placeShip(3, 'vertical', [4, 4]);
    npc.placeShip(3, 'vertical', [6, 7]);
    npc.placeShip(4, 'vertical', [5, 1]);
    npc.placeShip(5, 'horizontal', [1, 4]);
}

function generatePlayerGrid(grid) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.classList.add('player-cell');
            newCell.setAttribute('data-i-player', i);
            newCell.setAttribute('data-j-player', j);

            grid.appendChild(newCell);
        }
    }
}

function generateNPCGrid(grid, player, npc) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.classList.add('npc-cell');
            newCell.setAttribute('data-i-npc', i);
            newCell.setAttribute('data-j-npc', j);

            newCell.addEventListener('mouseover', () => {
                newCell.classList.toggle('hover-cell');
            });
            newCell.addEventListener('mouseleave', () => {
                newCell.classList.toggle('hover-cell');
            });

            newCell.addEventListener('click', () => {
                let row = newCell.getAttribute('data-i-npc');
                let col = newCell.getAttribute('data-j-npc');
                const playerAttack = player.attackOpponent([row, col], npc.board);

                if (playerAttack === 'hit') {
                    newCell.classList.toggle('hit-cell');
                }
                else if (playerAttack === 'missed') {
                    newCell.classList.toggle('missed-cell');
                }
                if (npc.allSunk() === true){
                    if (!alert('You win!')) { window.location.reload(); }
                }

                [row, col] = npc.generateTurn();
                const npcAttack = npc.attackOpponent([row, col], player.board);
                let playerCell = document.querySelector(`[data-i-player='${row}'][data-j-player='${col}']`)

                if (npcAttack === 'hit') {
                    playerCell.classList.toggle('hit-cell');
                }
                else if (npcAttack === 'missed') {
                    playerCell.classList.toggle('missed-cell');
                }
                if (player.allSunk() === true) {
                    if (!alert('Computer wins!')) { window.location.reload(); }
                }

                newCell.setAttribute('style', 'pointer-events: none;')
            });

            grid.appendChild(newCell);
        }
    }
}

function renderShips(board, playerType) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (board[i][j] !== 0) {
                const cell = document.querySelector(`[data-i-${playerType}='${i}'][data-j-${playerType}='${j}']`);
                cell.classList.add('ship-cell');
            }
        }
    }
}

export { 
    setPlayerShips, 
    setNPCShips, 
    generatePlayerGrid, 
    generateNPCGrid, 
    renderShips };