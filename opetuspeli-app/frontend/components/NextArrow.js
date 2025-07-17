import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';

const NextArrow = ({ screen, name, categoryID, user, logout }) => {
    const navigation = useNavigation();
    return (
        <View>
            <Pressable 
                onPress={() => navigation.navigate(screen, { name, categoryID, user, logout })}
                style={styles.iconWrap}    
            >
                <Text style={styles.icon}>
                    <Entypo name="arrow-with-circle-right" size={24} />
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    iconWrap: {
        alignItems: 'flex-end',
    },
    icon: {
        color: '#55962f',
    }
})

export default NextArrow;