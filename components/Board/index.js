import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            content: ""
         }
    }
    render() { 
        return (
            <View style={styles.cell}>
                <Text style={styles.cellNum}>{this.props.solution}</Text>
            </View>
        )
    }
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.solution = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9]
        this.columns = ["A","B","C","D","E","F","G","H","I"];
        this.rows = ["1","2","3","4","5","6","7","8","9"];
        this.state = { 
            boardCells: []
         }
    }

    componentWillMount() {
        this.rows.forEach((row,index) => {
            this.columns.forEach((column) => {
                this.setState({
                    [column+row]: {
                        content: null,
                        solution: 2,
                        fixed: true
                    }
                })
                this.setState((prevState, props) => {
                    let newBoardCells = prevState.boardCells;
                    newBoardCells.push(String(column+row));

                    return {boardCells: newBoardCells}
                })
            })
            
        })    }

    _boardGenerator() {

    }

    render() { 
        return (
                <View style={styles.board}>
                    {this.rows.map(row => {
                        return(
                        <View style={styles.row}>
                            {this.columns.map(column => {
                                return (
                                    <Cell
                                        content={this.state[column+row].content}
                                        solution={this.state[column+row].solution}
                                        fixed={this.state[column+row].content}
                                    ></Cell>
                                )
                            })}
                        </View>)
                    })}
                </View>
        )
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
        alignItems: "center",
    },
    cellNum: {
        fontSize: 20
    },
    row: {
        flexDirection: "row"
    },
    board: {
        flex:1,
        justifyContent: 'center',
        alignItems: "center"
    }
});