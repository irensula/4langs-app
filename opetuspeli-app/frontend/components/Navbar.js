import Constants from 'expo-constants';
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
// icons
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const Navbar = ({logout, user, navigation }) => {
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    return (
        <View style={styles.container}>

            <Pressable onPress={() => navigation.goBack()}>
                <View style={styles.iconWrapper}>
                    <Ionicons name="arrow-back-circle" size={24} color='green' />
                </View>
            </Pressable>
            
            <View style={styles.iconsWrap}>
                <Pressable onPress={logout}>
                    <View style={styles.iconWrapper}>
                        <Entypo name="log-out" size={24} color="green" />
                    </View>
                </Pressable>
                
                <Pressable onPress={() => navigation.navigate('ProgressScreen', { user })}>
                    <View style={styles.iconWrapper}>
                        <AntDesign name="star" size={24} color="green" />
                    </View>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('UserScreen', { user })}>
                    <Image
                        source={{ uri: `${API_BASE}${user?.url}` }}
                        style={styles.image}
                    />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    iconsWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    iconWrapper: {
        width: 28,
        height: 28,
        borderColor: 'green',
        borderRadius: 100,
        borderWidth: 2,
        color: 'green',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
            width: 40,
            height: 40,
            borderWidth: 2,
            borderColor: 'green',
            borderRadius: 40
        }
})

export default Navbar;