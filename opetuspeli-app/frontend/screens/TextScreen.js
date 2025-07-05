import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextCard from '../components/TextCard';

const TextScreen = ({ route, navigation }) => {
    const [texts, setTexts] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const { name, categoryID } = route.params;
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    
    useEffect(() => {
        const fetchTexts = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) return;
            const res = await fetch(`${API_BASE}/categories/${categoryID}/texts`, {
                headers: {Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setTexts(data);
        } catch (error) {
            console.error('Error fetching texts:', error);
        }
    };
    fetchTexts();
}, []);
    
    return (
        <View>
            <Text>Text's for the category: {name}</Text>
            <View style={{flexDirection: 'row', gap: 10, marginBottom: 15}}>
                <Pressable onPress={(() => {setSelectedLanguage('ru')})}>Russian</Pressable>
                <Pressable onPress={(() => {setSelectedLanguage('fi')})}>Finnish</Pressable>
                <Pressable onPress={(() => {setSelectedLanguage('en')})}>English</Pressable>
                <Pressable onPress={(() => {setSelectedLanguage('ua')})}>Ukrainian</Pressable>
            </View>
            {texts.map((item, index) =>(
                <TextCard 
                    key={index}
                    texts={item} 
                    API_BASE={API_BASE} 
                    selectedLanguage={selectedLanguage}
                />)
            )}

            <Pressable onPress={() => navigation.goBack()}>
                <Text>Go Back</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('MemoScreen', { name, categoryID })}>
                <Text>Next</Text>
            </Pressable>
        </View>
    )
}
export default TextScreen;