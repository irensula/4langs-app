import { View, Text, Pressable } from "react-native";

const Navbar = ({logout}) => {
    return (
        <View>
            <Pressable onPress={logout}>
                <Text>Kirjaudu ulos</Text>
            </Pressable>
        </View>
    )
}
export default Navbar;