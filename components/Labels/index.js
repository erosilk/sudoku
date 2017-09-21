import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";

const difficultyLabelImage = require("./difficultylabel.png");
const easyImage = require("./easy.png");
const mediumImage = require("./medium.png");
const hardImage = require("./hard.png");

class EasyLabel extends Component {
    render() {
        return (
            <View>
                <Image source={easyImage} style={styles.label} />
            </View>
        );
    }
}

class MediumLabel extends Component {
    render() {
        return (
            <View>
                <Image source={mediumImage} style={styles.label} />
            </View>
        );
    }
}

class HardLabel extends Component {
    render() {
        return (
            <View>
                <Image source={hardImage} style={styles.label} />
            </View>
        );
    }
}

class DifficultyLabel extends Component {
    render() {
        let source;
        switch (this.props.label) {
            case "easy":
                source = easyImage;
                break;
            case "medium":
                source = mediumImage;
                break;
            case "hard":
                source = hardImage;
                break;
            default:
                source = difficultyLabelImage;
                break;
        }
        return (
            <View>
                <Image source={source} style={styles.label} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        height: 26,
        width: 240,
        resizeMode: "contain",
        marginBottom: 40,
    }
});

export { DifficultyLabel };
