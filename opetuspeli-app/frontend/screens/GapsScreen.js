import { View, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import LanguageTabs from '../components/LanguageTabs';
import MessageBox from '../components/MessageBox';
import Sentence from '../components/Sentence';
import WordGap from './WordGap';

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
    // MAKE IT SEPARATE
    const shuffledArray = (words) => {
        const shuffled = [...words]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; 
        }
        return shuffled;
    }

    useEffect (() => {
        console.log('Sentences:', sentences);
    }, [sentences]);

    return (
        <View>
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
                        selectedLanguage={selectedLanguage}
                    />
                ))}
            </View>

            <Pressable onPress={() => navigation.goBack()}>
                <Text>Go Back</Text>
            </Pressable>
        </View>
    )
}

export default GapsScreen;