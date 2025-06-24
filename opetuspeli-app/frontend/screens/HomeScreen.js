import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from "react-native"; 
import Svg, { Circle, Ellipse, Line } from 'react-native-svg';
import Navbar from "../components/Navbar";
import InteractiveSky from '../components/InteractiveSky';

const HomeScreen = ({ navigation }) => {
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('Tap something');

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
                <InteractiveSky 
                    onSunPress={() => setMessage("Sun tapped!")}
                    onCloudPress={() => setMessage("Cloud tapped!")}
                />
            <Text>{message}</Text>
        </View>
    )
} 

export default HomeScreen;