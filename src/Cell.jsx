import {React, Component} from 'react'

export default class Cell extends Component{
    render(){
        const{
            isWall,
            isStart,
            isFinish,
            col,
            row,
            onMouseDown,
        } = this.props;

        const cellType = isFinish? 'cell-finish': isStart? 'cell-start': isWall? 'cell-wall': '';
        return(
            
            <div 
            id = {`cell-${row}-${col}`}
            className = {`cell ${cellType}`}
            onMouseDown = {()=>onMouseDown(row,col)}
            //onMouseUp = {onMouseUp()}
            >
            </div>
        );
    }
}