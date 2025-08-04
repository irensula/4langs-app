import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import shuffledArray from '../utils/shuffledArray';
import WordCard from '../components/WordCard';
import ImageCard from '../components/ImageCard';
import LanguageTabs from '../components/LanguageTabs';
import MessageModal from '../components/MessageModal';
import Navbar from '../components/Navbar';
import NextArrow from '../components/NextArrow';
import { layout, textStyles } from '../constants/layout';

const ConnectScreen = ({ navigation, route }) => {

    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    const { name, categoryID, user, logout } = route.params;
    const [pairs, setPairs] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [activeLanguage, setActiveLanguage] = useState(false);
    const [shuffledWords, setShuffledWords] = useState([]);
    const [shuffledImages, setShuffledImages] = useState([]);
    const [selectedWord, setSelectedWord] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [hasScored, setHasScored] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
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
            value: pair[`value_${selectedLanguage}`],
            [`sound_${selectedLanguage}`]: pair[`sound_${selectedLanguage}`]
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
        if (selectedImage) {
            const isMatch = selectedImage.image === word.word;
            processMatch(isMatch, word.word);
        }
    }

    const handleImagePress = (image) => {
        setSelectedImage(image);

        if (selectedWord) {
            const isMatch = image.image === selectedWord.word;
            processMatch(isMatch, selectedWord.word);
        }
    };
     
    const processMatch = (isMatch, wordID) => {
         if (isMatch) {
            setMatchedPairs((prev) => [...prev, wordID]);
        } 
            
        setSelectedWord(null);
        setSelectedImage(null);

        if ((matchedPairs.length + 1) === pairs.length) {
            handleWin();
        }
    }
       
    const handleWin = () => {
        const maxScore = pairs[0]?.maxScore || 0;

        setModalMessage(`You did it!\nYou've got ${maxScore} stars for ${selectedLanguage.toUpperCase()}.`);
        setMessageType('win');
        setModalVisible(true);

        handleScore();

        setTimeout(() => {
            resetGame();
        }, 5000);
    };

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
    };

    return (
        <View style={layout.screen}>
            <ScrollView style={layout.scrollContent}>

                <View style={layout.categoryWrapper}>
                    <Text style={textStyles.title}>
                        {route.params.name}
                    </Text>
                    <Text style={textStyles.subtitle}>Connect Task</Text>
                </View>

                <MessageModal
                    visible={modalVisible} 
                    message={modalMessage} 
                    onClose={() => setModalVisible(false)} 
                />
                
                <LanguageTabs 
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                    activeLanguage={activeLanguage}
                />
                
                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-around' }}>
                    <View>
                        {shuffledImages.map((image, index) => (
                            <ImageCard
                                key={index}
                                image={image}
                                API_BASE={API_BASE}
                                selected={selectedImage?.image === image.image}
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
                                matched={matchedPairs.includes(word.word)}
                                API_BASE={API_BASE}
                                selectedLanguage={selectedLanguage}
                            /> 
                        ))}
                    </View>
                </View>
                
                <View style={styles.buttonsWrapper}>
                    <Pressable style={[layout.buttonInner, {width: 'auto', paddingHorizontal: 20, height: 40 }]} onPress={resetGame}>
                        <Text style={textStyles.buttonTextInner}>Käynnistä uudelleen</Text>
                    </Pressable>
                
                    <NextArrow screen={'MemoScreen'} name={name} categoryID={categoryID} user={user} logout={logout} />
                </View>
                

            </ScrollView>

        {user && (
            <View style={layout.navbarWrapper}>
                <Navbar user={user} logout={logout} navigation={navigation} />
            </View>
        )}
        </View>
    )
}

const styles = StyleSheet.create({
    buttonsWrapper: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
})

export default ConnectScreen;