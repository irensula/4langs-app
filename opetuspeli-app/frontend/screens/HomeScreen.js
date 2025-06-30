import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Pressable } from "react-native"; 
import Navbar from "../components/Navbar";
import HouseIcons from '../components/HouseIcons';

const HomeScreen = ({ navigation }) => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);
    const API_BASE = 'http://192.168.1.162:3001';
    const [categories, setCategories] = useState([]);

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
                <Navbar logout={logout} user={user} apiBase={API_BASE} navigation={navigation} />
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