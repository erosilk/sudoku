import React, { Component } from 'react';
import { GAME_SETTINGS } from 'utils/constants';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Cell from '../Cell';

class Board extends Component {
    constructor(props) {
        super(props);
        this.shadowedCells = [];
    }

    componentWillMount() {
        [
            [['D', 'E', 'F'], [1, 2, 3, 7, 8, 9]],
            [['A', 'B', 'C', 'G', 'H', 'I'], [4, 5, 6]],
        ].forEach(conjunto => {
            conjunto[0].forEach(letter => {
                conjunto[1].forEach(number => {
                    this.shadowedCells.push(String(number + letter));
                });
            });
        });
    }

    _onCellPress(id) {
        this.props._onCellPress(id);
    }

    render() {
        const { columns, rows } = GAME_SETTINGS;
        return (
            <View style={styles.board}>
                {rows.map(row => (
                    <View key={row} style={styles.row}>
                        {columns.map(column => {
                            const id = String(row + column);
                            return (
                                <Cell
                                    {...this.props.board[id]}
                                    onclick={this._onCellPress.bind(this)}
                                    selectedCell={
                                        this.props.selectedCell
                                    }
                                    shadowed={
                                        this.shadowedCells.indexOf(id) !== -1
                                    }
                                    key={id}
                                />
                            );
                        })}
                    </View>
                ))}
            </View>
        );
    }
}

export default Board;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    board: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
