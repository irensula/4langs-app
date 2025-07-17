import { useState, useEffect } from 'react';
import {View, Text, Pressable, Image, ScrollView, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WordListCard from '../components/WordListCard';
import LANG_KEYS from '../constants/langKeys';
import Navbar from '../components/Navbar';
import NextArrow from '../components/NextArrow';

const WordsListScreen = ({ route, navigation }) => {
    const [words, setWords] = useState([]);
    const { name, categoryID, user, logout } = route.params;
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
        <ScrollView style={styles.container}>
            {user && (
                <Navbar user={user} logout={logout} navigation={navigation} />
            )}
            <Text>Words List for the category {name}</Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ width: 50, height: 50, marginRight: 10 }}></Text>
                {LANG_KEYS.map(({ key, label }) => (
                    <Text key={key} style={{ flex: 1 }}>{label}</Text>
                ))}
            </View>
            {words.map((word) => (
                <WordListCard key={word.wordID} word={word} API_BASE={API_BASE} />
            ))}

           <NextArrow screen={'TextScreen'} name={name} categoryID={categoryID} user={user} logout={logout} />

        </ScrollView>
    )
} 

const styles = StyleSheet.create({
    container: {
        padding: 10,
    }
})

export default WordsListScreen;