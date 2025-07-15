import { ScrollView, View, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import shuffledArray from '../utils/shuffledArray';
import LanguageTabs from '../components/LanguageTabs';
import MessageBox from '../components/MessageBox';
import Sentence from '../components/Sentence';
import WordGap from '../components/WordGap';

const GapsScreen = ({ navigation, route }) => {
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    const { name, categoryID } = route.params;
    const [sentences, setSentences] = useState([]);
    const [words, setWords] = useState([]);
    const [shuffledWords, setShuffledWords] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [activeLanguage, setActiveLanguage] = useState(false);
    const [score, setScore] = useState(0);
    
    useEffect (() => {
        const fetchGapsTask = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) return;
                const res = await fetch(`${API_BASE}/categories/${categoryID}/gaps_task`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setSentences(data);
                setWords(data);
                const shuffled = shuffledArray(data);
                setShuffledWords(shuffled);
            } catch (error) {
                console.error('Error fetching gaps task:', error);
            }
        };
        fetchGapsTask();
    }, [API_BASE, categoryID])

    const handleScore = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const maxScore = sentences.length;
            const res = await fetch(`${API_BASE}/progress/${user.id}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            const existingProgress = await res.json();
            const progressArray = Array.isArray(existingProgress) ? existingProgress : [];
            const exerciseID = sentences[0]?.exerciseID;
            const currentProgress = progressArray.find(p => p.exerciseID === exerciseID);
            
            const body = {
                userID: user.id,
                exerciseID: exerciseID,
                score_en: selectedLanguage === 'en' ? maxScore : currentProgress?.score_en || 0,
                score_fi: selectedLanguage === 'fi' ? maxScore : currentProgress?.score_fi || 0,
                score_ua: selectedLanguage === 'ua' ? maxScore : currentProgress?.score_ua || 0,
                score_ru: selectedLanguage === 'ru' ? maxScore : currentProgress?.score_ru || 0, 
            }
            const method = currentProgress ? 'PUT' : 'POST';

            const url = currentProgress
                ? `${API_BASE}/progress/${user.id}`
                : `${API_BASE}/progress/${user.id}`;

            const saveRes = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            if(!saveRes.ok) {
                throw new Error('Save failed');
            }
        } catch (error) {
            console.error('Error fetching gaps task:', error);
        }
    }

    const handleCorrectAnswer = () => {
        setScore(prev => prev + 1);
        if((score + 1) === sentences.length) {
            const maxScore = sentences[0]?.maxScore;
            console.log('MaxScore', maxScore);
            setMessage('Good job!');
            setMessageType('win');

            setTimeout(() => {
                setMessage(`You've got ${maxScore} stars for ${selectedLanguage.toUpperCase()}.`)
                setMessageType('success');
            }, 2500);

            handleScore();

            setTimeout (() => {
                resetGame();
            }, 5000);

        }
    }

    const resetGame = () => {
        const shuffled = shuffledArray(words);
        setShuffledWords(shuffled);
        setScore(0);
        setMessage('');
    }

    useEffect (() => {
        console.log('Sentences:', sentences);
    }, [sentences]);

    return (
        <ScrollView>
            <Text>Gaps Screen</Text>

            <MessageBox message={message} messageType={messageType} />

            <LanguageTabs 
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                activeLanguage={activeLanguage}
            />
            <View>
                {shuffledWords.map((word, index) => (
                    <WordGap 
                        key={index}
                        word={word}
                        selectedLanguage={selectedLanguage}
                    />
                ))}
            </View>
            <View>
                {sentences.map((sentence, index) => (
                        <Sentence 
                            key={index}
                            sentence={sentence}
                            handleCorrectAnswer={handleCorrectAnswer}
                            selectedLanguage={selectedLanguage}
                            API_BASE={API_BASE}
                        />
                    )
                )}
            </View>

            <Text>Score: {score}</Text>
            
            {/* <Pressable onPress={}>
                <Text>Send answers</Text>
            </Pressable> */}

            <Pressable onPress={resetGame}>
                <Text>Restart</Text>
            </Pressable>

            <Pressable onPress={() => navigation.goBack()}>
                <Text>Go Back</Text>
            </Pressable>

        </ScrollView>
    )
}

export default GapsScreen;