import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from "react-native"; 
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
        <ScrollView style={styles.container}>

            {user && (
                <Navbar logout={logout} user={user} navigation={navigation} />
            )}
            {/* <Text>{user?.username}</Text> */}
            <HouseIcons user={user} categories={categories} onSelect={handleSelectCategory}/>

        </ScrollView>
    )
} 

const styles = StyleSheet.create({
    container: {
        padding: 10,
    }
})

export default HomeScreen;

// categories.map(category => (
//   <Pressable
//     key={category.categoryID}
//     disabled={category.locked}
//     onPress={() => navigation.navigate('CategoryScreen', {
//       name: category.name,
//       categoryID: category.categoryID
//     })}
//   >
//     <Text style={{ opacity: category.locked ? 0.4 : 1 }}>
//       {category.name} {category.locked ? '(Locked)' : ''}
//     </Text>
//   </Pressable>
// ));