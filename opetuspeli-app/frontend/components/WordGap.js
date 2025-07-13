import { View, Text } from "react-native-web";

const WordGap = ({ word, selectedLanguage }) => {
    return (
        <View>
            <Text>{word[`value_${selectedLanguage}`]}</Text>
        </View>
    )
}

export default WordGap;