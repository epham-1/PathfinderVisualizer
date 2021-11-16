import {React, Component} from 'react'
import Cell from './Cell';
import { dijkstra, getcellsInShortestPathOrder } from './dijkstra';
import {DFS, getcellsInShortestPathOrderDFS} from './DFS';
import {BFS, getcellsInShortestPathOrderBFS} from './BFS';
import { greedyBFS, getcellsInShortestPathOrderGreedy } from './greedyBFS';

const START_COL = 3
const START_ROW = 3
const FINISH_COL = 20
const FINISH_ROW = 10

export default class Pathfinder extends Component{
    constructor(props){
        super(props);
        this.state = {
            grid: [],
            mouseButton: false,

        }
    }

    componentDidMount(){
        const grid = getInitialGrid();
        this.setState({grid});
    }

    handleMouseButtonDown(row,col){
        const newGrid = gridWalls(this.state.grid,row,col);
        this.setState({grid: newGrid, mouseButton: true});
    }

    handleMouseButtonUp(){
        this.setState({mouseButton: false});
    }
    reset(){
        const grid = getInitialGrid()
        this.setState({grid})
        for(let i = 0; i < grid.length; i++){   
            for(let j = 0; j < grid[i].length; j++){
                const cell = grid[i][j]
                if(!cell.isStart && !cell.isFinish){
                    document.getElementById(`cell-${i}-${j}`).className = 'cell'
                }
            }
        }
    }
    render(){
        const {grid} = this.state;
        
        return(
            <>
                <button onClick={()=> this.reset()}>Reset</button>
                <button onClick={() => this.visualizeDijkstra()}>
                Visualize Dijkstra's Algorithm
                </button>
                <button onClick={() => this.visualizeDFS()}>
                Depth First Search
                </button>
                <button onClick={() => this.visualizeBFS()}>
                Breath First Search
                </button>
                <button onClick={() => this.visualizeGreedy()}>
                Greedy Best First Search
                </button>
                <button onClick = {() => {console.log(grid)}}>Grid</button>
                <div className = 'grid'>
                {grid.map((row,rowIdx) => {
                    return(
                        <div key = {rowIdx}>
                        {row.map((cell,cellIdx) => {
                            const {row, col, isFinish, isStart, isWall, isVisited} = cell;
                            return(
                                <Cell
                                key = {cellIdx}
                                row = {row}
                                col = {col}
                                isStart = {isStart}
                                isFinish = {isFinish}
                                isWall = {isWall}
                                isVisited = {isVisited}
                                onMouseDown = {(row,col) => this.handleMouseButtonDown(row,col)}
                                />
                            )
                        })}
                        </div>
                    )
                })}
                </div>
            </>
        );
        
    }
    //Greddy Best-First-Search
    visualizeGreedy(){
        const {grid} = this.state;
        const startCell = grid[START_ROW][START_COL];
        const finishCell = grid[FINISH_ROW][FINISH_COL];
        const visitedCellsInOrder = greedyBFS(grid, startCell, finishCell);
        const shortestPath = getcellsInShortestPathOrderGreedy(finishCell);
        this.animate(visitedCellsInOrder,shortestPath,30);
    }

    //BFS
    visualizeBFS(){
        const {grid} = this.state;
        const startCell = grid[START_ROW][START_COL];
        const finishCell = grid[FINISH_ROW][FINISH_COL];
        const visitedCellsInOrder = BFS(grid, startCell, finishCell);
        const shortestPath = getcellsInShortestPathOrderBFS(finishCell);
        this.animate(visitedCellsInOrder,shortestPath,10);
    }
    //DFS
    visualizeDFS(){
        const {grid} = this.state;
        const startCell = grid[START_ROW][START_COL];
        const finishCell = grid[FINISH_ROW][FINISH_COL];
        const visitedCellsInOrder = DFS(grid, startCell, finishCell);
        const shortestPath = getcellsInShortestPathOrderDFS(finishCell);
        this.animate(visitedCellsInOrder,shortestPath,30);
    }
    //Dijkstra
    visualizeDijkstra() {
      const {grid} = this.state;
      const startCell = grid[START_ROW][START_COL];
      const finishCell = grid[FINISH_ROW][FINISH_COL];
      const visitedCellsInOrder = dijkstra(grid, startCell, finishCell);
      const cellsInShortestPathOrder = getcellsInShortestPathOrder(finishCell);
      this.animate(visitedCellsInOrder, cellsInShortestPathOrder,10);
    }

    animate(visitedCellsInOrder, cellsInShortestPathOrder, speed) {
        for (let i = 0; i <= visitedCellsInOrder.length; i++) {
          if (i === visitedCellsInOrder.length) {
            setTimeout(() => {
              this.animateShortestPath(cellsInShortestPathOrder);
            }, speed * i);
            return;
          }
          setTimeout(() => {
            const cell = visitedCellsInOrder[i];
            if(!cell.isStart && !cell.isFinish){
                document.getElementById(`cell-${cell.row}-${cell.col}`).className =
                'cell cell-visited';
            }
          }, speed * i);
        }
      }
    
      animateShortestPath(cellsInShortestPathOrder) {
        for (let i = 0; i < cellsInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const cell = cellsInShortestPathOrder[i];
            if(!cell.isStart && !cell.isFinish)
                document.getElementById(`cell-${cell.row}-${cell.col}`).className =
                'cell cell-shortest-path';
          }, 50 * i);
        }
      }   
}

const getInitialGrid = () => {
    const grid = [];
    for(let i = 0; i < 15; i++){
        const row = [];
        for(let j = 0; j < 25; j++){
            row.push(createCell(j,i));
        }
        grid.push(row);
    }
    return grid;
};

const createCell = (col,row)=> {
    let a = {
        col, 
        row, 
        isStart: col === START_COL && row ===START_ROW,
        isFinish: col===FINISH_COL && row ===FINISH_ROW,
        isWall: false,
        distance: Infinity,
        isVisited: false,
        previousCell: null
    }
    return a;
}

const gridWalls = (grid,row,col) => {
    const newGrid = grid.slice();
    const cell = newGrid[row][col];
    const newCell = {
        ...cell,
        isWall: !cell.isWall
    };
    newGrid[row][col] = newCell;
    return newGrid;
}