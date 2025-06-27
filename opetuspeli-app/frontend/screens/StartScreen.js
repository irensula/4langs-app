import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, Pressable } from "react-native"; 
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
        <View>
            <Text>Welcome to the App</Text>
            {isLoggedIn ? 
              (
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <Text>Continue to Home</Text>
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
        </View>
    )
} 

export default StartScreen;