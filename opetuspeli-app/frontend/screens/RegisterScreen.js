import { View, Text, Pressable } from "react-native"; 

const RegisterScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Register</Text>
            
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Back</Text>
            </Pressable>

        </View>
    )
} 

export default RegisterScreen;