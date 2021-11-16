export function DFS(grid, startCell,finishCell) {
    const cellsVisitedInOrder = [];
    cellsVisitedInOrder.push(startCell)
    startCell.isVisited = true;
   while(true){
        
        const currentCell = cellsVisitedInOrder[cellsVisitedInOrder.length - 1];
        //Reached the Final Cell
        if(currentCell === finishCell) return cellsVisitedInOrder
        //Get the next Cell
        if(currentCell == null) {
            cellsVisitedInOrder.pop();
            return cellsVisitedInOrder
        }
        cellsVisitedInOrder.push(search(grid,currentCell))
    }
    //console.log(cellsVisitedInOrder)
    //return cellsVisitedInOrder;
}

function search(grid,currentCell){
    //Go North
    if(currentCell.row > 0){
        let nextCell = grid[currentCell.row -1][currentCell.col]
        if(!nextCell.isWall && !nextCell.isVisited){
            nextCell.isVisited = true;  
            nextCell.previousCell = currentCell;
            return nextCell;
        }
    }

    //Go East
    if(currentCell.col < grid[0].length - 1){
        let nextCell = grid[currentCell.row][currentCell.col + 1]
        if(!nextCell.isWall && !nextCell.isVisited){
            nextCell.isVisited = true;   
            nextCell.previousCell = currentCell;
            return nextCell;
        }
    }

    //Go South
    if(currentCell.row < grid.length - 1){
        let nextCell = grid[currentCell.row + 1][currentCell.col]
        if(!nextCell.isWall && !nextCell.isVisited){
            nextCell.isVisited = true;  
            nextCell.previousCell = currentCell;
            return nextCell;
        }
    }

    //Go West
    if(currentCell.col > 0 ){
        let nextCell = grid[currentCell.row][currentCell.col - 1]
        if(!nextCell.isWall && !nextCell.isVisited){
            nextCell.isVisited = true;  
            nextCell.previousCell = currentCell;
            return nextCell;
        }
    }
    //Backtrack
    
    return currentCell.previousCell
}

export function getcellsInShortestPathOrderDFS(finishCell) {
    const cellsInShortestPathOrder = [];
    let currentCell = finishCell;
    while (currentCell != null) {
        
        cellsInShortestPathOrder.unshift(currentCell);
        currentCell = currentCell.previousCell;
    }
    return cellsInShortestPathOrder;
  }