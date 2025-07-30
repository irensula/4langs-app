import Constants from 'expo-constants';
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
// icons
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import BackButton from './BackButton';
import Fontisto from '@expo/vector-icons/Fontisto';
import { layout, textStyles, spacing, colors } from '../constants/layout';

const Navbar = ({logout, user, navigation }) => {
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    return (
        <View style={styles.navbarContainer}>
            
            <View style={styles.iconWrapper}>
                <BackButton navigation={navigation} />
            </View>

            <View style={styles.iconsWrapper}>
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <Fontisto name="home" size={29} color={colors.secondary} />
                </Pressable>

                <Pressable onPress={logout}>
                    <Entypo name="log-out" size={31} color={colors.secondary} />
                </Pressable>
                
                <Pressable onPress={() => navigation.navigate('ProgressScreen', { user })}>
                    <AntDesign name="star" size={32} color={colors.secondary} />
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
    navbarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'transparent',
    },
    navbarWrapper: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
  },
    iconsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderWidth: 2,
        borderColor: colors.secondary,
        borderRadius: 50,
        backgroundColor: colors.primary,
        paddingVertical: 5,
        paddingHorizontal: 20,
    },    
    iconWrapper: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.secondary,
        borderRadius: 100,
        backgroundColor: colors.primary,
        padding: 5,
    },
})

export default Navbar;