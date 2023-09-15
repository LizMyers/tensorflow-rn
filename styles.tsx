import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#171717',
      alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
    },
    results: {
        flex:1, 
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '80%',
        paddingHorizontal: 20,
        maxHeight: 300,
    },
    
}  
);
