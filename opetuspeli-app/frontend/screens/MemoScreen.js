import { View, Text, Pressable } from 'react-native';
const MemoScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Memo Game</Text>
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Go Back</Text>
            </Pressable>
        </View>
    )
}

export default MemoScreen;