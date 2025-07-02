import { Text, View, Pressable } from 'react-native';

export default function CategoryScreen({ route, navigation }) {
    const name =  route.params.name;
    const categoryID = route.params.categoryID;
    console.log('Category name', name);
    console.log('categoryID', categoryID);
    return (
        <View>
            <Text>
                Welcome to {route.params.name}
            </Text>
            <Pressable onPress={() => navigation.navigate('MemoScreen', { name, categoryID })}>
                <Text>Go to MemoGame</Text>
            </Pressable>
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Back</Text>
            </Pressable>
        </View>
    )
}