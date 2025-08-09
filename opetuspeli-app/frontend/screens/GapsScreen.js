import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import shuffledArray from '../utils/shuffledArray';
import LanguageTabs from '../components/LanguageTabs';
import MessageModal from '../components/MessageModal';
import Sentence from '../components/Sentence';
import WordGap from '../components/WordGap';
import Navbar from '../components/Navbar';
import NextArrow from '../components/NextArrow';
import { layout, colors, spacing, textStyles } from '../constants/layout';
import CategoryTitle from '../components/CategoryTitle';
import { useIsFocused } from '@react-navigation/native';

const GapsScreen = ({ navigation, route }) => {
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    const { name, categoryID, user } = route.params;
    const [sentences, setSentences] = useState([]);
    const [words, setWords] = useState([]);
    const [shuffledWords, setShuffledWords] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [activeLanguage, setActiveLanguage] = useState(false);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [resetTrigger, setResetTrigger] = useState(0);
    
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [refreshProgress, setRefreshProgress] = useState(0);
    const isFocused = useIsFocused();
    

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

        setModalMessage('Good job!');
        setMessageType('win');
        setModalVisible(true);

        setTimeout(() => {
            setModalMessage(`You got ${correctCount} out of ${sentences.length} correct.`);
            setMessageType(correctCount === sentences.length ? 'win' : 'info');
        }, 3000)

        setTimeout(() => {
            setModalMessage('');
            setModalVisible(false);
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
        setModalMessage('');
        setResetTrigger(prev => prev + 1);
        setRefreshProgress(Date.now());
    }

    useEffect (() => {
        console.log('Sentences:', sentences);
    }, [sentences]);

    return (
        <View style={layout.screen}>
            <ScrollView contentContainerStyle={layout.scrollContent}>
                
                <CategoryTitle 
                    user={user}
                    categoryID={categoryID} 
                    name={name} 
                    subtitle="Aukkotehtävä"
                    isFocused={isFocused}
                    refreshProgress={refreshProgress}
                />

                <MessageModal
                    visible={modalVisible} 
                    message={modalMessage} 
                    onClose={() => setModalVisible(false)} 
                />
                <View style={layout.wrapper}>
                    <LanguageTabs 
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        activeLanguage={activeLanguage}
                    />
                    
                    <View style={styles.wordsContainer}>
                        {shuffledWords.map((word, index) => (
                            <WordGap 
                                key={index}
                                word={word}
                                selectedLanguage={selectedLanguage}
                            />
                        ))}
                    </View>
                    <View style={styles.row}>
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

                    <View style={styles.buttonsWrapper}>
                        <Pressable style={[layout.buttonInner, {width: 'auto', paddingHorizontal: 18, height: 40 }]} onPress={handleSendAnswers}>
                            <Text style={textStyles.buttonTextInner}>Lähetä</Text>
                        </Pressable>

                        <Pressable style={[layout.buttonInner, {width: 'auto', paddingHorizontal: 15, height: 40 }]} onPress={resetGame}>
                            <Text style={textStyles.buttonTextInner}>Käynnistä uudelleen</Text>
                        </Pressable>
                    
                        <NextArrow screen={'Home'} name={name} categoryID={categoryID} user={user} />
                    </View>
                </View>

            </ScrollView>

            <View style={layout.navbarWrapper}>
                {user && (
                    <Navbar user={user} navigation={navigation} />
                )}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    wordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: 5
    },
    row: {
        justifyContent: 'center',
    },
    buttonsWrapper: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
})

export default GapsScreen;