function setupDefaultShips(player, npc) {
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

function generatePlayerGrid(grid) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.setAttribute('data-i-player', i);
            newCell.setAttribute('data-j-player', j);

            grid.appendChild(newCell);
        }
    }
}

function generateNPCGrid(grid) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.setAttribute('data-i-npc', i);
            newCell.setAttribute('data-j-npc', j);

            grid.appendChild(newCell);
        }
    }
}


function generateGrid(self, opponent, grid, playerType) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.setAttribute('data-i', i);
            newCell.setAttribute('data-j', j);

            if (playerType === 'player'){
                newCell.classList.add('player-cell');
            }
            if (playerType === 'npc') {
                newCell.classList.add('npc-cell');
                
                newCell.addEventListener('mouseover', () => {
                    newCell.classList.toggle('hover-cell');
                });
                newCell.addEventListener('mouseleave', () => {
                    newCell.classList.toggle('hover-cell');
                });

                newCell.addEventListener('click', () => {
                    const col = newCell.getAttribute('data-i');
                    const row = newCell.getAttribute('data-j');
                    const attack = self.attackOpponent([row, col], opponent.board);

                    if (attack === 'hit'){
                        newCell.classList.toggle('hit-cell');
                    }
                    else if (attack === 'missed'){
                        newCell.classList.toggle('missed-cell');
                    }
                    // check if all ships are sunk 

                    console.log(self.generateTurn())
                        
                    // npc attacks with generateTurn()
                    // if miss -> add green tile class
                    // if hit -> add red tile class

                    newCell.setAttribute('style', 'pointer-events: none;')


                });
            }
            
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

export {setupDefaultShips, generatePlayerGrid, generateNPCGrid, renderShips};