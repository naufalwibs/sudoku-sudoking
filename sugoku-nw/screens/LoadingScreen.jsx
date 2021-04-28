import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

function LoadingScreen(props) {
  return (
    <View style={styles.loadingMain}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/sudoking-logo.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.loadingTitle}>Now Loading...</Text>
        <Text style={styles.waitText}>
          Please Wait {`${props.userData.params.name}`}
        </Text>
        <Text style={styles.diffcultyText}>
          Preparing {`${props.userData.params.difficulty}`} Difficulty For you
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingTitle: {
    fontSize: 30,
    marginBottom: 50,
  },
  waitText: {
    fontSize: 15,
    paddingBottom: 20,
  },
  diffcultyText: {},
  loadingMain: {
    backgroundColor: "#f7287b",
    // justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    paddingVertical: 10,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
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
    marginVertical: 50,
  },
});

export default LoadingScreen;
