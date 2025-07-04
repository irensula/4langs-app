import { useState, useEffect } from 'react';
import {View, Text, Pressable, Image, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WordCard from '../components/WordCard';

const WordsListScreen = ({ route, navigation }) => {
    const [words, setWords] = useState([]);
    const { name, categoryID } = route.params;
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    
    useEffect(() => {
        const fetchWords = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) return;
                const res = await fetch(`${API_BASE}/categories/${categoryID}/words`, { 
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setWords(data);
            } catch (err) {
                console.error('Error fetching words:', err);
            }
    };
    fetchWords();
}, []);

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text>Words List for the category {name}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: 50, height: 50, marginRight: 10 }}></Text>
                <Text style={{flex: 1 }}>Русский</Text>
                <Text style={{flex: 1 }}>Suomi</Text>
                <Text style={{flex: 1 }}>English</Text>
                <Text style={{flex: 1 }}>Українська</Text>
            </View>
            {words.map((word) => (
                <WordCard key={word.wordID} word={word} API_BASE={API_BASE} />
            ))}
            <Pressable onPress={() => navigation.navigate('TextScreen', { name, categoryID })}>
                <Text>Next</Text>
            </Pressable>
            
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Back</Text>
            </Pressable>
        </ScrollView>
    )
} 

export default WordsListScreen;