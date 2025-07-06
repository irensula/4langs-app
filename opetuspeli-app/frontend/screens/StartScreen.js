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
            <Text style={styles.mainTitle}>Welcome to the App</Text>
            {isLoggedIn ? 
              (
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <View style={styles.button}>
                      <Text>Let's go!</Text>
                    </View>
                </Pressable>
              ) : (
                <>
                <View style={styles.buttonsWrap}>
                  <Pressable onPress={() => navigation.navigate('Login')}>
                      <View style={styles.button}>
                        <Text>Login</Text>
                      </View>
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate('Register')}>
                      <View style={styles.button}>
                        <Text>Register</Text>
                      </View>
                  </Pressable>
                </View>       
              </>
            )
          }
        </SafeAreaView >
    )
} 
const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#5CED73',
        justifyContent: 'center',
        alignItems: 'center',
    },
  mainTitle: {
    fontSize: 50,
    color: '#fff',
    fontFamily: 'LuckiestGuy',
    marginBottom: 30,
  },
  buttonsWrap: {
    flexDirection: 'row',
    gap: 30,
  },
    button: {
      width: 150,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 50,
      borderWidth: 3,
      borderColor: '#6BBC3B',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'NunitoBold',
    }
})

export default StartScreen;