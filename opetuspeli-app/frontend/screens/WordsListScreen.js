import { useState, useEffect } from 'react';
import {View, Text, Pressable, Image, ScrollView, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WordListCard from '../components/WordListCard';
import LANG_KEYS from '../constants/langKeys';
import Navbar from '../components/Navbar';
import NextArrow from '../components/NextArrow';
import { layout, textStyles, colors, spacing } from '../constants/layout';

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
        <View style={layout.screen}>
            <ScrollView style={layout.scrollContent}>
                
                <View style={layout.categoryWrapper}>
                    <Text style={textStyles.title}>
                        {route.params.name}
                    </Text>
                    <Text style={textStyles.subtitle}>Vocabulary</Text>
                </View>
                
                <View style={layout.wrapper}>
                    {words.map((word) => (
                        <WordListCard key={word.wordID} word={word} API_BASE={API_BASE} />
                    ))}
                </View>
                <NextArrow screen={'TextScreen'} name={name} categoryID={categoryID} user={user} logout={logout} />

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
    tabsWrapper: {
        flexDirection: 'row', 
        gap: 5, 
        marginBottom: 15, 
    },
    tabWrapper: {
        borderWidth: 2, 
        backgroundColor: colors.lightorange,
        borderColor: colors.orange,  
        borderRadius: 50,
        paddingVertical: 7,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    text: {
        color: colors.white,
        fontFamily: 'ABeeZee',
        fontSize: 14,
    }
})

export default WordsListScreen;