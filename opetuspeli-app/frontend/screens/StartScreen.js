import { View, Text, Pressable } from "react-native"; 

const StartScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Start Screen</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
                <Text>Login</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Register')}>
                <Text>Register</Text>
            </Pressable>
        </View>
    )
} 

export default StartScreen;