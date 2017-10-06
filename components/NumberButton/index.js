import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";

/*
    Props:
        number: int
        selected: bool

*/

const { height, width } = Dimensions.get("window");

class NumberButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onclick(this.props.number);
        }}
      >
        <View style={styles.numberButton}>
          <Text style={styles.text}>{this.props.number}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  numberButton: {
    width: width / 10 - 10 / 9,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E0607",
    margin: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 0
  },
  text: {
    color: "white",
    fontSize: 20
  }
});

export default NumberButton;
