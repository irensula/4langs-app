import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Sentence = ({ sentence, word, selectedLanguage }) => {
    const [userInput, setUserInput] = useState('');
    const fullSentence = sentence[`sentence_${selectedLanguage}`];
    const parts = fullSentence.split('{{answer}}');

    return (
        <View style={{flexDirection: 'row'}}>
            <Text>{parts[0]}</Text>
            <TextInput 
                value={userInput}
                onChangeText={setUserInput}
                autoCapitalize="none"
                style={styles.input}
            >
            </TextInput>
            <Text>{parts[1]}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderColor: '#888',
        padding: 4,
        minWidth: 60,
        marginHorizontal: 4,
    }
})

export default Sentence;