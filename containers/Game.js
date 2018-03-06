import React, { Component } from 'react';
import Board from 'components/Board';
import Layout from 'components/Layout';
import sudoku from 'utils/sudoku';
import { GAME_SETTINGS } from 'utils/constants';
import NumberButton from 'components/NumberButton';
import { StyleSheet, View } from 'react-native';

const normalize = (sudoku) => sudoku.map(cell => cell ? cell + 1 : null);

class Game extends Component {
    static navigationOptions = {
        //title: "Home",
        headerStyle: {
            backgroundColor: '#FF8800',
        },
        headerTintColor: 'white',
        headerMode: 'none',
        header: null,
    };

    constructor(props) {
        super(props);
        this.puzzleObject;
        this.boardCells = [];
        this.state = {
            selectedCell: null,
            lastChange: [],
            board: {},
        };
    }

    componentWillMount() {
        const puzzleObject = this._generatePuzzle(this.props.difficulty);
        this.setState({
            puzzleObject: puzzleObject,
        });

        let puzzle = puzzleObject.puzzle;
        let solution = puzzleObject.solution;

        GAME_SETTINGS.rows.map((row) => {
            return GAME_SETTINGS.columns.map(column => {
                this.boardCells.push(String(row + column));
                return this.setState((prevState) => {
                    content = puzzle[0];
                    cellSolution = solution[0];
                    puzzle = puzzle.slice(1);
                    solution = solution.slice(1);
                    //debugger;
                    return {
                        board: {
                            ...prevState.board,
                            [row + column]: {
                                id: String(row + column),
                                row: row,
                                column: column,
                                content: content,
                                solution: cellSolution,
                                fixed: content === cellSolution,
                            },
                        },
                    };
                });
            });
        });
    }

    _generatePuzzle(difficulty) {
        const difficultyMargin = GAME_SETTINGS.difficultyMargins[difficulty];
        let puzzle;
        do {
          let tempPuzzle = sudoku.makepuzzle();
          let rating = sudoku.ratepuzzle(tempPuzzle,2);
          puzzle = (rating >= difficultyMargin[0] && rating <= difficultyMargin[1]) ? tempPuzzle : null
        } while (!puzzle);
        const solution = sudoku.solvepuzzle(puzzle);
        return {
            puzzle: normalize(puzzle),
            solution: normalize(solution),
        };
    }

    _selectNumber(id) {
        if (
            this.state.selectedCell &&
            !this.state.board[this.state.selectedCell.id].fixed
        ) {
            this.setState((prevState, props) => {
                let num;
                this.state.board[this.state.selectedCell.id].content === id
                    ? (num = null)
                    : (num = id);
                return {
                    board: Object.assign(prevState.board, {
                        [this.state.selectedCell.id]: Object.assign(
                            prevState.board[this.state.selectedCell.id],
                            {
                                content: num,
                            },
                        ),
                    }),
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
                />,
            );
        }
        return (
            <Layout>
                <Board
                    board={this.state.board}
                    selectedCell={this.state.selectedCell}
                    _onCellPress={id =>
                        this.setState(prevState => ({
                            selectedCell:
                                prevState.selectedCell !== this.state.board[id]
                                    ? this.state.board[id]
                                    : null,
                        }))
                    }
                    puzzleObject={this.puzzleObject}
                />
                <View style={styles.row}>{numberButtons}</View>
            </Layout>
        );
    }
}

export default Game;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    difficultyTitle: {
        marginBottom: 30,
    },
});
