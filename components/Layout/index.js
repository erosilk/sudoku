import React from 'react';
import { STYLE_DEFAULTS } from 'utils/constants';
import { StyleSheet, View } from 'react-native';

export default ({ children }) => (
    <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: STYLE_DEFAULTS.colors.layoutBg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    difficultyTitle: {
        marginBottom: 30,
    },
});
