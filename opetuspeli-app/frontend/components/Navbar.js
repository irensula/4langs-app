import Constants from 'expo-constants';
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
// icons
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import BackButton from './BackButton';
import { layout, textStyles, spacing, colors } from '../constants/layout';

const Navbar = ({logout, user, navigation }) => {
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    return (
        <View style={layout.navbarContainer}>

            <BackButton navigation={navigation} />
            
            <View style={styles.iconsWrap}>
                <Pressable onPress={logout}>
                    <Entypo name="log-out" size={40} color="green" />
                </Pressable>
                
                <Pressable onPress={() => navigation.navigate('ProgressScreen', { user })}>
                    <AntDesign name="star" size={40} color="green" />
                </Pressable>

                <Pressable onPress={() => navigation.navigate('UserScreen', { user })}>
                    <Image
                        source={{ uri: `${API_BASE}${user?.url}` }}
                        style={layout.avatar}
                    />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    iconsWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    
})

export default Navbar;