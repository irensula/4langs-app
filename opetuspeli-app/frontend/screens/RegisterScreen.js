import Constants from 'expo-constants';
import { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet } from "react-native"; 
import validateUser from "../utils/validateUser";
import AvatarsList from '../components/AvatarsList';
import MessageBox from '../components/MessageBox';
import BackButton from '../components/BackButton';
import { layout, textStyles, spacing, colors } from '../constants/layout';

const RegisterScreen = ({ navigation }) => {
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    
    useEffect(() => {
        fetch(`${API_BASE}/avatars`)
            .then(res => res.json())
            .then(data => setAvatars(data))
            .catch(console.error);
    }, []);

    const [userdata, setUserdata] = useState({
        username: '',
        email: '',
        phonenumber: '',
        password: '',
        imageID: ''
    });

    const handleChange = (field, value) => {
        setUserdata(prevState => ({
            ...prevState,
            [field]: value
        }));
    };
    
    const handleRegister = async () => { 
        const errorMessage = validateUser({
            username: userdata.username,
            email: userdata.email,
            phonenumber: userdata.phonenumber,
            imageID: userdata.imageID,
            password: userdata.password,
        });

        if (errorMessage) {
            setMessage(errorMessage);
            setMessageType('error')
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: userdata.username,
                    email: userdata.email,
                    phonenumber: userdata.phonenumber,
                    password: userdata.password,
                    imageID: parseInt(userdata.imageID) || 0 
                })
            });

            if (response.ok) {
                setMessage("Tervetuloa sovellukseen!");
                setMessageType('success');
                setTimeout(() => {
                    navigation.navigate("Login");
                }, 3000);
                
            } else {
                const errorData = await response.json();
                setMessage(errorData.error || errorData.message || "Registration failed");
                setMessageType('error');
            }
        } catch (error) {
            console.error(error);
            setMessage("Network error");
            setMessageType('error');
        }
    };

    return (
        <ScrollView style={layout.container}>
            <View>
                <BackButton navigation={navigation} />
            </View>

                <View style={layout.mainContainer}>
                <Text style={textStyles.subtitle}>Rekisteröityminen</Text>
                
                {message ? 
                    <View style={{ minHeight: 50 }}>
                        <MessageBox message={message} type={messageType} />
                    </View> 
                : null}

                <View style={[layout.formContainer, layout.shadowStyle]}>
                    <Text style={textStyles.label}>Käyttäjätunnus</Text>
                    <TextInput 
                        value={userdata.username}
                        onChangeText={(text) => handleChange('username', text)}
                        style={layout.input}
                    />

                    <Text style={textStyles.label}>Sähköposti</Text>
                    <TextInput 
                        value={userdata.email}
                        onChangeText={(text) => handleChange('email', text)}
                        style={layout.input}
                    />

                    <Text style={textStyles.label}>Puhelinnumero</Text>
                    <TextInput 
                        value={userdata.phonenumber}
                        onChangeText={(text) => handleChange('phonenumber', text)}
                        style={layout.input}
                    />

                    <Text style={textStyles.label}>Password</Text>
                    <TextInput 
                        value={userdata.password}
                        secureTextEntry={true}
                        onChangeText={(text) => handleChange('password', text)}
                        style={layout.input}
                    />
                    <View style={layout.center}>
                        <Text style={textStyles.label}>Valitse kuva</Text>
                        <AvatarsList 
                            avatars={avatars} 
                            onSelect={(imageID) => {
                                setSelectedAvatar(imageID);
                                handleChange('imageID', imageID.toString());
                        }} />
                    
                        <Pressable 
                            onPress={handleRegister}
                            style={layout.button}
                        >
                            <Text style={textStyles.buttonText}>Register</Text>
                        </Pressable>
                    </View>
                    
                </View>
            </View>
        </ScrollView>
    )
} 

const styles = StyleSheet.create({
    left: {
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'flex-start',
    },
})

export default RegisterScreen;