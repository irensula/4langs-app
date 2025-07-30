import { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, TextInput, StyleSheet } from "react-native";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageBox from '../components/MessageBox';
import AvatarList from '../components/AvatarsList';
import Navbar from '../components/Navbar';
import { layout, textStyles, spacing, colors } from '../constants/layout';
import { ScrollView } from 'react-native-web';

const UserScreen = ({ route, navigation }) => {
    const { user: initialUser } = route.params;
    const { name, categoryID, logout } = route.params;
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
    const [avatars, setAvatars] = useState([]);
    const [selectedImageID, setSelectedImageID] = useState(user.imageID || null);
    const userAvatar = avatars.find(a => a.imageID === user.imageID);
    const userAvatarUrl = userAvatar ? userAvatar.url : null;
    console.log("userAvatar", userAvatar);
    console.log("userAvatarUrl", userAvatarUrl);
    useEffect(() => {
        setUserdata({
            username: user?.username || '',
            email: user?.email || '',
            phonenumber: user?.phonenumber || '',
            password: '',
        });
    }, [user]);

    useEffect(() => {
        async function fetchAvatars() {
            const res = await fetch(`${API_BASE}/avatars`);
            const data = await res.json();
            setAvatars(data);
        }
        fetchAvatars();
    }, []);

    useEffect(() => {
        setSelectedImageID(user.imageID || null);
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
            const response = await fetch(`${API_BASE}/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: userdata.username,
                    email: userdata.email,
                    phonenumber: userdata.phonenumber,
                    password: userdata.password,
                    imageID: selectedImageID
                })
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setMessage('Käyttäjän tiedot on päivitetty');
                setMessageType('success');
                setUser(updatedUser);
                setEditMode(false);
                await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

                setTimeout(() => {
                    setMessage('');
                }, 3000);

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
        <View style={[layout.screen, {paddingHorizontal: 10, backgroundColor: colors.primary }]}>
            <ScrollView style={[layout.scrollContent, {paddingBottom: 0 }]}>
                <View style={layout.container}>

                    <View style={{ minHeight: 50 }}>
                        {message !== '' && (<MessageBox message={message} type={messageType} />)}
                    </View>

                    <View style={[styles.infoCard, layout.shadowStyle]}>
                        <View style={styles.info}>
                        {!editMode && <Image
                            source={{ uri: userAvatarUrl ? `${API_BASE}${userAvatarUrl}` : `${API_BASE}${user?.url}` }}
                            style={styles.image}
                        />}
                        {editMode && 
                            <AvatarList 
                                avatars={avatars} 
                                onSelect={setSelectedImageID}
                                selectedImageID={selectedImageID} 
                        />}

                        {editMode && (<Text style={textStyles.label}>Username</Text>)}
                        <TextInput
                            value={userdata.username}
                            editable={editMode}
                            onChangeText={(val) => handleChange('username', val)}
                            autoCapitalize='none'
                            style={[textStyles.title, { color: colors.secondary }]}
                        />
                        <Text style={textStyles.label}>Email</Text>
                        <TextInput
                            value={userdata.email}
                            editable={editMode}
                            onChangeText={(val) => handleChange('email', val)}
                            keyboardType="email-address"
                            autoCapitalize='none'
                            style={styles.textInput}
                        />
                        <Text style={textStyles.label}>Phonenumber</Text>
                        <TextInput
                            value={userdata.phonenumber}
                            editable={editMode}
                            onChangeText={(val) => handleChange('phonenumber', val)}
                            keyboardType="phone-pad"
                            autoCapitalize='none'
                            style={styles.textInput}
                        />
                        <Text style={textStyles.label}>Password</Text>
                        <TextInput
                            value={userdata.password}
                            editable={editMode}
                            placeholder="●●●●●●"
                            placeholderTextColor="lightgrey"
                            onChangeText={(val) => handleChange('password', val)}
                            secureTextEntry
                            style={styles.textInput}
                        />
                        
                        {editMode ? (
                            <Pressable onPress={editUserData}>
                                <Text>Tallenna</Text>
                            </Pressable>
                        ) : (
                            <Pressable style={layout.buttonInner} onPress={() => setEditMode(true)}>
                                <Text style={layout.buttonTextInner}>Muokkaa</Text>
                            </Pressable>
                        )}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ backgroundColor: 'transparent' }}>
                {user && (
                    <View style={layout.navbarWrapper}>
                        <Navbar user={user} logout={logout} navigation={navigation} />
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoCard: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.secondary,
        backgroundColor: '#f0f8eb',
        overflow: 'visible',
        marginVertical: 20,
        alignSelf: 'stretch',
    },
    info: {
        alignItems: 'center',
        width: '100%',
        marginTop: -40,
    },
    image: {
        width: 80,
        height: 80,
        margin: 5,
        borderWidth: 2,
        borderColor: '#55962f',
        borderRadius: 40,
        backgroundColor: '#f0f8eb',
    },
    label: {
        fontSize: 10,
        fontFamily: "ABeeZee",
        color: '#55962f',
        marginTop: 10,
    },
    textInput : {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 18,
    },
})

export default UserScreen;