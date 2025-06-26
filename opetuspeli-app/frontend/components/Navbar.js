import { View, Image, Text, Pressable } from "react-native";

const Navbar = ({logout, user, apiBase }) => {
    return (
        <View>
            <Image
                source={{ uri: `${apiBase}${user?.url}` }}
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
            <Pressable onPress={logout}>
                <Text>Kirjaudu ulos</Text>
            </Pressable>
        </View>
    )
}
export default Navbar;