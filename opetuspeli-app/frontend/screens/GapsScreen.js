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
            } catch {
                console.error('Error fetching gaps task:', error);
            }
        };
        fetchGapsTask();
    }, [])

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
                {sentences.map((sentence, index) => {
                    const matchingWord = words.find(w => w.wordID === sentence.wordID);
                    return (
                        <Sentence 
                            key={index}
                            sentence={sentence}
                            word={matchingWord}
                            selectedLanguage={selectedLanguage}
                            API_BASE={API_BASE}
                        />
                    )
                })}
            </View>
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Go Back</Text>
            </Pressable>
        </ScrollView>
    )
}

export default GapsScreen;