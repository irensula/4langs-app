import { View, Image } from 'react-native';

const ImageCard = ({ image, API_BASE }) => {
console.log('Image', image);
    return (
        <View>
            <Image 
                source={{ uri: `${API_BASE}${image.word_url}` }}
                style={{ width: 50, height: 50, margin: 5 }}
                resizeMode='cover'
            />            
        </View>
    )
}

export default ImageCard;