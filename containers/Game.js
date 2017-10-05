import React, { Component } from "react";
import Board from "../components/Board";
import sudoku from "../utils/sudoku";
import NumberButton from "../components/NumberButton";
import { StyleSheet, View, Dimensions } from "react-native";
import { StackNavigator } from "react-navigation";
import { LinearGradient } from "expo";

const width = Dimensions.get.width;

class Game extends Component {
  static navigationOptions = {
    //title: "Home",
    headerStyle: {
      backgroundColor: "#FF8800"
    },
    headerTintColor: "white",
    headerMode: "none",
    header: null
  };

  constructor(props) {
    super(props);
    this.puzzleObject;
    this.columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    this.rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    this.state = {
      selectedCell: null,
      selectedNumber: null,
      lastChange: [],
      board: {}
    };
  }

  componentWillMount() {
    const puzzleObject = this._generatePuzzle();
    this.setState({
      puzzleObject: puzzleObject
    });

    let puzzle = puzzleObject.puzzle;
    let solution = puzzleObject.solution;

    this.rows.map((row, index) => {
      return this.columns.map(column => {
        return this.setState((prevState, props) => {
          content = puzzle[0];
          cellSolution = solution[0];
          puzzle = puzzle.slice(1);
          solution = solution.slice(1);
          return Object.assign(this.state.board, {
            [row + column]: {
              content: content,
              solution: cellSolution,
              fixed: content === cellSolution
            }
          });
        });
      });
    });
  }

  _onCellPress(id) {
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

  _selectNumber(id) {
    if (
      this.state.selectedCell &&
      !this.state.board[this.state.selectedCell].fixed
    ) {
      this.setState((prevState, props) => {
        let num;
        this.state.board[this.state.selectedCell].content === id
          ? (num = null)
          : (num = id);
        return {
          board: Object.assign(prevState.board, {
            [this.state.selectedCell]: Object.assign(
              prevState.board[this.state.selectedCell],
              {
                content: num
              }
            )
          })
        };
      });
    }
  }

  render() {
    var numberButtons = [];
    for (var i = 1; i <= 9; i++) {
      numberButtons.push(
        <NumberButton
          key={i}
          number={i}
          onclick={this._selectNumber.bind(this)}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Board
          board={this.state.board}
          rows={this.rows}
          columns={this.columns}
          selectedCell={this.state.selectedCell}
          selectedNumber={this.state.selectedNumber}
          _onCellPress={this._onCellPress.bind(this)}
          puzzleObject={this.puzzleObject}
        />
        <View style={styles.row}>{numberButtons}</View>
        <LinearGradient
          colors={["#FF8800", "#AF3100"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 300,
            zIndex: -1
          }}
        />
      </View>
    );
  }
}

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8800",
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flexDirection: "row"
  },
  difficultyTitle: {
    marginBottom: 30
  }
});
