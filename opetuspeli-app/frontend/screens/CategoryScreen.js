import { Text, View, Pressable } from 'react-native';

export default function CategoryScreen({ route, navigation }) {
    const name =  route.params.name;
    const categoryID = route.params.categoryID;
    
    return (
        <View>
            <Text>
                Welcome to {route.params.name}
            </Text>
            <Pressable onPress={() => navigation.navigate('WordsListScreen', { name, categoryID })}>
                <Text>Words list</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('TextScreen', { name, categoryID })}>
                <Text>Text</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('MemoScreen', { name, categoryID })}>
                <Text>MemoGame</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ConnectScreen', { name, categoryID })}>
                <Text>Connect Task</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('GapsScreen', { name, categoryID })}>
                <Text>Gaps Task</Text>
            </Pressable>
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Back</Text>
            </Pressable>
        </View>
    )
}