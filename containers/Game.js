import React, { Component } from 'react';
import Board from 'components/Board';
import Layout from 'components/Layout';
import sudoku from 'utils/sudoku';
import { GAME_SETTINGS } from 'utils/constants';
import NumberButton from 'components/NumberButton';
import { StyleSheet, View } from 'react-native';

const normalize = sudoku =>
    sudoku.map(cell => (cell !== null ? cell + 1 : null));

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
        const puzzle = puzzleObject.puzzle;
        const solution = puzzleObject.solution;
        let board = {};

        GAME_SETTINGS.rows.forEach((row, rowIndex) => {
            GAME_SETTINGS.columns.forEach((column, columnIndex) => {
                this.boardCells.push(String(row + column));
                const index = 9 * rowIndex + columnIndex;
                board = {
                    ...board,
                    [row + column]: {
                        id: String(row + column),
                        row: row,
                        column: column,
                        content: puzzle[index],
                        solution: solution[index],
                        fixed: puzzle[index] === solution[index],
                    },
                };
            });
        });

        this.setState({ board: board, puzzleObject: puzzleObject });
    }

    _generatePuzzle(difficulty) {
        const difficultyMargin = GAME_SETTINGS.difficultyMargins[difficulty];
        let puzzle;
        do {
            let tempPuzzle = sudoku.makepuzzle();
            let rating = sudoku.ratepuzzle(tempPuzzle, 2);
            puzzle =
                rating >= difficultyMargin[0] && rating <= difficultyMargin[1]
                    ? tempPuzzle
                    : null;
        } while (!puzzle);
        const solution = sudoku.solvepuzzle(puzzle);
        return {
            puzzle: normalize(puzzle),
            solution: normalize(solution),
        };
    }

    _selectNumber(number) {
        const selectedCell = this.state.selectedCell
            ? this.state.board[this.state.selectedCell.id]
            : null;
        if (selectedCell && !selectedCell.fixed) {
            this.setState(prevState => ({
                board: {
                    ...prevState.board,
                    [selectedCell.id]: {
                        ...prevState.board[selectedCell.id],
                        content:
                            selectedCell.content !== number ? number : null,
                    },
                },
            }));
        }
    }

    numberButtons() {
        let numberButtons = [];
        for (let i = 1; i <= 9; i++) {
            numberButtons.push(
                <NumberButton
                    key={i}
                    number={i}
                    onclick={this._selectNumber.bind(this)}
                />,
            );
        }
        return numberButtons;
    }

    render() {
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
                <View style={styles.row}>{this.numberButtons()}</View>
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
