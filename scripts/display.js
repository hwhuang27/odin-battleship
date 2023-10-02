function setPlayerShips(player) {
    randomizeShips(player);
    console.log('generated player ship locations');
}

function setNPCShips(npc){
    randomizeShips(npc);
    console.log('generated npc ship locations');
}

function randomizeShips(me){
    let shipCount = 0;
    let count = 0;
    const randomInt = (int) => Math.floor(Math.random() * (9 - int));
    const coinFlip = () => Math.random() < 0.5;
    while (true) {
        try {
            if (count > 1000) break;
            if (shipCount === 5) break;

            if (shipCount === 0) {
                try {
                    me.placeShip(5, coinFlip() ? 'vertical' : 'horizontal', [randomInt(4), randomInt(4)]);
                    shipCount += 1;
                } catch (error) {
                    console.log('ship size 5 failed');
                }
            } else if (shipCount === 1) {
                try {
                    me.placeShip(4, coinFlip() ? 'vertical' : 'horizontal', [randomInt(3), randomInt(3)]);
                    shipCount += 1;
                } catch (error) {
                    console.log('ship size 4 failed');
                }
            } else if (shipCount === 2 || shipCount === 3) {
                try {
                    me.placeShip(3, coinFlip() ? 'vertical' : 'horizontal', [randomInt(2), randomInt(2)]);
                    shipCount += 1;
                } catch (error) {
                    console.log('ship size 3 failed');
                }
            } else if (shipCount === 4) {
                try {
                    me.placeShip(2, coinFlip() ? 'vertical' : 'horizontal', [randomInt(1), randomInt(1)]);
                    shipCount += 1;
                } catch (error) {
                    console.log('ship size 2 failed');
                }
            }
            count += 1;
        } catch (error) {
            console.log(error);
        }
    }
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
                    if (!alert('🎉 YOU WIN! 🎉')) { window.location.reload(); }
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
    renderShips,
};