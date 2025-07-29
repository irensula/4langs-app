import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../constants/layout';

const WordCard = ({ word, selected, onPress, matched }) => {
    console.log(styles.wordCard);
    return (
            <Pressable onPress={onPress} style={({ pressed }) => [
                { opacity: pressed ? 0.7 : 1 },
                { opacity: matched ? 0.3 : 1 },
            ]}>
                
                <View style={[
                    styles.wordCard, 
                    {
                        borderWidth: selected ? 3 : 2, 
                        backgroundColor: selected ? colors.lightgreen : '#fff',
                    }
                ]}>
                    <Text>{word.value}</Text>
                </View>
            </Pressable>
    )
}

const styles = StyleSheet.create({
    wordCard: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 100, 
        height: 75, 
        marginBottom: 5,    
        borderRadius: 15,
        borderColor: colors.secondary,
    }
})

export default WordCard;