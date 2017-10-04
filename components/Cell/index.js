import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class Cell extends Component {
  constructor(props) {
    super(props);
    this._updateBackgroundColor = this._updateBackgroundColor.bind(this);
    this.state = {
      styles: [styles.cell],
      textStyle: styles.cellNum
    };
  }

  _updateBackgroundColor(nextProps) {
    let newStyles = [styles.cell];
    let newTextStyle = styles.cellNum;
    if (this.props.shadowedCells.indexOf(this.props.id) >= 0) {
      newStyles.push(styles.shadowedCell);
      newTextStyle = styles.lightCellNum;
    }
    if (nextProps) {
      // same row or column
      if (
        nextProps.selectedCell.split("").indexOf(this.props.id.split("")[0]) >=
          0 ||
        nextProps.selectedCell.split("").indexOf(this.props.id.split("")[1]) >=
          0
      ) {
        newStyles.push(styles.sameRowCell);
        newTextStyle = styles.cellNum;
      }
      // same number
      if (
        this.props.content !== null &&
        nextProps.selectedCellNumber === this.props.content
      ) {
        newStyles.push(styles.sameNumberCell);
        newTextStyle = styles.cellNum;
      }
      // selected cell
      if (nextProps.selectedCell === this.props.id) {
        newStyles.push(styles.selectedCell);
        newTextStyle = styles.cellNum;
      }
    }
    this.setState({
      styles: newStyles,
      textStyle: newTextStyle
    });
  }

  componentWillReceiveProps(nextProps) {
    this._updateBackgroundColor(nextProps);
  }

  componentWillMount() {
    this._updateBackgroundColor();
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onclick(this.props.id);
        }}
      >
        <View style={this.state.styles}>
          <Text style={this.state.textStyle}>{this.props.content}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Cell;

const styles = StyleSheet.create({
  cell: {
    height: 35,
    width: 35,
    backgroundColor: "white",
    margin: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  shadowedCell: {
    backgroundColor: "black"
  },
  sameNumberCell: {
    backgroundColor: "#88E7FF"
  },
  sameRowCell: {
    backgroundColor: "#FFA6A6"
  },
  selectedCell: {
    backgroundColor: "#88E7FF"
  },
  cellNum: {
    fontSize: 20,
    color: "black"
  },
  lightCellNum: {
    fontSize: 20,
    color: "#FFFFFF"
  }
});
