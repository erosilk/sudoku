import React, { Component } from 'react';
import styles from '../../styles';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/*
  PROPS:
    content <Number>: Numero escrito o seteado por defecto
    solution <Number>: Numero que soluciona el casillero
    fixed <Boolean>: Si vino o no por defecto
    onclick <Function>: onClick
    selectedCell: Celda seleccionada
 */

class Cell extends Component {
    constructor(props) {
        super(props);
        this._updateBackgroundColor = this._updateBackgroundColor.bind(this);
        this.state = {
            styles: [styles.cell],
            textStyle: styles.cellNum,
        };
    }

    _updateBackgroundColor(nextProps) {
        let newStyles = [styles.cell];
        let newTextStyle = styles.cellNum;
        const selectedCell = nextProps ? nextProps.selectedCell : null;
        const { id, content, row, column } = this.props;

        if (this.props.shadowed) {
            newStyles.push(styles.shadowedCell);
            newTextStyle = styles.lightCellNum;
        }
        if (nextProps && selectedCell) {
            // same row or column
            if (selectedCell.row === row || selectedCell.column === column) {
                newStyles.push(styles.sameRowCell);
                newTextStyle = styles.lightCellNum;
            }
            // same number
            if (content && selectedCell.content === content) {
                newStyles.push(styles.sameNumberCell);
                newTextStyle = styles.lightCellNum;
            }
            // selected cell
            if (selectedCell.id === id) {
                newStyles.push(styles.selectedCell);
                newTextStyle = styles.cellNum;
            }
        }
        this.setState({
            styles: newStyles,
            textStyle: newTextStyle,
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
                    <Text style={this.state.textStyle}>
                        {this.props.content}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default Cell;
