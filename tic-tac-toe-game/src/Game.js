import React from "react";
import "./App.css";
import Board from "./components/Board";
class Game extends React.Component {
  // props chuyển dữ liệu qua cho component con (Board)
  constructor(props) {
    super(props);
    // state lưu giữ trạng thái của 1 component
    this.state = {
      //tạo mảng history lưu object squares có 9 phần tử là null
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      //tính số step đã chơi
      stepNumber: 0,
      // xác định người chơi hiện tại, X là true, O là false
      xIsNext: true,
    };
  }
  // thực hiện hành động click vào 1 ô vuông
  handleClick(i) {
    // slice(start, end+1) copy 1 mảng từ một mảng có sẵn tránh làm ảnh hưởng đến bản chính
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1]; //lấy history của lần gần nhất
    const squares = current.squares.slice(); //slice() 1 squares từ current
    // điều kiện khi có winner thì k click đc nữa và mỗi ô vuông chỉ đc click 1 lần
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    //set lại state cho mỗi lần click 1 square
    this.setState({
      //mỗi lần click thì thêm 1 squares vào history
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length, //  stepNumber bằng với độ dài của history.
      xIsNext: !this.state.xIsNext, //sau khi click thì đổi người chơi
    });
  }
  //nhảy đến vị trí cần quay lại
  jumpTo(step) {
    this.setState({
      stepNumber: step, //stepNumber sẽ là vị trí muốn quay lại
      xIsNext: step % 2 ? false : true, // vị trí chẵn thì là O, lẻ là X
    });
  }

  render() {
    ////  Vì những nội dung dứoi chỉ sử dụng để view nên không cần clone(slice)
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    //click vào mỗi step thì sẽ hiển thị ra trạng thái tương ứng của bàn cờ
    const moves = history.map((step, move) => {
      const desc = move ? `Move #${move} ` : "Game start"; // move = 0 là lúc game mới start.
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    //điều kiện win, và trạng thái của nó
    let status;
    if (winner) {
      //win
      status = `Winner: ${winner.winnerPlayer} `;
    } else if (this.state.stepNumber === 9) {
      //hòa
      status = "No one win";
    } else {
      //chưa win
      status = `Next player:  ${this.state.xIsNext ? "X" : "O"} `;
    }

    return (
      <div className="game">
        <Board
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
          winner={winner && winner.winnerLocation}
        />

        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
//fuction tính người chiến thắng
var calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    //thêm squares[a] để tránh trường hợp null
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winnerPlayer: squares[a], //nguwoif chiến thắng
        winnerLocation: [a,b,c] //vị trí thắng
      };
    }
  }

 
};

export default Game;
