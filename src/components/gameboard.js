import React, {Component} from 'react';
import GameRow from './gamerow';
// import GamePiece from './gamepiece';


class GameBoard extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
    <table className="game-board">
      <tbody>
        <GameRow id="row-0" />
      </tbody>
    </table>
    );
  }
}

export default GameBoard;