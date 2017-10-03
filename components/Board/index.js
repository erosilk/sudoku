import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

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
  },
  row: {
    flexDirection: "row"
  },
  board: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center"
  }
});
