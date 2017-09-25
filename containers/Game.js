import React, { Component } from 'react';
import Board from '../components/Board';
import { StyleSheet, View } from 'react-native';
import { StackNavigator } from "react-navigation";
import { LinearGradient } from "expo";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    static navigationOptions = {
        //title: "Home",
        headerStyle: {
            backgroundColor: "#FF8800"
        },
        headerTintColor: "white",
        headerMode: "none",
        header: null
    };
    render() { 
        return (
            <View style={styles.container}>
                <Board />
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
        )
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
    difficultyTitle: {
        marginBottom: 30
    }
});