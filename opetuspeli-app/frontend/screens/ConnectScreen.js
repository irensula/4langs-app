import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import shuffledArray from '../utils/shuffledArray';
import WordCard from '../components/WordCard';
import ImageCard from '../components/ImageCard';
import LanguageTabs from '../components/LanguageTabs';
import MessageBox from '../components/MessageBox';
import Navbar from '../components/Navbar';

const ConnectScreen = ({ navigation, route }) => {

    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    const { name, categoryID, user, logout } = route.params;
    const [pairs, setPairs] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [activeLanguage, setActiveLanguage] = useState(false);
    const [shuffledWords, setShuffledWords] = useState([]);
    const [shuffledImages, setShuffledImages] = useState([]);
    const [selectedWord, setSelectedWord] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [hasScored, setHasScored] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');

    useEffect(() => {
        const fetchConnectTask = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) return;
                const res = await fetch(`${API_BASE}/categories/${categoryID}/connect_task`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                console.log('Connect Task data', data)
                setPairs(data);
            } catch (error) {
                console.error('Error fetching connect task:', error);
            }
        };
        fetchConnectTask();
    }, []);

    useEffect (() => {
        const words = pairs.map(pair => ({
            word: pair.wordID,
            value: pair[`value_${selectedLanguage}`]
        }))

        const images = pairs.map(pair => ({
            image: pair.imageID,
            word_url: pair.word_url  
        }))
        
        setShuffledWords(shuffledArray(words));
        setShuffledImages(shuffledArray(images));
    }, [pairs, selectedLanguage])

    const handleWordPress = (word) => {
        setSelectedWord(word);
    }

    const handleImagePress = (image) => {
        if (!selectedWord) return;
        const isMatch = image.image === selectedWord.word;
        if (isMatch) {
            setMatchedPairs(prev => [...prev, selectedWord.word]);
            setSelectedWord(null);
        } else {
            setSelectedWord(null);
        }
        if ((matchedPairs.length + 1) === pairs.length) {

            const maxScore = pairs[0]?.maxScore || 0;
            setMessage('You did it!');
            setMessageType('win');

            const timer1 = setTimeout(() => {
                setMessage(`You've got ${maxScore} stars for ${selectedLanguage.toUpperCase()}.`);
                setMessageType('success');
            }, 2500);

            handleScore();
            
            const timer2 = setTimeout (() => {
                resetGame();
            }, 5000);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
         }
    }

    const handleScore = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const maxScore = pairs[0]?.maxScore || 0;
            const res = await fetch(`${API_BASE}/progress/${user.id}`, {
                headers: {Authorization: `Bearer ${token}`}
            });

            const existingProgress = await res.json();
            const progressArray = Array.isArray(existingProgress) ? existingProgress : [];
            const exerciseID = pairs[0]?.exerciseID;
            const currentProgress = progressArray.find(p => p.exerciseID === exerciseID);
            
            // const currentProgress = existingProgress.find(p => p.exerciseID === categoryID);

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
            console.error(error);
        }
    };

    const resetGame = () => {
        const words = pairs.map(pair => ({
            word: pair.wordID,
            value: pair[`value_${selectedLanguage}`]
        }))

        const images = pairs.map(pair => ({
            image: pair.imageID,
            word_url: pair.word_url  
        }))
        setShuffledWords(shuffledArray(words));
        setShuffledImages(shuffledArray(images));
        setMatchedPairs([]);
        setSelectedWord(null);
        setActiveLanguage(false);
        setHasScored(false);
        setMessage('');
    };

    return (
        <ScrollView>
            {user && (
                <Navbar user={user} logout={logout} navigation={navigation} />
            )}
            <Text>Connect Screen to the category {name}</Text>
            <Text>Connect Task</Text>

            <MessageBox message={message} messageType={messageType} />
            
            <LanguageTabs 
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                activeLanguage={activeLanguage}
            />
            
            <View style={{ flexDirection: 'row', gap: 100 }}>
                <View>
                    {shuffledImages.map((image, index) => (
                        <ImageCard
                            key={index}
                            image={image}
                            API_BASE={API_BASE}
                            onPress={() => handleImagePress(image)}
                            matched={matchedPairs.includes(image.image)}
                        /> 
                    ))}
                </View>
                <View>
                    {shuffledWords.map((word, index) => (
                        <WordCard
                            key={index}
                            word={word}
                            selected={selectedWord?.word === word.word}
                            onPress={() => handleWordPress(word)}
                        /> 
                    ))}
                </View>
            </View>
            <Pressable onPress={resetGame}>
                <Text>Restart</Text>
            </Pressable>
            
            <Pressable onPress={() => navigation.navigate('GapsScreen', { name, categoryID })}>
                <Text>Next</Text>
            </Pressable>
            
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Go Back</Text>
            </Pressable>

        </ScrollView>
    )
}
export default ConnectScreen;