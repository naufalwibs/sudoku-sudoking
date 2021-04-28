import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

function StartGameScreen({ navigation }) {
  const toHomePage = () => {
    return navigation.replace("Home");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/sudoking-main-logo.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Welcome to Sudoku Game!</Text>
        <Text style={styles.text}>Conquer Sudoku === Conquer the World!</Text>
        <Button onPress={toHomePage} title="Tap to Start" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 500,
    height: 500,
    marginVertical: 10,
  },
  screen: {
    flex: 1,
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

export default StartGameScreen;
