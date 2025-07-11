import { View, Text, Pressable } from 'react-native';

const WordCard = ({ word, selected, onPress }) => {

    return (
            <Pressable onPress={onPress} >
                <View style={{ 
                    justifyContent: 'center', 
                    alignContent: 'center', 
                    width: 100, 
                    height: 50, 
                    margin: 5,
                    borderWidth: selected ? 2 : 1,
                    borderColor: selected ? 'blue' : 'gray',
                    backgroundColor: selected ? '#d0e8ff' : '#fff',
                }}>
                    <Text>{word.value}</Text>
                </View>
            </Pressable>
    )
}

export default WordCard;