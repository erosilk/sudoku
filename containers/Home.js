import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
    SudokuLogo,
    DifficultyLabel,
    EasyLabel,
    MediumLabel,
    HardLabel
} from "../components";
import { StackNavigator } from "react-navigation";
import { LinearGradient } from "expo";

class Home extends React.Component {
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
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <SudokuLogo />
                <View style={styles.difficultyTitle}>
                    <DifficultyLabel />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigate("Game");
                    }}
                >
                    <DifficultyLabel label={"easy"} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <DifficultyLabel label={"medium"} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <DifficultyLabel label={"hard"} />
                </TouchableOpacity>
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

export default Home;


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
