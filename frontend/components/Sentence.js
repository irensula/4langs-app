import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import ImageCard from './ImageCard';
import AntDesign from '@expo/vector-icons/AntDesign';
import { layout, colors, spacing, textStyles } from '../constants/layout';

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
    }, [userInput, correctAnswer]);
    
    const parts = fullSentence.split('{{answer}}');

    useEffect(() => {
        setUserInput('');
        setIsCorrect(false);
    }, [resetTrigger]);

    return (
        <View style={{flexDirection: 'row', alignItems: 'center' }}>
            <ImageCard 
                API_BASE={API_BASE}
                image={{ word_url: sentence.word_url }} 
            />
        <View style={styles.sentence}>
            <Text style={styles.text}>{parts[0]}</Text>

            <TextInput 
                value={userInput}
                onChangeText={setUserInput}
                editable={!isCorrect}
                style={styles.input}
            />

            <Text style={styles.text}>{parts[1]}</Text>

        </View>
        {isCorrect && <Text>
                <AntDesign name="checkcircle" size={24} color={colors.primary} />    
            </Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    sentence: {
        flex: 1, 
        flexWrap: 'wrap', 
        flexDirection: 'row', 
        flexShrink: 1, 
    },
    text: {
        marginBottom: 10, 
        fontFamily: 'ABeeZee'
    },
    input: {
        borderBottomWidth: 1,
        paddingHorizontal: 5,
        width: 80,
        marginHorizontal: 4,
        borderBottomColor: colors.violet,
        borderBottomWidth: 2,
        marginBottom: 10,
        fontFamily: 'ABeeZee'
    }
})

export default Sentence;