import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, Pressable, StyleSheet } from "react-native"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { layout, textStyles, spacing  } from '../constants/layout';

const StartScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user');
        
            if (token && user) {
                const decoded = jwtDecode(token);
                const isExpired = decoded.exp * 1000 < Date.now();
                
                if (isExpired) {
                  await AsyncStorage.multiRemove(['token', 'user']);
                  setIsLoggedIn(false);
                } else {
                  setIsLoggedIn(true);
                }
            } else {
              setIsLoggedIn(false);
            }
          } catch (error) {
              await AsyncStorage.multiRemove(['token', 'user']);
              setIsLoggedIn(false);
          } finally {
            setLoading(false);
          }
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
        <View style={layout.mainContainer}>
            <Text style={textStyles.mainTitle}>Tervetuloa!</Text>
            {isLoggedIn ? 
              (
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <View style={layout.button}>
                      <Text style={textStyles.buttonText}>Let's go!</Text>
                    </View>
                </Pressable>
              ) : (
                <>
                <View style={styles.buttonsWrap}>
                  <Pressable onPress={() => navigation.navigate('Login')}>
                      <View style={layout.button}>
                        <Text style={textStyles.buttonText}>Login</Text>
                      </View>
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate('Register')}>
                      <View style={layout.button}>
                        <Text style={textStyles.buttonText}>Register</Text>
                      </View>
                  </Pressable>
                </View>       
              </>
            )
          }
        </View >
    )
} 
const styles = StyleSheet.create({
  buttonsWrap: {
    flexDirection: 'row',
    gap: 10,
  }
})

export default StartScreen;