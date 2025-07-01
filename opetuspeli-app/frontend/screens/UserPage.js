import { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, TextInput } from "react-native";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageBox from '../components/MessageBox';

const UserPage = ({ route, navigation }) => {
    const { user: initialUser } = route.params;
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    
    const [user, setUser] = useState(initialUser);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [editMode, setEditMode] = useState(false);
    const [userdata, setUserdata] = useState({
        username: user.username,
        email: user.email,
        phonenumber: user.phonenumber,
        password: ''
    });

    useEffect(() => {
        setUserdata({
            username: user?.username || '',
            email: user?.email || '',
            phonenumber: user?.phonenumber || '',
            password: '',
        });
    }, [user]);

    const handleChange = (field, value) => {
        setUserdata(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const editUserData = async() => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                setMessage('Käyttäjän on oltava valtuutettu');
                return;
            }
            const response = await fetch(`${API_BASE}/users/${user.userID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: userdata.username,
                    email: userdata.email,
                    phonenumber: userdata.phonenumber,
                    password: userdata.password 
                })
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setMessage('Käyttäjän tiedot on päivitetty');
                setMessageType('success');
                setUser(updatedUser);
                setEditMode(false);
                await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
            } else {
                const errorData = await response.json();
                setMessage(errorData.error || 'Päivitys epäonnistui');
            }
        } catch (err) {
            console.error(err);
            setMessage('Verkko- tai palvelinvirhe');
        }
    };
    
    return (
        <View>
            <Text>User Page</Text>

            <View style={{ minHeight: 50 }}>
                <MessageBox message={message} type={messageType} />
            </View>

            <Text>Username:</Text>
            <TextInput
                value={userdata.username}
                editable={editMode}
                onChangeText={(val) => handleChange('username', val)}
                autoCapitalize='none'
            />
            <Text>Email:</Text>
            <TextInput
                value={userdata.email}
                editable={editMode}
                onChangeText={(val) => handleChange('email', val)}
                keyboardType="email-address"
                autoCapitalize='none'
            />
            <Text>Phonenumber:</Text>
            <TextInput
                value={userdata.phonenumber}
                editable={editMode}
                onChangeText={(val) => handleChange('phonenumber', val)}
                keyboardType="phone-pad"
                autoCapitalize='none'
            />
            <Text>Password:</Text>
            <TextInput
                value={userdata.password}
                editable={editMode}
                onChangeText={(val) => handleChange('password', val)}
                secureTextEntry
                placeholder="New password"
            />
            <Image
                source={{ uri: `${API_BASE}${user?.url}` }}
                style={{
                width: 80,
                height: 80,
                margin: 5,
                borderWidth: 2,
                borderColor: 'blue',
                borderRadius: 40
                }}
            />
            {editMode ? (
                <Pressable onPress={editUserData}>
                    <Text>Tallenna</Text>
                </Pressable>
            ) : (
                <Pressable onPress={() => setEditMode(true)}>
                    <Text>Muokkaa</Text>
                </Pressable>
            )}
            
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Back</Text>
            </Pressable>
        </View>
    )
}
export default UserPage;