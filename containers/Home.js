import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
    SudokuLogo,
    DifficultyLabel,
    EasyLabel,
    MediumLabel,
    HardLabel,
    Layout,
} from 'components';

class Home extends React.Component {
    static navigationOptions = {
        //title: "Home",
        headerStyle: {
            backgroundColor: '#1E103B',
        },
        headerTintColor: 'white',
        headerMode: 'none',
        header: null,
    };
    render() {
        const { navigate } = this.props.navigation;

        return (
            <Layout>
                <SudokuLogo />
                <View style={styles.difficultyTitle}>
                    <DifficultyLabel />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigate('Game', { difficulty: 'easy' });
                    }}
                >
                    <DifficultyLabel label={'easy'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigate('Game', { difficulty: 'medium' });
                    }}
                >
                    <DifficultyLabel label={'medium'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigate('Game', { difficulty: 'hard' });
                    }}
                >
                    <DifficultyLabel label={'hard'} />
                </TouchableOpacity>
            </Layout>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    difficultyTitle: {
        marginBottom: 30,
    },
});
