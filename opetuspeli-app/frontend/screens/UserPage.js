import Constants from 'expo-constants';
import { View, Text, Image, Pressable } from "react-native";

const UserPage = ({route, navigation}) => {
    const { user } = route.params;
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    console.log('User', user);
    console.log('Apibase', API_BASE);
    return (
        <View>
            <Text>User Page</Text>
            <Text>Username: {user?.username}</Text>
            <Text>Email: {user?.email}</Text>
            <Text>Phonenumber: {user?.phonenumber}</Text>
            <Text>Password: {user?.password}</Text>
            <Image
                source={{ uri: `${API_BASE}${user?.url}` }}
                style={{
                width: 80,
                height: 80,
                margin: 5,
                borderWidth: 2,
                borderColor: 'blue',
                borderRadius: 40
                }}
            />
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Back</Text>
            </Pressable>
        </View>
    )
}
export default UserPage;