import { View, Text } from 'react-native';

const Sentence = ({ sentence, word, selectedLanguage }) => {
    console.log('Word', word);
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }


    const fullSentence = sentence[`sentence_${selectedLanguage}`];
    const gapdWord = word?.[`value_${selectedLanguage}`] || '';
    const escapedWord = escapeRegExp(gapdWord);
    const sentenceWithGap = fullSentence.replace(new RegExp(`\\b${escapedWord}(?:'s)?\\b`, 'i'),
        '_____');
    console.log('Full sentence:', fullSentence);
    console.log('Sentence with gap', sentenceWithGap);
    return (
        <View>
            <Text>{sentenceWithGap}</Text>
            {/* <Text>{fullSentence}</Text> */}
        </View>
    )
}

export default Sentence;