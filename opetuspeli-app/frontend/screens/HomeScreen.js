import Constants from 'expo-constants';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { ScrollView, View, Text } from "react-native"; 
import { layout, colors, spacing, textStyles } from '../constants/layout';
import Navbar from "../components/Navbar";
import MessageModal from '../components/MessageModal';
import HouseIcons from '../components/HouseIcons';

const HomeScreen = ({ route, navigation }) => {
    const API_BASE = Constants.expoConfig.extra.API_BASE;
    const { user, token, loading } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');

    useEffect(() => {
        if (route.params?.welcomeMessage) {
            setMessage(route.params.welcomeMessage);
            setMessageType('success');
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);

            navigation.setParams({ welcomeMessage: null });

            return () => clearTimeout(timer);
        }
    }, [route.params?.welcomeMessage]);

    useEffect(() => {
        if (loading || !token || !user) return;

        fetch(`${API_BASE}/categories`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then((res) => {
            if (!res.ok) throw new Error('Failed to fetch categories');
            return res.json();
        })
        .then((data) => {
        // Add `unlocked` prop based on backend `locked` field
        const updatedCategories = data.map((category) => ({
            ...category,
            unlocked: !category.locked  // true if not locked
        }));

        setCategories(updatedCategories);
        updatedCategories.forEach(c => {
        console.log(`Category ${c.name}: locked=${c.locked}, unlocked=${c.unlocked}`);
    });
    console.log('updatedCategories', updatedCategories);

    })
        .catch((err) => {
            console.error('Fetch error:', err);
            setMessage('Could not load categories');
            setMessageType('error');
        });
    }, [token]);

    const handleSelectCategory = (category) => {
        navigation.navigate('Category', { 
            name: category.name,
            categoryID: category.categoryID,
            user,
            unlocked: category.unlocked,
    //         setUnlocked: (newUnlocked) => {
    //   setCategories(prev =>
    //     prev.map(c =>
    //       c.categoryID === category.categoryID
    //         ? { ...c, unlocked: newUnlocked }
    //         : c
    //     )
    // );
    // }
        });
    };

    return (
        <View style={layout.screen}>
            <ScrollView contentContainerStyle={layout.scrollContent}>

                <HouseIcons 
                    user={user} 
                    categories={categories} 
                    onSelect={handleSelectCategory} 
                />
            
            </ScrollView>
            
            {user && (
                <View style={layout.navbarWrapper}>
                    <Navbar user={user} navigation={navigation} />
                </View>
            )}
            
        </View>
    )
} 

export default HomeScreen;