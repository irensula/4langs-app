import { View, Image, Pressable } from 'react-native';
import { layout } from '../constants/layout';

const ImageCard = ({ image, API_BASE, onPress, matched }) => {
    return (
        <Pressable onPress={onPress}>
            <View style={{ opacity: matched ? 0.3 : 1 }}>
                <Image 
                    source={{ uri: `${API_BASE}${image.word_url}` }}
                    style={[layout.image, {marginBottom: 5}]}
                    resizeMode='cover'
                /> 
            </View>      
        </Pressable>
    )
}

export default ImageCard;