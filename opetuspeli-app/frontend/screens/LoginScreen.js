import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

import { useContext } from 'react';
import MessageBox from '../components/MessageBox';

import { useTheme } from '@react-navigation/native';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('info');
    const [hasError, setHasError] = useState(false);
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const { colors } = useTheme();

    const handleLogin = () => {
        if (username !== 'admin' || password !== '1234') {
            setMessage('Tarkista tiedot');
            setMessageType('error');
            setHasError(true);
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
        }
        setTimeout(() => {
            setMessage('');
            setMessageType('info');
            setHasError(false);
          }, 3000);
    }
    return (
        <View style={styles.container}>          
            <Text style={[styles.title, { color: colors.text }]}>Kirjautuminen</Text>
            <View style={{ minHeight: 50 }}>
                <MessageBox message={message} type={messageType} />
            </View>
            <Text style={[styles.label, { color: colors.text }]}>Käyttäjätunnus</Text>
            <TextInput 
                style={[
                    styles.input, 
                    { color: colors.text }, 
                    hasError && styles.inputError,
                    usernameFocused && styles.inputFocused,
                ]}
                value={username}
                onChangeText={setUsername}
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
            <Pressable onPress={handleLogin} style={[styles.button, {backgroundColor: colors.buttonBackground}]}>
                <Text style={styles.buttonText}>Kirjaudu</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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