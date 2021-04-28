import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useDispatch } from "react-redux";
import { setEmptyBoard } from "../store/actions/fetch";

function WinPage(props) {
  const dispatch = useDispatch();
  const toHomePage = () => {
    dispatch(setEmptyBoard([]));
    return props.navigation.replace("Home");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/win-logo.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Congratulation {`${props.route.params.name}`}, you are the true
          Winners!
        </Text>
        <Text style={styles.text}>
          Beating {`${props.route.params.difficulty}`} difficulty Easily!
        </Text>
      </View>
      <Button title="To Main Page" onPress={toHomePage} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: "goldenrod",
    overflow: "hidden",
    marginVertical: 30,
  },
  screen: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    backgroundColor: "#f7287b",
  },
  textContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  text: {
    marginVertical: 10,
    fontSize: 14,
  },
});

export default WinPage;
