import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { ScrollView, View, Text } from "react-native"; 
import { layout, colors, spacing, textStyles } from '../constants/layout';
import Navbar from "../components/Navbar";
import MessageBox from '../components/MessageBox';
import HouseIcons from '../components/HouseIcons';

const HomeScreen = ({ route, navigation }) => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    
    useEffect(() => {
        const fetchToken = async () => {
            const savedToken = await AsyncStorage.getItem('token');
            const savedUser = await AsyncStorage.getItem('user');
            if (savedToken) setToken(savedToken);
            if (savedUser) setUser(JSON.parse(savedUser));
        };
        fetchToken();
    }, []);

    useEffect(() => {
        let timer;
        if (route.params?.welcomeMessage) {
            setMessage(route.params.welcomeMessage);
            setMessageType('success');
            setTimeout(() => {
                setMessage('');
            }, 5000);
            navigation.setParams({ welcomeMessage: null });
            }
        return () => clearTimeout(timer);
    }, [route.params?.welcomeMessage]);

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setToken('');
        const check = await AsyncStorage.getItem('token');
        navigation.navigate("Start");
    }

    useEffect(() => {
        if (!token) return;

        fetch(`${API_BASE}/categories`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then((res) => res.json())
        .then((data) => {
            setCategories(data);
        })
        .catch((err) => console.error('Fetch error:', err));
    }, [token]);

    const handleSelectCategory = (category) => {
        navigation.navigate('Category', { 
            name: category.name,
            categoryID: category.categoryID,
            user,
            logout
        });
    };

    return (
        <View style={layout.screen}>
            <ScrollView contentContainerStyle={layout.scrollContent}>

                <HouseIcons user={user} categories={categories} onSelect={handleSelectCategory}/>
            
            </ScrollView>
            
            {user && (
                <View style={layout.navbarWrapper}>
                    <Navbar logout={logout} user={user} navigation={navigation} />
                </View>
            )}
            
        </View>
    )
} 

export default HomeScreen;