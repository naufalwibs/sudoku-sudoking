import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Image, TextInput } from "react-native";
import ModalSelector from "react-native-modal-selector";
import Header from "../components/Header";

function HomePage({ navigation }) {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const toStartGame = () => {
    if (!name) {
      alert("Insert your name first, how we would know you?");
    } else if (!difficulty) {
      alert("Please select difficulty first!");
    } else {
      return navigation.replace("Game", {
        name,
        difficulty,
      });
    }
  };

  let index = 0;
  const difficultyOption = [
    { key: index++, section: true, label: "Difficulty" },
    { key: index++, label: "Easy" },
    { key: index++, label: "Medium" },
    { key: index++, label: "Hard" },
    { key: index++, label: "Random" },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/sudoking-logo.png")}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textInputManager}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          textAlign={"center"}
          placeholder="Your Name"
        />
      </View>
      <View style={styles.modalManager}>
        <ModalSelector
          data={difficultyOption}
          initValue={!difficulty ? "Select Your Difficulty!" : difficulty}
          onChange={(option) => {
            alert(`${option.label} Difficulty Has Been Selected`);
            setDifficulty(option.label);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Start Game" onPress={toStartGame} color="#c717fc" />
        </View>
      </View>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#e0ffff",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 30,
    paddingHorizontal: 15,
  },
  button: {
    width: 150,
    paddingBottom: 20,
    borderRadius: 10,
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 100,
  },
  modalManager: {
    height: 40,
    marginTop: 10,
    paddingHorizontal: 30,
  },
  modal: {
    color: "black",
  },
  textInputManager: {
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    height: 40,
    textAlign: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
    marginTop: 40,
    fontSize: 25,
    marginHorizontal: 100,
  },
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
});

export default HomePage;
