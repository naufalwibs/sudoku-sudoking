export function fetchSudokuAsync(difficulty) {
  return (dispatch) => {
    fetch(
      "https://sugoku.herokuapp.com/board?difficulty=" +
        difficulty.toLowerCase()
    )
      .then((res) => res.json())
      .then((board) => {
        dispatch({ type: "sudoku/setSudokuBoard", payload: board.board });
        dispatch({
          type: "sudoku/initialBoard",
          payload: board.board.map((row) => [...row]),
        });
      })
      .catch((err) => console.log(err));
  };
}

export function fetchValidateSudokuAsync(data, encodeParams) {
  return (dispatch) => {
    fetch("https://sugoku.herokuapp.com/validate", {
      method: "POST",
      body: encodeParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch({ type: "sudoku/validate", payload: result.status });
        alert(result.status);
      })
      .catch((err) => console.log(err));
  };
}

export function autoSolveSudoku(data, encodeParams) {
  return (dispatch) => {
    fetch("https://sugoku.herokuapp.com/solve", {
      method: "POST",
      body: encodeParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((response) =>
        dispatch({ type: "sudoku/setSudokuBoard", payload: response.solution })
      )
      .catch(console.warn);
  };
}

export function setEmptyBoard(payload) {
  return (dispatch) => {
    dispatch({ type: "sudoku/setSudokuBoard", payload });
    dispatch({
      type: "sudoku/initialBoard",
      payload,
    });
    dispatch({
      type: "sudoku/validate",
      payload: "",
    });
  };
}
