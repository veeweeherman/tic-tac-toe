import _ from 'lodash';
export default function(state = null, action) {
  // State argument is not the application state only the state this reducer is responsible for
  console.log(action.type)
  switch(action.type) {
    case 'BOARD_CREATED':
      return action.payload
    case 'SQUARE_CLICKED':


      //////////////// Check Horizontal win  //////////////////////
          // If gameClickCount === gameLength * 2
            // _.find(state.rows, function(val) {});
      //////////////// Check horizontal win //////////////////////
      
      ////////////// Check if already clicked ////////////////
      if (state.winner) {
        alert('Please start a new game')
        return state;
      }  
      if (state.tie) {
        alert('please start a new game');
        return state;
      }
      if (action.payload.value) {
        console.log('Click somewhere else', state.rows)

        return state
      } 

      

      ////////////// Check if already clicked ////////////////

      
      let newRows = state.rows.map((val) => val);   
      let newCols = state.columns.map((val) => val);
      let newDiags = state.diagonals.map((val) => val);
      let positive = newDiags[1].positive;
      let negative = newDiags[0].negative;
      
      let count = state.clickCount + 1;
      let piece = '';

      
      let square = action.payload;
      let row = square.parentNode;
      
      let squareId = Number(square.id);
      let rowId = Number(row.id);
      
      let currentRow = newRows[rowId];
      let currentCol = newCols[squareId];
      let currentSquare = currentRow.squares[squareId];
      

      currentSquare.gamePiece = state.currentPiece;



      let middleSquare = Math.floor(state.size / 2);

      const nextState = (state) => {
        const newDiags = state.diagonals.map((val) => val);
        
        return {
          newRows: state.rows.map((val) => val),
          newCols: state.columns.map((val) => val),
          positive: newDiags[1].positive,
          negative: newDiags[0].negative,
          count: state.clickCount + 1,
          newDiags: newDiags,
        }
      }

      const stateMod = Object.freeze(nextState(state));

      // console.log('middleSquare: ', middleSquare)
      // console.log('Game row: ', rowId);
      // console.dir(row);      
      // console.log('Game square: ', squareId);
      // console.dir(square);
      // console.log('SQ state', state)

      ////////////// Set Current Game Pieces ////////////////
      

     const checkClickCount = (count, collection) => {

      }

      const gp = piece => piece += '_count';

      const incrementCount = (thing1, thing2, type) => {
        thing1[type]++;
        thing2[type]++;
      }

      const handleNegDiags = (thing1, arr, type) => {
        thing1[type]++;
        thing1.elements[arr[1]] = arr[0];
      }

      const handlePosDiags = (thing1, el, type) => {
        thing1[type]++;
        thing1.elements.push(el);
      }

      const handleEl = (load) => {
        let squareEl = load.payload;
        let rowEl = squareEl.parentNode;

        return {
          square: squareEl,
          row: rowEl,
          squareId: Number(squareEl.id),
          rowId: Number(rowEl.id),
        }
      }

      let newEls = handleEl(action);

      const checkDiags = (state, action, piece) => {
        let els = handleEl(action);
        
        if (els.rowId === els.squareId) {
          handleNegDiags(negative, [square, squareId], gp(piece));
        }
        if (els.rowId + els.squareId === state.size - 1) {
          handlePosDiags(positive, square, gp(piece));
        }        
      }

      // Checking the click to see which piece is which
      if (state.clickCount % 2 === 0) {
        piece = 'O';
        incrementCount(currentCol, currentRow, gp('X'));       
        checkDiags(state, action, 'X');
      } else if (state.clickCount % 2 !== 0) {
        piece = 'X';        
        incrementCount(currentCol, currentRow, gp('O'));
        checkDiags(state, action, 'O');
      }

      // The modified state to return (will rename newState )
      let newPayload = Object.assign({}, state, {
        clickCount: count,
        currentPiece: piece,
        rows: newRows,
        columns: newCols,
        diagonals: newDiags
      });

      // Cat's game
      const catsGame = (state = null) => {
        state.tie = true;
        alert('cat\'s game' );        
        return state;
      }
      
      if (state.clickCount === (state.size * state.size) + 1) {
        return catsGame(newPayload);
      }

      ////////////////////////

      // const nextState = (state) => {
      //   const newDiags = state.diagonals.map((val) => val);
        
      //   return {
      //     newRows: state.rows.map((val) => val),
      //     newCols: state.columns.map((val) => val),
      //     positive: newDiags[1].positive,
      //     negative: newDiags[0].negative,
      //     count: state.clickCount + 1,
      //     newDiags: newDiags,
      //   }
      // }

      // Horizontal win function
      const checkHorzWin = (state, newLoad, els) => {
        console.log(state)        
        let checkWin = _.find(state.newRows, (row) => { 
          let XHWin = row.X_count === row.length;
          let OHWin = row.O_count === row.length;
          return XHWin || OHWin
        });

        if (checkWin) {
          newLoad.winner = true;
          els.row.classList.add('game-winner');
          alert('Winner!');
          return newLoad;
        }
      }

      // Check for a horizontal win 
      if (state.clickCount >= (state.size * 2)) {
        if (state.clickCount === (state.size * state.size) + 1) {
          return catsGame(newPayload);
        }        
        checkHorzWin(stateMod, newPayload, newEls);
      }
      
      
      // Check for a vertical win scenario
      if (state.clickCount >= (state.size * 2)) {
        let checkVertWin = _.find(newCols, (col) => { return col.X_count === col.length || col.O_count === col.length });
        if (checkVertWin) {
          let winningColumn = document.getElementsByClassName('col-' + square.id);
          for (let i = 0; i < winningColumn.length; i++) {
            winningColumn[i].classList.add('game-winner');
          }
          newPayload.winner = true;
          alert('Win')
          console.log(newPayload)
          return newPayload;
        }
      }
      // console.log('SQ state', state)

      // Check for a diagonal win scenario
      if (state.clickCount >= (state.size * 2)) {
        let negative = newPayload.diagonals[0].negative;
        let positive = newPayload.diagonals[1].positive;
        let middleSquare = Math.floor(state.size / 2);
        // if (negative.elements.length === state.size) {
        if (negative.X_count === negative.length || negative.O_count === negative.length ) {
          negative.elements.forEach((el) => el.classList.add('game-winner'));
          newPayload.winner = true;
          alert('Win')
          console.log(newPayload)
          return newPayload;
        }
        if ((positive.X_count === positive.length || positive.O_count === positive.length) ) {
          positive.elements.forEach((el) => el.classList.add('game-winner'));
          newPayload.winner = true;
          alert('Win')
          console.log(newPayload)
          return newPayload;
        }
      }


      // console.log(newRows);
      
      // console.log('SQ action', action)

      return newPayload;
  }
  return state;
}
