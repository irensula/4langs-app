import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Pressable } from "react-native"; 
import Navbar from "../components/Navbar";
import HouseIcons from '../components/HouseIcons';

const HomeScreen = ({ navigation }) => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    
    useEffect(() => {
        const fetchToken = async () => {
            const savedToken = await AsyncStorage.getItem('token');
            const savedUser = await AsyncStorage.getItem('user');
            console.log("Saved user from AsyncStorage:", savedUser);
            if (savedToken) setToken(savedToken);
            if (savedUser) setUser(JSON.parse(savedUser));
        };
        fetchToken();
    }, []);

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setToken('');
        console.log("Token deleted");
        
        const check = await AsyncStorage.getItem('token');
        console.log("Token from storage after logout:", check);
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
            console.log("Categories:", data);
        })
        .catch((err) => console.error('Fetch error:', err));
    }, [token]);

    const handleSelectCategory = (categoryName) => {
        navigation.navigate('Category', { name: categoryName });
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            {user && (
                <Navbar logout={logout} user={user} navigation={navigation} />
            )}
            <Text>Home Screen</Text>
            
            <HouseIcons categories={categories} onSelect={handleSelectCategory}/>

            <Pressable onPress={() => navigation.goBack()}>
                <Text>Back</Text>
            </Pressable>
        </ScrollView>
    )
} 

export default HomeScreen;