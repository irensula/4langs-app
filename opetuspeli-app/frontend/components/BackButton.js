import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const BackButton = ({ navigation }) => {
    return (
        <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle" size={40} color='green' />
        </Pressable>
    )
}

export default BackButton;