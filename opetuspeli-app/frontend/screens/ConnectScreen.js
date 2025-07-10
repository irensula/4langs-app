import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WordCard from '../components/WordCard';
import ImageCard from '../components/ImageCard';
import LanguageTabs from '../components/LanguageTabs';

const ConnectScreen = ({ navigation, route }) => {

    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    const { name, categoryID } = route.params;
    const [pairs, setPairs] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [activeLanguage, setActive] = useState(false);
    const [shuffledWords, setShuffledWords] = useState([]);
    const [shuffledImages, setShuffledImages] = useState([]);

    useEffect(() => {
        const fetchConnectTask = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) return;
                const res = await fetch(`${API_BASE}/categories/${categoryID}/connect_task`, {
                    headers: {Authorization: `Bearer ${token}` }
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

    const shuffledPairs = (array) => {
        const shuffled = [...array]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled;
    } 

    useEffect (() => {
        const words = pairs.map(pair => ({
            word: pair.wordID,
            value: pair[`value_${selectedLanguage}`]
        }))

        const images = pairs.map(pair => ({
            image: pair.imageID,
            word_url: pair.word_url  
        }))
        
        setShuffledWords(shuffledPairs(words));
        setShuffledImages(shuffledPairs(images));
    }, [pairs, selectedLanguage])

    useEffect(() => {
        console.log('Shuffled images', shuffledImages);
        console.log('Shuffled images', shuffledWords);
    }, [shuffledImages, shuffledWords]);

    return (
        <ScrollView>
            <Text>Connect Screen to the category {name}</Text>
            <Text>Connect Task</Text>
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
                        /> 
                    ))}
                </View>
                <View>
                    {shuffledWords.map((word, index) => (
                        <WordCard
                            key={index}
                            word={word}
                        /> 
                    ))}
                </View>
            </View>
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Go Back</Text>
            </Pressable>
        </ScrollView>
    )
}
export default ConnectScreen;