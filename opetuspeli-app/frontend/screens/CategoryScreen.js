import { Text, View, Pressable } from 'react-native';

export default function CategoryScreen({ route, navigation }) {
    return (
        <View>
            <Text>
                Welcome to {route.params.name}
            </Text>
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Back</Text>
            </Pressable>
        </View>
    )
}