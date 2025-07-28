import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageBox from '../components/MessageBox';
import BackButton from '../components/BackButton';
import { layout, textStyles, spacing, colors } from '../constants/layout';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [hasError, setHasError] = useState(false);
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
                setMessage('Kirjoita käyttäjätunnus ja salasana');
                setMessageType('error');
                setTimeout(() => setMessage(''), 5000);
                return;
            } 
        try {
                const response = await fetch("http://192.168.1.162:3001/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password, 
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                const user = {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    phonenumber: data.phonenumber,
                    imageID: data.imageID,
                    url: data.url
                };
                await AsyncStorage.setItem('token', data.token);
                await AsyncStorage.setItem('user', JSON.stringify(user));
                setMessage("Tervetuloa takaisin!");
                navigation.navigate("Home", { welcomeMessage: "Tervetuloa takaisin!" });
            } else {
                const errorData = await response.json();
                setMessage(errorData.error || "Kirjautuminen epäonnistui");
                setMessageType('error');
                setTimeout(() => setMessage(''), 5000);
            }
            } catch (error) {
                console.error(error);
                setMessage("Verkkovirhe. Tarkista yhteys");
                setMessageType('error');
                setTimeout(() => setMessage(''), 5000);
            }
        };
    return (
        <View style={layout.container}>

            <View>
                <BackButton navigation={navigation} />
            </View>

            <View style={layout.mainContainer}>
                <Text style={textStyles.title}>Kirjautuminen</Text>

                <View style={[layout.formContainer, layout.shadowStyle]}>
                    
                    {message ? <View style={{ minHeight: 50 }}>
                        <MessageBox message={message} type={messageType} />
                    </View> : null}
                    
                    <Text style={textStyles.label}>Sähköposti</Text>
                    <TextInput 
                        style={[
                            layout.input, 
                            { color: colors.text }, 
                            hasError && styles.inputError,
                            usernameFocused && styles.inputFocused,
                        ]}
                        value={email}
                        onChangeText={setEmail}
                        underlineColorAndroid="transparent"
                        onFocus={() => { setHasError(false); setUsernameFocused(true); }}
                        onBlur={() => setUsernameFocused(false)}
                    />
                    <Text style={textStyles.label}>Salasana</Text>
                    <TextInput 
                        style={[
                            layout.input,  
                            { color: colors.text }, 
                            hasError && styles.inputError,
                            passwordFocused && styles.inputFocused,
                        ]}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        onFocus={() => { setHasError(false); setPasswordFocused(true); }}
                        onBlur={() => setPasswordFocused(false)}
                    />
                    <View style={layout.center}>
                        <Pressable 
                            onPress={handleLogin} 
                            style={layout.button}    
                        >
                            <Text style={textStyles.buttonText}>Kirjaudu</Text>
                        </Pressable>
                    </View>
                    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputError: {
    },    
    inputFocused: {
    },
});

export default Login;