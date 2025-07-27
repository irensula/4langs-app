import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../constants/layout';

const NextArrow = ({ screen, name, categoryID, user, logout }) => {
    const navigation = useNavigation();
    return (
        <View>
            <Pressable 
                onPress={() => navigation.navigate(screen, { name, categoryID, user, logout })}
                style={styles.iconWrap}    
            >
                <Text style={styles.icon}>
                    <Ionicons name="arrow-forward-circle" size={40} color={colors.secondary} />
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    iconWrap: {
        alignItems: 'flex-end',
    }
})

export default NextArrow;