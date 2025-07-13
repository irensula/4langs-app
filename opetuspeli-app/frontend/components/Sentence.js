import { View, Text } from 'react-native';

const Sentence = ({ sentence, word, selectedLanguage }) => {
    
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }


    const fullSentence = sentence[`sentence_${selectedLanguage}`];
    const gapdWord = word[`value_${selectedLanguage}`];
    const escapedWord = escapeRegExp(gapdWord);
    const sentenceWithGap = fullSentence.replace(new RegExp(`\\b${escapedWord}\\b`, 'i'), '_____');
    
    return (
        <View>
            <Text>{sentenceWithGap[`sentence_${selectedLanguage}`]}</Text>
            <Text>{fullSentence}</Text>
        </View>
    )
}

export default Sentence;