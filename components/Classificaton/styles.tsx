import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row',
        minHeight: 40,
        maxWidth: 300,
        marginTop: 20,
        backgroundColor: '#292728',
        borderRadius: 7,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#5f1bbf',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    probability: {
        flex: 1,
        flexDirection: 'column',
        fontSize: 24,
        backgroundColor: '#621AC4',
        color: '#fff',
        maxWidth: 80,
        padding: 12,
        textAlign: 'center',
        height: '100%',
        paddingTop: 22,
    },
    className: {
        flex: 1,
        fontSize: 19,
        flexDirection: 'row',
        padding: 12,
        color: '#fff',
        flexWrap: 'wrap',
    },

});