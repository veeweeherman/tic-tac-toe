//  function(state = null, action) {
//   // State argument is not the application state only the state this reducer is responsible for
//   switch(action.type) {
//     case 'ROW_CLICKED':
//       return action.payload
//   }
//   return state;
// }

export default function newReducer(state = null, action) {
  console.log(action.type);
  return [[0, 'X'],[1, 'O'],[2, 'X']]
}