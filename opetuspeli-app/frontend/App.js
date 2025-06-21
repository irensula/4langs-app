import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import StartScreen from './screens/StartScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

function AppContent() {

  //const { isDark } = useTheme();
  
  return (
      // <NavigationContainer theme={isDark ? customDarkTheme : customLightTheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: true }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppContent />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
