import { View, Text } from 'react-native';

const WordCard = ({ word }) => {

    return (
            <View style={{ justifyContent: 'center', alignContent: 'center', width: 50, height: 50, margin: 5 }}>
                <Text>{word.value}</Text>
            </View>
    )
}

export default WordCard;