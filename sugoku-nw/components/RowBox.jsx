import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setBoard } from "../store/actions/postBoard";

function RowBox(props) {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.SudokuReducer.board);
  const initialBoard = useSelector((state) => state.SudokuReducer.initialBoard);
  const { box, colIndex, rowIndex } = props;
  const [newBox, setBoxValue] = useState(box);

  const handleChangeBoard = () => {
    const tempBoard = board.map((row) => [...row]);
    tempBoard[rowIndex][colIndex] = Number(newBox);
    dispatch(setBoard(tempBoard));
  };

  if (!initialBoard || initialBoard.length === 0) {
    return (
      <View>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  const editableCheck = () => {
    if (initialBoard[rowIndex][colIndex] === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <View>
        <TextInput
          style={editableCheck() ? styles.boxTrue : styles.boxFalse}
          onChangeText={setBoxValue}
          onSubmitEditing={handleChangeBoard}
          keyboardType="number-pad"
          editable={editableCheck()}
          defaultValue={+box ? `${box}` : null}
          maxLength={1}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  boxTrue: {
    height: 40,
    width: 40,
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
    color: "crimson",
    borderRadius: 10,
    backgroundColor: "skyblue",
    fontSize: 20,
  },
  boxFalse: {
    height: 40,
    width: 40,
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
    color: "black",
    borderRadius: 10,
    backgroundColor: "royalblue",
    fontSize: 20,
  },
  testImg: {
    width: 40,
    height: 40,
  },
});

export default RowBox;
