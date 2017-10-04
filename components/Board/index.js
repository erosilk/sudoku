import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Cell from "../Cell";

class Board extends Component {
  constructor(props) {
    super(props);
    this.shadowedCells = [];
    this.state = {
      //boardCells: []
    };
  }

  componentWillMount() {
    [
      [["D", "E", "F"], [1, 2, 3, 7, 8, 9]],
      [["A", "B", "C", "G", "H", "I"], [4, 5, 6]]
    ].forEach(conjunto => {
      conjunto[0].forEach(letter => {
        conjunto[1].forEach(number => {
          this.shadowedCells.push(String(number + letter));
        });
      });
    });
  }

  _writeCellContent(id, number) {

  }

  _onCellPress(id) {
    this.props._onCellPress(id);
  }

  render() {
    return (
      <View style={styles.board}>
        {this.props.rows.map(row => {
          return (
            <View key={row} style={styles.row}>
              {this.props.columns.map(column => {
                return (
                  <Cell
                    content={this.props.board[row + column].content}
                    solution={this.props.board[row + column].solution}
                    fixed={this.props.board[row + column].fixed}
                    onclick={this._onCellPress.bind(this)}
                    selectedCell={this.props.selectedCell}
                    selectedCellNumber={
                      this.props.selectedCell ? (
                        this.props.board[this.props.selectedCell].content
                      ) : null
                    }
                    selectedNumber={this.props.selectedNumber}
                    shadowedCells={this.shadowedCells}
                    id={String(row + column)}
                    key={String(row + column)}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
}

export default Board;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  board: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center"
  }
});
