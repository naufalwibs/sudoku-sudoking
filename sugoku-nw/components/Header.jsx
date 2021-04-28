import React from "react";
import { View, StyleSheet, Image } from "react-native";

function Header(props) {
  return (
    <View style={styles.header}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.headerTitle}
          source={require("../assets/sudoking-title.png")}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 150,
    paddingVertical: 36,
    backgroundColor: "#f7287b",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    width: "100%",
  },
  imageContainer: {
    width: 300,
  },
});

export default Header;
