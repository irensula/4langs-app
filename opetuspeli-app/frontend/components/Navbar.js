import Constants from 'expo-constants';
import { View, Image, Text, Pressable } from "react-native";

const Navbar = ({logout, user, navigation }) => {
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    return (
        <View>
            <Pressable onPress={() => navigation.navigate('UserScreen', { user })}>
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
                <Text>
                    {user?.username}
                </Text>
            </Pressable>

            <Pressable onPress={logout}>
                <Text>Kirjaudu ulos</Text>
            </Pressable>
        </View>
    )
}
export default Navbar;