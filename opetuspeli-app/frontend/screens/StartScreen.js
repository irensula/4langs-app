import { useEffect, useState, useContext } from "react";
import { ActivityIndicator, View, Text, Pressable, BackHandler, Platform, StyleSheet } from "react-native"; 
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../utils/AuthContext';
import { layout, textStyles, spacing, colors  } from '../constants/layout';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const StartScreen = ({ navigation }) => {
    const { user, token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const checkLogin = async () => {
          try {
        
            if (token && user) {
                const decoded = jwtDecode(token);
                const isExpired = decoded.exp * 1000 < Date.now();
                if (isMounted) setIsLoggedIn(!isExpired);
                } else if (isMounted) {
                  setIsLoggedIn(false);
                }
          } catch (error) {
              setIsLoggedIn(false);
          } finally {
            setLoading(false);
          }
      };
    checkLogin();
    return () => { isMounted = false; };
  }, [user, token]);

  const handleExit = () => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      alert('Please, close the app manually on iOS');
    }
  };

  if (loading) {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }
    return (
        <View style={layout.container}>
            <View>
              <Pressable onPress={handleExit}>
                <FontAwesome name="close" size={40} color={colors.secondary} />
              </Pressable>
            </View>

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
        </View>
      </View>
    )
} 
const styles = StyleSheet.create({
  buttonsWrap: {
    flexDirection: 'row',
    gap: 10,
  }
})

export default StartScreen;