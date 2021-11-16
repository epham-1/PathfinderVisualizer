
export function greedyBFS(grid,startCell,finishCell){
    const cellsVisitedInOrder = [];
    const priorityQueue = [];
    calcDistance(grid,finishCell);
    priorityQueue.push(startCell);
    startCell.isVisited = true;
    while(true){
        const currentCell = priorityQueue.shift();
        cellsVisitedInOrder.push(currentCell);
        findNeighbors(grid,currentCell,priorityQueue);
        if(currentCell === finishCell || priorityQueue.length === 0) return cellsVisitedInOrder;
        sortCells(priorityQueue);
    }

}
//Gets the distance from a node to the finsh node
function findNeighbors(grid,currentCell,priorityQueue){
    //Check West of Cell
    if(currentCell.col > 0){
        let nextCell = grid[currentCell.row][currentCell.col - 1];
        if(!nextCell.isWall && !nextCell.isVisited){
            nextCell.isVisited = true;
            nextCell.previousCell = currentCell;
            priorityQueue.push(nextCell);
        }
    }    
    //Check North of Cell
    if(currentCell.row > 0){
        let nextCell = grid[currentCell.row -1][currentCell.col];
        if(!nextCell.isWall && !nextCell.isVisited){
            nextCell.isVisited = true;
            nextCell.previousCell = currentCell;
            priorityQueue.push(nextCell);
        }
    }
    //Check East of Cell
    if(currentCell.col < grid[0].length - 1){
        let nextCell = grid[currentCell.row][currentCell.col + 1];
        if(!nextCell.isWall && !nextCell.isVisited){
            nextCell.isVisited = true;
            nextCell.previousCell = currentCell; 
            priorityQueue.push(nextCell);
        }
    }
    //Check South of Cell
    if(currentCell.row < grid.length - 1){
        let nextCell = grid[currentCell.row + 1][currentCell.col];
        if(!nextCell.isWall && !nextCell.isVisited){
            nextCell.isVisited = true;
            nextCell.previousCell = currentCell; 
            priorityQueue.push(nextCell);
        }
    }

}
function sortCells(priorityQueue){
    if(priorityQueue.length > 1)
        priorityQueue.sort((cellA, cellB) => cellA.distance - cellB.distance);
}
function distance (startCell, endCell){
    let horizontal = Math.abs(startCell.col - endCell.col);
    let vertical = Math.abs(startCell.row - endCell.row);
    return vertical + horizontal;
}

function calcDistance(grid,finishCell){
    for(let i = 0 ; i< 15 ;i++){
        for(let j = 0; j < 25; j++){
            grid[i][j].distance = distance(grid[i][j],finishCell);
        }
    }
}

export function getcellsInShortestPathOrderGreedy(finishCell) {
    const cellsInShortestPathOrder = [];
    let currentCell = finishCell;
    while (currentCell != null) {
        
        cellsInShortestPathOrder.unshift(currentCell);
        currentCell = currentCell.previousCell;
    }
    return cellsInShortestPathOrder;
  }