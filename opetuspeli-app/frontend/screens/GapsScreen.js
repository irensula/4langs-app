import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import shuffledArray from '../utils/shuffledArray';
import LanguageTabs from '../components/LanguageTabs';
import MessageBox from '../components/MessageBox';
import Sentence from '../components/Sentence';
import WordGap from '../components/WordGap';
import Navbar from '../components/Navbar';
import NextArrow from '../components/NextArrow';
import { layout, colors, spacing, textStyles } from '../constants/layout';

const GapsScreen = ({ navigation, route }) => {
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    const { name, categoryID, user, logout } = route.params;
    const [sentences, setSentences] = useState([]);
    const [words, setWords] = useState([]);
    const [shuffledWords, setShuffledWords] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [activeLanguage, setActiveLanguage] = useState(false);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [resetTrigger, setResetTrigger] = useState(0);
    
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

    const handleScore = async (finalScore) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const res = await fetch(`${API_BASE}/progress/${user.id}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            const existingProgress = await res.json();
            const progressArray = Array.isArray(existingProgress) ? existingProgress : [];
            const exerciseID = sentences[0]?.exerciseID;
            const currentProgress = progressArray.find(p => p.exerciseID === exerciseID);
            console.log('currentProgress', currentProgress);
            const body = {
                userID: user.id,
                exerciseID: exerciseID,
                score_en: selectedLanguage === 'en' ? finalScore : currentProgress?.score_en || 0,
                score_fi: selectedLanguage === 'fi' ? finalScore : currentProgress?.score_fi || 0,
                score_ua: selectedLanguage === 'ua' ? finalScore : currentProgress?.score_ua || 0,
                score_ru: selectedLanguage === 'ru' ? finalScore : currentProgress?.score_ru || 0, 
            }
            const method = currentProgress ? 'PUT' : 'POST';

            const url = `${API_BASE}/progress/${user.id}`;

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

    const markAnswer = (index, isCorrect) => {
        setCorrectAnswers(prev => ({...prev, [index]: isCorrect}));
        console.log('Correct answers object:', correctAnswers);
    }

    const handleSendAnswers = () => {
        const correctCount = Object.values(correctAnswers).filter(Boolean).length;
        setScore(correctCount);

        setMessage('Good job!');
        setMessageType('win');

        setTimeout(() => {
            setMessage(`You got ${correctCount} out of ${sentences.length} correct.`);
            setMessageType(correctCount === sentences.length ? 'win' : 'info');
        }, 3000)

        setTimeout(() => {
            setMessage('');
        }, 6000);

        handleScore(correctCount);
        
        setTimeout (() => {
            resetGame();
        }, 6000);
    }

    const resetGame = () => {
        const shuffled = shuffledArray(words);
        setShuffledWords(shuffled);
        setScore(0);
        setMessage('');
        setResetTrigger(prev => prev + 1);
    }

    useEffect (() => {
        console.log('Sentences:', sentences);
    }, [sentences]);

    return (
        <View style={layout.screen}>
            <ScrollView style={layout.scrollContent}>
                
                <View style={layout.categoryWrapper}>
                    <Text style={textStyles.title}>
                        {route.params.name}
                    </Text>
                    <Text style={textStyles.subtitle}>Gaps Task</Text>
                </View>

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
                                selectedLanguage={selectedLanguage}
                                API_BASE={API_BASE}
                                index={index}
                                markAnswer={markAnswer}
                                resetTrigger={resetTrigger}
                            />
                        )
                    )}
                </View>
                
                <Pressable onPress={handleSendAnswers}>
                    <Text>Send answers</Text>
                </Pressable>

                <Pressable onPress={resetGame}>
                    <Text>Restart</Text>
                </Pressable>
                
                <NextArrow screen={'Home'} name={name} categoryID={categoryID} user={user} logout={logout} />

            </ScrollView>

            <View style={layout.navbarWrapper}>
                {user && (
                    <Navbar user={user} logout={logout} navigation={navigation} />
                )}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    }
})

export default GapsScreen;