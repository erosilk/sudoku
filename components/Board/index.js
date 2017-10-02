import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import sudoku from "../../utils/sudoku";

class Cell extends Component {
  constructor(props) {
    super(props);
    this._updateBackgroundColor = this._updateBackgroundColor.bind(this);
    this.state = {
      styles: [styles.cell]
    };
  }

  _updateBackgroundColor(nextProps) {
    let newStyles = [styles.cell];
    if (this.props.shadowedCells.indexOf(this.props.id) >= 0) {
      newStyles.push(styles.shadowedCell);
      this.setState({
        styles: newStyles
      });
    }
    if (nextProps) {
      if (
        nextProps.selectedCell.split("").indexOf(this.props.id.split("")[0]) >=
          0 ||
        nextProps.selectedCell.split("").indexOf(this.props.id.split("")[1]) >=
          0
      ) {
        newStyles.push(styles.sameRowCell);
      }
      if (
        this.props.content !== null &&
        nextProps.selectedNumber === this.props.content
      ) {
        newStyles.push(styles.sameNumberCell);
      }
      if (nextProps.selectedCell === this.props.id) {
        newStyles.push(styles.selectedCell);
      }
    }
    this.setState({
      styles: newStyles
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
          <Text style={styles.cellNum}>{this.props.content}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    this._generatePuzzle = this._generatePuzzle.bind(this);
    this.columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    this.rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    this.shadowedCells = [];
    this.state = {
      boardCells: [],
      selectedCell: null
    };
  }

  _onCellPress(id) {
    //console.log(id)
    this.setState({
      selectedCell: id
    });
  }

  _generatePuzzle() {
    let puzzle = sudoku.makepuzzle();
    let solution = sudoku.solvepuzzle(puzzle);

    const normalizedPuzzle = [];
    const normalizedSolution = [];

    puzzle.forEach(cell => {
      if (cell !== null) {
        normalizedPuzzle.push(cell + 1);
      } else {
        normalizedPuzzle.push(null);
      }
    });

    solution.forEach(cell => {
      normalizedSolution.push(cell + 1);
    });

    return {
      puzzle: normalizedPuzzle,
      solution: normalizedSolution
    };
  }

  componentWillMount() {
    let puzzleObject = this._generatePuzzle();
    let puzzle = puzzleObject.puzzle;
    let solution = puzzleObject.solution;

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
          let newBoardCells = prevState.boardCells;
          newBoardCells.push(String(column + row));

          let content = puzzle[0];
          let cellSolution = solution[0];

          puzzle = puzzle.slice(1);
          solution = solution.slice(1);
          return {
            boardCells: newBoardCells,
            [column + row]: {
              content: content,
              solution: cellSolution,
              fixed: content === solution
            }
          };
        });
      });
    });
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
                    fixed={this.state[column + row].content}
                    onclick={this._onCellPress.bind(this)}
                    selectedCell={this.state.selectedCell}
                    selectedNumber={
                      this.state.selectedCell ? (
                        this.state[this.state.selectedCell].content
                      ) : null
                    }
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
    backgroundColor: "#FFD1D1"
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
    fontSize: 20
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
