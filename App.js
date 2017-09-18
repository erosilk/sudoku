import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SudokuLogo, DifficultyLabel } from "./components";
import { LinearGradient } from "expo";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SudokuLogo />
        <DifficultyLabel />
        <LinearGradient
          colors={["#FF8800", "#AF3100"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 300
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8800",
    alignItems: "center",
    justifyContent: "center"
  }
});
