
export function dijkstra(grid, startcell, finishcell) {
    const visitedcellsInOrder = [];
    startcell.distance = 0;
    const unvisitedcells = getAllcells(grid);
    
    while (!!unvisitedcells.length) {
      sortcellsByDistance(unvisitedcells);
      const closestcell = unvisitedcells.shift();
      // If we encounter a wall, we skip it.
      if (closestcell.isWall) continue;
      // If the closest cell is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestcell.distance === Infinity) return visitedcellsInOrder;
      closestcell.isVisited = true;
      visitedcellsInOrder.push(closestcell);
      if (closestcell === finishcell) return visitedcellsInOrder;
      updateUnvisitedNeighbors(closestcell, grid);
    }
  }
  
  function sortcellsByDistance(unvisitedcells) {
    unvisitedcells.sort((cellA, cellB) => cellA.distance - cellB.distance);
    
  }
  
  function updateUnvisitedNeighbors(cell, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(cell, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = cell.distance + 1;
      neighbor.previousCell = cell;
    }
  }
  
  function getUnvisitedNeighbors(cell, grid) {
    const neighbors = [];
    const {col, row} = cell;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  
  function getAllcells(grid) {
    const cells = [];
    for (const row of grid) {
      for (const cell of row) {
        cells.push(cell);
      }
    }
    return cells;
  }
  
  // Backtracks from the finishcell to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  export function getcellsInShortestPathOrder(finishCell) {
    const cellsInShortestPathOrder = [];
    let currentCell = finishCell;
    while (currentCell != null) {
      cellsInShortestPathOrder.unshift(currentCell);
      currentCell = currentCell.previousCell;
      
    }
    return cellsInShortestPathOrder;
  }