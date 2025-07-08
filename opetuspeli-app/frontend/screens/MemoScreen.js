import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MemoCard from '../components/MemoCard';
import MessageBox from '../components/MessageBox';

const MemoScreen = ({ route, navigation }) => {
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    const [originalCards, setOriginalCards] = useState([]);
    const [memoCards, setMemoCards] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const { name, categoryID } = route.params;

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

    const doubleAndShuffle = (cards) => {
        // double the cards
        const doubled = [...cards, ...cards];
        // shuffle the doebled array
        for (let i = doubled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
        }
        console.log("Doubled array:", doubled);
        return doubled;
    }

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
            const doubleAndShuffled = doubleAndShuffle(data);
            setMemoCards(doubleAndShuffled);
            if (data.length > 0) {
                const maxScore = data[0].maxScore;
            }

        } catch (error) {
            console.error('Error fetching texts:', error);
        }
    };
        fetchMemoGame();
    }, []);
    
    useEffect(() => {
        if(openedCards.length === 2) {
            setIsDisabled(true);
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
            setMessage(`Congratulations! All cards matched. \nYou've got ${maxScore} stars for ${selectedLanguage.toUpperCase()}.`);
            setMessageType('win');

            const timer = setTimeout (() => {
                setMessage('');
                setOpenedCards([]);
                setMatchedCards([]);
                setMemoCards(doubleAndShuffle(originalCards));
            }, 5000);
        return () => clearTimeout(timer);
        }
    }, [matchedCards, memoCards, setHasScored, originalCards]);

    return (
        <ScrollView>
            <Text>Category {name}</Text>
            <Text>Memo Game</Text>
            <MessageBox message={message} messageType={messageType}/>
            <View style={{flexDirection: 'row', gap: 10, marginBottom: 15}}>
                <Pressable 
                    onPress={(() => {setSelectedLanguage('en')})}
                    disabled={activeLanguage}
                    style={{ opacity: activeLanguage && selectedLanguage !== 'en' ? 0.5 : 1 }}
                >
                    <Text>English</Text>
                </Pressable>
                <Pressable 
                    onPress={(() => {setSelectedLanguage('fi')})}
                    disabled={activeLanguage}
                    style={{ opacity: activeLanguage && selectedLanguage !== 'fi' ? 0.5 : 1 }}
                >
                    <Text>Finnish</Text>
                </Pressable>
                <Pressable 
                    onPress={(() => {setSelectedLanguage('ua')})}
                    disabled={activeLanguage}
                    style={{ opacity: activeLanguage && selectedLanguage !== 'ua' ? 0.5 : 1 }}
                >
                    <Text>Ukrainian</Text>
                </Pressable>
                <Pressable 
                    onPress={(() => {setSelectedLanguage('ru')})}
                    disabled={activeLanguage}
                    style={{ opacity: activeLanguage && selectedLanguage !== 'ru' ? 0.5 : 1 }}
                >
                    <Text>Russian</Text>
                </Pressable>
            </View>
            
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
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Go Back</Text>
            </Pressable>
        </ScrollView>
    )
}

export default MemoScreen;