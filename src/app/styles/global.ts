import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    input: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },

    button: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 14,
        alignSelf: 'center',
    },
});