import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import shuffledArray from '../utils/shuffledArray';
import LanguageTabs from '../components/LanguageTabs';
import MemoCard from '../components/MemoCard';
import MessageBox from '../components/MessageBox';
import Navbar from '../components/Navbar';
import NextArrow from '../components/NextArrow';
import { layout, textStyles, colors, spacing } from '../constants/layout';

const MemoScreen = ({ route, navigation }) => {
    const { name, categoryID, user, logout } = route.params;
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    const [originalCards, setOriginalCards] = useState([]);
    const [memoCards, setMemoCards] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const [openedCards, setOpenedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [activeLanguage, setActiveLanguage] = useState(false);
    const [hasScored, setHasScored] = useState(false);
    const [scoreEn, setScoreEn] = useState(null);
    const [scoreFi, setScoreFi] = useState(null);
    const [scoreUa, setScoreUa] = useState(null);
    const [scoreRu, setScoreRu] = useState(null);

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');

    const doubleAndShuffle = (array) => shuffledArray([...array, ...array]);
    
    useEffect(() => {
        const fetchMemoGame = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) return;
            const res = await fetch(`${API_BASE}/categories/${categoryID}/memogame`, {
                    headers: {Authorization: `Bearer ${token}` }
                });
            const data = await res.json();
            setOriginalCards(data);
            const shuffled = doubleAndShuffle(data);
            setMemoCards(shuffled);

        } catch (error) {
            console.error('Error fetching memogame:', error);
        }
    };
        fetchMemoGame();
    }, []);
    
    useEffect(() => {
        if(openedCards.length === 2) {
            const [firstIndex, secondIndex] = openedCards;
            const firstCard = memoCards[firstIndex];
            const secondCard = memoCards[secondIndex];

            setIsDisabled(true);
            
            const isMatch = firstCard.wordID === secondCard.wordID;

            if(isMatch) {
                setTimeout(() => {
                    setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
                    setOpenedCards([]);
                    setIsDisabled(false);
                }, 500);
            } else { 
                setTimeout(() => {
                    setOpenedCards([]);
                    setIsDisabled(false);
                }, 1000);
            }
        }
    }, [openedCards])
    
    // choose the language
    const handleCardPress = (index) => {
        if (isDisabled || openedCards.includes(index) || matchedCards.includes(index)) return;
        if (!activeLanguage) {
            setActiveLanguage(true);
        }
        const newOpened = [...openedCards, index];
        setOpenedCards(newOpened);
    }

    useEffect (() => {
        const allMatched = matchedCards.length === memoCards.length && memoCards.length > 0;

        if(allMatched && !hasScored) {
            setHasScored(true);
            
            const maxScore = originalCards.length > 0 ? originalCards[0].maxScore : null;
            if(selectedLanguage == 'en' && scoreEn === null) {
                setScoreEn(maxScore);
            }
            if(selectedLanguage == 'fi' && scoreFi === null) {
                setScoreFi(maxScore);
            }
            if(selectedLanguage == 'ua' && scoreUa === null) {
                setScoreUa(maxScore);
            }
            if(selectedLanguage == 'ru' && scoreRu === null) {
                setScoreRu(maxScore);
            }
            setMessage('Congratulations! All cards matched.');
            setMessageType('win');

            const timer1 = setTimeout (() => {
                setMessage(`You've got ${maxScore} stars for ${selectedLanguage.toUpperCase()}.`);
                setMessageType('success');
            }, 2500);

            handleScore();

            const timer2 = setTimeout(() => {
                setMessage('');
                setOpenedCards([]);
                setMatchedCards([]);
                setMemoCards(doubleAndShuffle(originalCards));
                setActiveLanguage(false);
                setHasScored(false);
            }, 5000);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [matchedCards, memoCards, originalCards]);


    // handling score GET, POST and PUT
    const handleScore = async () => { 
        try {
            const token = await AsyncStorage.getItem('token');
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const maxScore = originalCards[0]?.maxScore || 0;

            const res = await fetch(`${API_BASE}/progress/${user.id}`, {
                headers: {Authorization: `Bearer ${token}` }
            });
            
            const existingProgress = await res.json();
            const progressArray = Array.isArray(existingProgress) ? existingProgress : [];
            const exerciseID = originalCards[0]?.exerciseID;
            
            // prepare progress data
            if (!exerciseID) {
                console.error("Missing exerciseID");
                return;
            }
            const currentProgress = progressArray.find(p => p.exerciseID === exerciseID);
            const body = {
                userID: user.id,
                exerciseID: exerciseID,
                score_en: selectedLanguage === 'en' ? maxScore : (currentProgress?.score_en ?? 0),
                score_fi: selectedLanguage === 'fi' ? maxScore : (currentProgress?.score_fi ?? 0),
                score_ua: selectedLanguage === 'ua' ? maxScore : (currentProgress?.score_ua ?? 0),
                score_ru: selectedLanguage === 'ru' ? maxScore : (currentProgress?.score_ru ?? 0),
            };

            const method = currentProgress ? 'PUT' : 'POST';

            const url = currentProgress
                ? `${API_BASE}/progress/${user.id}`
                : `${API_BASE}/progress/${user.id}`;

            console.log("POST body", JSON.stringify(body, null, 2));
            const saveRes = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (!saveRes.ok) {
                throw new Error('Save failed');
            }
        } catch (error) {
            console.error(error);
            setMessage("Network error");
            setMessageType('error');
        }
};
useEffect(() => {
    console.log("originalCards:", originalCards);
}, [originalCards]);
    return (
        <View style={layout.screen}>
            <ScrollView style={styles.container}>

                <View style={layout.categoryWrapper}>
                    <Text style={textStyles.title}>
                        {route.params.name}
                    </Text>
                    <Text style={textStyles.subtitle}>Memo Game</Text>
                </View>
                
                <MessageBox message={message} messageType={messageType}/>
                
                <LanguageTabs 
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                    activeLanguage={activeLanguage}
                />
                
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {memoCards.map((card, index) => (
                        <MemoCard
                            key={index}
                            index={index}
                            memoCards={card} 
                            isOpened={openedCards.includes(index)}
                            isMatched={matchedCards.includes(index)}
                            onPress={handleCardPress}
                            API_BASE={API_BASE}
                            selectedLanguage={selectedLanguage}
                        />
                    ))}
                </View>
                <Pressable onPress={() => {
                    setMessage('');
                    setOpenedCards([]);
                    setMatchedCards([]);
                    setHasScored(false);
                    setMemoCards(doubleAndShuffle(originalCards));
                    setActiveLanguage(false);
                }}>
                    <Text>Restart</Text>
                </Pressable>

                <NextArrow screen={'GapsScreen'} name={name} categoryID={categoryID} user={user} logout={logout} />

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
    container: {
        padding: 10,
    }
})

export default MemoScreen;