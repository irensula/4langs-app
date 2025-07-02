import { useState, useEffect } from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MemoScreen = ({ route }) => {
    const [cards, setCards] = useState([]);
    const { name, categoryID } = route.params;
    const [showImage, setShowImage] = useState(false);
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    
    useEffect(() => {
        const fetchWords = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) return;
            const res = await fetch(`${API_BASE}/categories/${categoryID}/words`, { 
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setCards(data);
            
            console.log('Category name', name);
            console.log('categoryID', categoryID);
            console.log(cards);

    };
    fetchWords();
}, []);
    return (
        <View>
            <Text>MemoGame {name}</Text>
            {/* <Pressable onPress={(() => setShowImage)}>
                <View style={{
                    width: 80,
                    height: 80,
                    margin: 5,
                    borderColor: 'blue',
                    }}>
                </View>
            </Pressable> */}
            {cards.map((card) => (
                <Image 
                style={{
                    width: 80,
                    height: 80,
                    margin: 5,
                    borderColor: 'blue',
                    }}
                    key={card.wordID}
                    source={{ uri: `${API_BASE}${card.word_url}` }}
                    resizeMode="contain"
                />))}
        </View>
    )
} 

export default MemoScreen;