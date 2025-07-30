import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextCard from '../components/TextCard';
import Navbar from '../components/Navbar';
import NextArrow from '../components/NextArrow';
import LanguageTabs from '../components/LanguageTabs';
import { layout, textStyles, colors, spacing } from '../constants/layout';

const TextScreen = ({ route, navigation }) => {
    const { name, categoryID, user, logout } = route.params;
    const [texts, setTexts] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [activeLanguage, setActiveLanguage] = useState(false);
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
        <View style={layout.screen}>
            <ScrollView style={layout.scrollContent}>

                <View style={layout.categoryWrapper}>
                    <Text style={textStyles.title}>
                        {route.params.name}
                    </Text>
                    <Text style={textStyles.subtitle}>Text</Text>
                </View>

                <View style={layout.wrapper}>
                    
                    <LanguageTabs 
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                    activeLanguage={activeLanguage}
                />

                    {texts.map((item, index) =>(
                        <TextCard 
                            key={index}
                            texts={item} 
                            API_BASE={API_BASE} 
                            selectedLanguage={selectedLanguage}
                        />)
                    )}
                </View>
                <NextArrow screen={'ConnectScreen'} name={name} categoryID={categoryID} user={user} logout={logout} />
            </ScrollView>

            {user && (
                <View style={layout.navbarWrapper}>
                    <Navbar user={user} logout={logout} navigation={navigation} />
                </View>
            )}

        </View>
    )
}

export default TextScreen;