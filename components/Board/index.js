import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Cell from "../Cell";

class Board extends Component {
  constructor(props) {
    super(props);
    this.columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    this.rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    this.shadowedCells = [];
    this.state = {
      //boardCells: []
    };
  }

  componentWillMount() {
    let puzzle = this.props.puzzleObject.puzzle;
    let solution = this.props.puzzleObject.solution;

    [
      [["D", "E", "F"], [1, 2, 3, 7, 8, 9]],
      [["A", "B", "C", "G", "H", "I"], [4, 5, 6]]
    ].forEach(conjunto => {
      conjunto[0].forEach(letter => {
        conjunto[1].forEach(number => {
          this.shadowedCells.push(String(letter + number));
        });
      });
    });

    this.rows.map((row, index) => {
      return this.columns.map(column => {
        return this.setState((prevState, props) => {
          //let newBoardCells = prevState.boardCells;
          //newBoardCells.push(String(column + row));

          puzzle = puzzle.slice(1);
          solution = solution.slice(1);
          return {
            //boardCells: newBoardCells,
            [column + row]: {
              content: puzzle[0],
              solution: solution[0],
              fixed: puzzle[0] === solution[0]
            }
          };
        });
      });
    });
  }

  _onCellPress(id) {
    this.props._onCellPress(id);
    if (this.props.selectedNumber) {
      this.setState((prevState, props) => {
        return {
          [id]: Object.assign(prevState[id], {
            content: this.props.selectedNumber
          })
        };
      });
    }
  }

  render() {
    return (
      <View style={styles.board}>
        {this.rows.map(row => {
          return (
            <View key={row} style={styles.row}>
              {this.columns.map(column => {
                return (
                  <Cell
                    content={this.state[column + row].content}
                    solution={this.state[column + row].solution}
                    fixed={this.state[column + row].fixed}
                    onclick={this._onCellPress.bind(this)}
                    selectedCell={this.props.selectedCell}
                    selectedCellNumber={
                      this.props.selectedCell ? (
                        this.state[this.props.selectedCell].content
                      ) : null
                    }
                    selectedNumber={this.props.selectedNumber}
                    shadowedCells={this.shadowedCells}
                    id={String(column + row)}
                    key={String(column + row)}
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
