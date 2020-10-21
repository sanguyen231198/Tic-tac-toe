import React from "react";
import Square from "./Square";
class Board extends React.Component {
    renderSquare(i) {
        const winner = this.props.winner; //lấy winner từ component Game gửi qua
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                winner = {winner && winner.includes(i) ? 'winner' :''} 
            />
        );
    }

    render() {
        //  vòng lặp để gọi 9 ô Square
        const matrixSize = Math.sqrt(this.props.squares.length);
        const rows = Array(matrixSize).fill(null);
        const cols = rows;
        const board = rows.map((row,i) =>{
            const squares = cols.map((col,j) =>{
                const squareKey = i* matrixSize + j;
            return <span  key= {squareKey}>{this.renderSquare(squareKey)}</span>
            });
        return <div key = {i} className = "board-row">{squares}</div>
        });
        return (
            <div>
                {/* <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div> */}
                {board}
            </div>
        );
    }

}
export default Board;