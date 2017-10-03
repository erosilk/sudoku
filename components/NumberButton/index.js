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
          <Text>{this.props.number}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  numberButton: {
    backgroundColor: "rgba(0,0,0,0.3)",
    width: width / 9 - 10 / 9,
    height: 70,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default NumberButton;
