import { View, Text, Image } from 'react-native';

const TextCard = ({ texts, API_BASE, selectedLanguage  }) => {
    const textMap = {
        ru: texts.text_ru,
        fi: texts.text_fi,
        en: texts.text_en,
        ua: texts.text_ua,
    }
    return (
        <View>
            <Image 
                source={{ uri: `${API_BASE}${texts.text_image}` }}
                style={{ width: 300, height: 200 }}
                resizeMode='cover'
            />
            <Text>{textMap[selectedLanguage]}</Text>
        </View>
    )
}

export default TextCard;