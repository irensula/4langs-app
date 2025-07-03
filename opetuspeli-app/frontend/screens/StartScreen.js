import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const StartScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      setIsLoggedIn(!!token && !!user);
      setLoading(false);
    };
    checkLogin();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }
    return (
        <SafeAreaView style={styles.container}>
            <Text>Welcome to the App</Text>
            {isLoggedIn ? 
              (
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <View style={styles.button}>Let's go!</View>
                </Pressable>
              ) : (
                <>
                  <Pressable onPress={() => navigation.navigate('Login')}>
                      <Text>Login</Text>
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate('Register')}>
                      <Text>Register</Text>
                  </Pressable>        
              </>
            )
          }
        </SafeAreaView >
    )
} 
const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#6BBC3B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
      width: 150,
      height: 75,
      backgroundColor: '#fff',
      borderRadius: 50,
      borderWidth: 3,
      borderColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
    }
})

export default StartScreen;