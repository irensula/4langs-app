import { View, Text, Image, Pressable } from "react-native";

const UserPage = ({route, navigation}) => {
    const { user, apiBase } = route.params;
    console.log('User', user);
    console.log('Apibase', apiBase);
    return (
        <View>
            <Text>User Page</Text>
            <Text>Username: {user?.username}</Text>
            <Text>Email: {user?.email}</Text>
            <Text>Phonenumber: {user?.phonenumber}</Text>
            <Text>Password: {user?.password}</Text>
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
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Back</Text>
            </Pressable>
        </View>
    )
}
export default UserPage;