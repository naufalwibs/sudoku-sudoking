import { combineReducers } from "redux";
import SudokuReducer from "./sudokuReducer";

const reducer = combineReducers({
  SudokuReducer,
});

export default reducer;
