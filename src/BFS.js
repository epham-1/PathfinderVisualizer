export function BFS(grid, startCell, finishCell){
    const visitedcellsInOrder = [];
    const cellQueue = [];
    startCell.isVisited = true;
    
    cellQueue.push(startCell)

    while(true){
        const currentCell = cellQueue[0];
        if(currentCell === finishCell) return visitedcellsInOrder;
        if(cellQueue.length === 0) return visitedcellsInOrder;
        getNeighbors(grid,currentCell,cellQueue);
        visitedcellsInOrder.push(currentCell);
        
        cellQueue.shift();
    }
    //return visitedcellsInOrder;
}

function getNeighbors(grid,currentCell,cellQueue){
    //Check West of Cell
    if(currentCell.col > 0){
        let nextCell = grid[currentCell.row][currentCell.col - 1];
        if(!nextCell.isWall && !nextCell.isVisited){
            nextCell.isVisited = true;  
            nextCell.previousCell = currentCell;
            cellQueue.push(nextCell);
        }
    }    
    //Check North of Cell
    if(currentCell.row > 0){
        let nextCell = grid[currentCell.row -1][currentCell.col];
        if(!nextCell.isWall && !nextCell.isVisited){
            nextCell.isVisited = true;
            nextCell.previousCell = currentCell;  
            cellQueue.push(nextCell);
        }
    }
    //Check East of Cell
    if(currentCell.col < grid[0].length - 1){
        let nextCell = grid[currentCell.row][currentCell.col + 1];
        if(!nextCell.isWall && !nextCell.isVisited){
            nextCell.isVisited = true;
            nextCell.previousCell = currentCell;  
            cellQueue.push(nextCell);
        }
    }
    //Check South of Cell
    if(currentCell.row < grid.length - 1){
        let nextCell = grid[currentCell.row + 1][currentCell.col];
        if(!nextCell.isWall && !nextCell.isVisited){
            nextCell.isVisited = true;
            nextCell.previousCell = currentCell;  
            cellQueue.push(nextCell);
        }
    }

}

export function getcellsInShortestPathOrderBFS(finishCell) {
    const cellsInShortestPathOrder = [];
    let currentCell = finishCell;
    while (currentCell != null) {
        console.log(currentCell);
        cellsInShortestPathOrder.unshift(currentCell);
        currentCell = currentCell.previousCell;
    }
    return cellsInShortestPathOrder;
  }