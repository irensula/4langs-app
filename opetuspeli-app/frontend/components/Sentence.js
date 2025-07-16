import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import ImageCard from './ImageCard';

const Sentence = ({ sentence, selectedLanguage, API_BASE, index, markAnswer, resetTrigger }) => {
    const [userInput, setUserInput] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    
    const correctAnswer = sentence?.[`answer_${selectedLanguage}`]?.trim().toLowerCase() || '';
    const fullSentence = sentence[`sentence_${selectedLanguage}`];
    

    useEffect (() => {
        const formatedInput = userInput.trim().toLowerCase();
        const answerIsCorrect = formatedInput === correctAnswer;
        
        if (answerIsCorrect !== isCorrect) {
                setIsCorrect(answerIsCorrect);
                markAnswer(index, answerIsCorrect);
            }
            console.log('Comparing:', formatedInput, 'vs', correctAnswer);
            console.log(`Set ${answerIsCorrect ? 'correct' : 'wrong'} answer at index:`, index);
    }, [userInput, correctAnswer]);
    
    const parts = fullSentence.split('{{answer}}');

    useEffect(() => {
        setUserInput('');
        setIsCorrect(false);
    }, [resetTrigger]);

    return (
        <View style={{flexDirection: 'row'}}>
            <ImageCard 
                API_BASE={API_BASE}
                image={{ word_url: sentence.word_url }} 
            />

            <Text>{parts[0]}</Text>

            <TextInput 
                value={userInput}
                onChangeText={setUserInput}
                placeholder='Type your answer'
                editable={!isCorrect}
                style={styles.input}
            />

            <Text>{parts[1]}</Text>

            {isCorrect && <Text>Correct!</Text>}
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