import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from "react-native"; 
import Navbar from "../components/Navbar";
import InteractiveSky from '../components/InteractiveSky';

const HomeScreen = ({ navigation }) => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);
    const API_BASE = 'http://192.168.1.162:3001';
    const [message, setMessage] = useState('Tap something');

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
    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Navbar logout={logout} user={user} apiBase={API_BASE} />
            <Text>Home Screen</Text>
                <InteractiveSky 
                    onSunPress={() => setMessage("Sun tapped!")}
                    onCloudPress={() => setMessage("Cloud tapped!")}
                />
            <Text>{message}</Text>
            <Text>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</Text>
        </ScrollView>
    )
} 

export default HomeScreen;