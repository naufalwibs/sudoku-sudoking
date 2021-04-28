import React from "react";
import { View } from "react-native";
import RowBox from "./RowBox";

function Row(props) {
  return (
    <View style={{ flexDirection: "row" }}>
      {props.row.map((box, i) => {
        return (
          <RowBox key={i} colIndex={i} rowIndex={props.rowIndex} box={box} />
        );
      })}
    </View>
  );
}

export default Row;
