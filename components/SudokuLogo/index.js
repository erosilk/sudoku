import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";

const sudokuLogo = require("./sudokulogo.png");

export default class SudokuLogo extends Component {
  state = {};
  render() {
    return (
      <View>
        <Image source={sudokuLogo} style={styles.logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    height: 76,
    width: 250,
    resizeMode: "contain",
    marginBottom: 40,
    marginTop: 40
  }
});
