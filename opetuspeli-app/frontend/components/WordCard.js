import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../constants/layout';

const WordCard = ({ word, selected, onPress }) => {

    return (
            <Pressable onPress={onPress} >
                <View style={[
                    styles.wordCard, 
                    {
                        borderWidth: selected ? 3 : 2, 
                        borderColor: selected ? colors.secondary : 'gray',
                        backgroundColor: selected ? '#d0e8ff' : '#fff',
                    }
                ]}>
                    <Text>{word.value}</Text>
                </View>
            </Pressable>
    )
}

const styles = StyleSheet({
    wordCard: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 75, 
        height: 75, 
        margin: 5,    
        borderRadius: 15,
    }
})

export default WordCard;