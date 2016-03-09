import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {makeRows, makeBoard, getBoardSize} from '../actions/actions_index';

class BoardSize extends Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};
  }

  onInputChange(event) {
    this.setState({term: event.target.value });
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.props.makeBoard(makeRows, this.state.term);
    this.props.getBoardSize(this.state.term);
    this.setState({term: ''});
  }
  render() {
    return (
      <form onSubmit={this.onFormSubmit.bind(this)} className="input-group">
        <input 
          placeholder="Enter board size" 
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange.bind(this)}
        />
        <span className="input-group-btn">
          <button type="submit" className="board-size">Submit</button>
        </span>
      </form>
    )
  }  
}

function mapStateToProps(state) {
  return {
    size: state.boardSize
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ makeBoard, getBoardSize }, dispatch);
}

export default connect(null, mapDispatchToProps)(BoardSize);