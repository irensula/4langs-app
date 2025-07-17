import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageBox from '../components/MessageBox';
import { useTheme } from '@react-navigation/native';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [hasError, setHasError] = useState(false);
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const { colors } = useTheme();

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
        <View style={styles.container}>
            <View style={styles.formContainer}>
                   
                <Text style={[styles.title, { color: colors.text }]}>Kirjautuminen</Text>
                <View style={{ minHeight: 50 }}>
                    <MessageBox message={message} type={messageType} />
                </View>
                <Text style={[styles.label, { color: colors.text }]}>Sähköposti</Text>
                <TextInput 
                    style={[
                        styles.input, 
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
                <Text style={[styles.label, { color: colors.text }]}>Salasana</Text>
                <TextInput 
                    style={[
                        styles.input, 
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
                <Pressable 
                    onPress={handleLogin} 
                    style={[styles.button, {backgroundColor: colors.buttonBackground}]}    
                >
                    <Text style={styles.buttonText}>Kirjaudu</Text>
                </Pressable>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text>Back</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5CED73',
        justifyContent: 'center',
        alignItems: 'center', 
        padding: 10,
    },
    formContainer: {
        backgroundColor: '#ABF7B1',
        borderColor: '#00C04B',
        borderWidth: 2,
        borderRadius: 20,
        padding: 20,
    },
    iconWrap: {
    },
    title: {
    },
    label: {
    },
    input: {
    },
    inputError: {
    },    
    inputFocused: {
    },
    button: {    
      },
      buttonText: {
      },
    text: {
    },
});

export default Login;