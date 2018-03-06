import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    LOGO: {
        height: 96,
        width: 340,
        resizeMode: 'contain',
    },
    cell: {
        height: 35,
        width: 35,
        backgroundColor: '#FFFFFF22',
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 0,
    },
    shadowedCell: {
        backgroundColor: '#FFFFFF35',
    },
    sameNumberCell: {
        backgroundColor: '#DE555522',
    },
    sameRowCell: {
        backgroundColor: '#21B72327',
    },
    selectedCell: {
        backgroundColor: '#97C43157',
    },
    cellNum: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    lightCellNum: {
        fontSize: 20,
        color: '#FFFFFF',
    },
});
