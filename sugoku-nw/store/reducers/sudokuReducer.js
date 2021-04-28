const initialState = {
  board: [],
  initialBoard: [],
  status: "",
};

function SudokuReducer(state = initialState, action) {
  const { type, payload } = action;

  if (type === "sudoku/setSudokuBoard") {
    return {
      ...state,
      board: payload,
    };
  }

  if (type === "sudoku/initialBoard") {
    return {
      ...state,
      initialBoard: payload,
    };
  }

  if (type === "sudoku/validate") {
    return {
      ...state,
      status: payload,
    };
  }

  return state;
}

export default SudokuReducer;
