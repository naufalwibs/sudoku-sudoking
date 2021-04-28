export function setBoard(payload) {
  return (dispatch) => {
    dispatch({ type: "sudoku/fetchAllSudoku", payload });
  };
}
