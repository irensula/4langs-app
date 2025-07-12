import { Text } from 'react-native';

const Sentence = ({ sentence, selectedLanguage }) => {
    return (
        <Text>{sentence[`sentence_${selectedLanguage}`]}</Text>
    )
}

export default Sentence;