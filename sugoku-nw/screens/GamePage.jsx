import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import Row from "../components/Row";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSudokuAsync,
  fetchValidateSudokuAsync,
  autoSolveSudoku,
} from "../store/actions/fetch";
import LoadingScreen from "./LoadingScreen";
import Header from "../components/Header";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import moment from "moment";

/*

// const fetchFonts = () => {
//   return Font.loadAsync({
//     "nama-font": require("../assets/fonts"),
//   });
// };

inside function

if (!dataLoaded) {
  return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded=true onError={(err) => console.log(err)}}/>
}

inside styles
..
fontFamily: 'nama-font'

*/

function GamePage(props) {
  const board = useSelector((state) => state.SudokuReducer.board);
  // let board = [];
  const initialBoard = useSelector((state) => state.SudokuReducer.initialBoard);
  const status = useSelector((state) => state.SudokuReducer.status);
  const dispatch = useDispatch();
  const [times, setTimer] = useState({
    eventDate: moment
      .duration()
      .add({ days: 0, hours: 0, minutes: 10, seconds: 0 }),
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });
  const [onCount, setOnCount] = useState(false);

  const updateTimer = () => {
    console.log(status);
    if (status === "solved") {
      console.log("Break it Here!");
    }
    const x = setInterval(() => {
      let { eventDate } = times;

      if (eventDate <= 0) {
        setOnCount(false);
        toEndGame();
        clearInterval(x);
      } else {
        eventDate = eventDate.subtract(1, "s");
        const days = eventDate.days();
        const hours = eventDate.hours();
        const mins = eventDate.minutes();
        const secs = eventDate.seconds();

        setTimer({
          days,
          hours,
          mins,
          secs,
          eventDate,
        });
      }
    }, 1000);
  };

  useEffect(() => {
    if (board.length === 0) {
      dispatch(fetchSudokuAsync(props.route.params.difficulty));
    }

    if (status !== "solved" && !onCount) {
      updateTimer();
      setOnCount(true);
    }

    if (status === "solved") {
      updateTimer();
      return props.navigation.replace("Win", {
        name: props.route.params.name,
        difficulty: props.route.params.difficulty,
      });
    }
  }, [status]);

  if (!board || board.length === 0) {
    return (
      <>
        <LoadingScreen userData={props.route} />
      </>
    );
  }

  function solveBoard() {
    const encodeBoard = (board) =>
      board.reduce(
        (result, row, i) =>
          result +
          `%5B${encodeURIComponent(row)}%5D${
            i === board.length - 1 ? "" : "%2C"
          }`,
        ""
      );

    const encodeParams = (params) =>
      Object.keys(params)
        .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
        .join("&");

    const data = {
      board: initialBoard,
    };

    dispatch(autoSolveSudoku(data, encodeParams));
  }

  const validateBoard = () => {
    const encodeBoard = (board) =>
      board.reduce(
        (result, row, i) =>
          result +
          `%5B${encodeURIComponent(row)}%5D${
            i === board.length - 1 ? "" : "%2C"
          }`,
        ""
      );

    const encodeParams = (params) =>
      Object.keys(params)
        .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
        .join("&");

    const data = {
      board,
    };
    dispatch(fetchValidateSudokuAsync(data, encodeParams));
  };

  const newBoard = () => {
    dispatch(fetchSudokuAsync(props.route.params.difficulty));
  };

  function toEndGame() {
    return props.navigation.replace("End", {
      name: props.route.params.name,
      difficulty: props.route.params.difficulty,
    });
  }

  // const toWinPage = () => {
  //   return props.navigation.replace("Win", {
  //     name: props.route.params.name,
  //     difficulty: props.route.params.difficulty,
  //   });
  // };

  // if (status === "solved") {
  //   toWinPage();
  // }

  const buttonToValidate = () =>
    Alert.alert("Validate?", "Are you sure want to check your answer?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          validateBoard();
        },
      },
    ]);

  const buttonToEndGame = () =>
    Alert.alert("End Game", "Really you had enough of this game?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          toEndGame();
        },
      },
    ]);

  const buttonToAutoSolve = () =>
    Alert.alert(
      "Auto Solve?",
      "Really? Are you sure want to surrender after all this time and effort?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Nice, Keep Going!"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            solveBoard();
          },
        },
      ]
    );

  return (
    <>
      <View style={styles.screen}>
        <View style={styles.forHeader}>
          <Header />
        </View>

        {
          <View style={styles.timerText}>
            <Text>{`${times.mins} : ${times.secs}`}</Text>
          </View>
        }

        <StatusBar style="auto" />
        {board.map((row, i) => {
          return <Row key={i} rowIndex={i} row={row} />;
        })}
        <View style={styles.buttonManager}>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Auto Solve"
                onPress={buttonToAutoSolve}
                color="#c717fc"
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Validate"
                onPress={buttonToValidate}
                color="#c717fc"
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="End Game"
                onPress={buttonToEndGame}
                color="#f7287b"
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Re: Generate"
                onPress={() => newBoard()}
                color="#f7287b"
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#e0ffff",
  },
  // button: {
  //   marginTop: 50,
  //   alignItems: "center",
  // },
  title: {
    fontSize: 20,
    marginVertical: 10,
    paddingBottom: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    // width: "100%",
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: 30,
    paddingHorizontal: 15,
  },
  buttonManager: {
    flexDirection: "row",
  },
  inputContainer: {
    // width: 300,
    // maxWidth: "80%",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  button: {
    width: 150,
    paddingBottom: 20,
    borderRadius: 10,
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 100,
  },
  forHeader: {
    marginBottom: 50,
    width: "100%",
  },
  timerText: {
    marginBottom: 10,
    fontSize: 20,
  },
});

export default GamePage;
