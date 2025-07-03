import { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import AntDesign from '@expo/vector-icons/AntDesign';

const WordCard = ({ word, API_BASE }) => {
    const [currentSound, setCurrentSound] = useState(null);
    const playSound = async (file) => {
        if (!file) return;
        try {
            if (currentSound) {
                await currentSound.unloadAsync();
            }
            const { sound } = await Audio.Sound.createAsync(
                {uri: `${API_BASE}${file}`}
            );
            setCurrentSound(sound);
            await sound.playAsync();
        } catch (err) {
            console.error('Sound play error:', err);
        }
    };

    const renderWordRow = (value, langKey) => {
        const soundFile = word.sounds?.[langKey];
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <Text style={{ flex: 1 , padding: 5}}>{value}</Text>
                {soundFile && (
                    <Pressable onPress={() => playSound(soundFile)} style={{ flex: 1 }}>
                        <AntDesign name="playcircleo" size={24} color="black" />
                    </Pressable>
                )}
            </View>
        )
    };

    return (        
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
            {word.word_url && (
                <Image
                    source={{ uri: `${API_BASE}${word.word_url}` }}
                    style={{ width: 50, height: 50, marginRight: 10 }}
                    resizeMode='cover'
                />
            )}

            <View style={{flex: 1 }}>{renderWordRow(word.value_ru, 'ru')}</View>
            <View style={{flex: 1 }}>{renderWordRow(word.value_fi, 'fi')}</View>
            <View style={{flex: 1 }}>{renderWordRow(word.value_en, 'en')}</View>
            <View style={{flex: 1 }}>{renderWordRow(word.value_ua, 'ua')}</View>
        </View>
    )
}

export default WordCard;