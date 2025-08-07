import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StartScreen from './screens/StartScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import UserScreen from "./screens/UserScreen";
import CategoryScreen from './screens/CategoryScreen';
import WordsListScreen from './screens/WordsListScreen';
import TextScreen from "./screens/TextScreen";
import MemoScreen from "./screens/MemoScreen";
import ProgressScreen from "./screens/ProgressScreen";
import ConnectScreen from "./screens/ConnectScreen";
import GapsScreen from "./screens/GapsScreen";
import { colors } from "./constants/layout";

const Stack = createNativeStackNavigator();

function AppContent() {

  const [fontsLoaded] = useFonts({
    LuckiestGuy: require('./assets/fonts/LuckiestGuy-Regular.ttf'),
    ABeeZee: require('./assets/fonts/ABeeZee-Regular.ttf'),
    Nunito: require('./assets/fonts/Nunito-VariableFont_wght.ttf'),
    NunitoBold: require('./assets/fonts/Nunito-Bold.ttf'),
  });

   if (!fontsLoaded) {
    return null;
  }
  return (
      // <NavigationContainer theme={isDark ? customDarkTheme : customLightTheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="UserScreen" component={UserScreen} />
          <Stack.Screen name="ProgressScreen" component={ProgressScreen} />
          <Stack.Screen name="Category" component={CategoryScreen} />
          <Stack.Screen name="WordsListScreen" component={WordsListScreen} />
          <Stack.Screen name="TextScreen" component={TextScreen} />
          <Stack.Screen name="MemoScreen" component={MemoScreen} />
          <Stack.Screen name="ConnectScreen" component={ConnectScreen} />
          <Stack.Screen name="GapsScreen" component={GapsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: colors.primary }}>
      <AppContent />
    </SafeAreaProvider>
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
