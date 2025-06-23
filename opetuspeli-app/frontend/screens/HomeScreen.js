import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { View, Text } from "react-native"; 
import Navbar from "../components/Navbar";

const HomeScreen = ({ navigation }) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const fetchToken = async () => {
            const savedToken = await AsyncStorage.getItem('token');
            setToken(savedToken);
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
    return (
        <View>
            <Navbar logout={logout} />
            <Text>Home Screen</Text>
        </View>
    )
} 

export default HomeScreen;