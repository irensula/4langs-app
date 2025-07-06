import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MemoCard from '../components/MemoCard';

const MemoScreen = ({ route, navigation }) => {
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    const [memoCards, setMemoCards] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const { name, categoryID } = route.params;

    const doubleAndShuffle = (cards) => {
        // double the cards
        const doubled = [...cards, ...cards];
        // shuffle the doebled array
        for (let i = doubled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
        }
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
            const doubleAndShuffled = doubleAndShuffle(data);
            setMemoCards(doubleAndShuffled);

        } catch (error) {
            console.error('Error fetching texts:', error);
        }
    };
        fetchMemoGame();
    }, []);
    
    return (
        <ScrollView>
            <Text>Category {name}</Text>
            <Text>Memo Game</Text>
            <View style={{flexDirection: 'row', gap: 10, marginBottom: 15}}>
                <Pressable onPress={(() => {setSelectedLanguage('en')})}><Text>English</Text></Pressable>
                <Pressable onPress={(() => {setSelectedLanguage('fi')})}><Text>Finnish</Text></Pressable>
                <Pressable onPress={(() => {setSelectedLanguage('ua')})}><Text>Ukrainian</Text></Pressable>
                <Pressable onPress={(() => {setSelectedLanguage('ru')})}><Text>Russian</Text></Pressable>
            </View>
            
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {memoCards.map((item, index) => (
                    <MemoCard
                        key={index}
                        memoCards={item} 
                        API_BASE={API_BASE}
                        selectedLanguage={selectedLanguage}
                    />
                ))}
            </View>
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Go Back</Text>
            </Pressable>
        </ScrollView>
    )
}

export default MemoScreen;