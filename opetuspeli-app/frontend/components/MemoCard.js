import { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import AntDesign from '@expo/vector-icons/AntDesign';

const MemoCard = ({ memoCards, index, isOpened, isMatched, onPress, API_BASE, selectedLanguage }) => {

    const wordMap = {
        en: memoCards.value_en,
        fi: memoCards.value_fi,
        ua: memoCards.value_ua,
        ru: memoCards.value_ru
    }
    const soundMap = {
        en: memoCards.sound_en,
        fi: memoCards.sound_fi,
        ua: memoCards.sound_ua,
        ru: memoCards.sound_ru
    };
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
    const displayedWord = wordMap[selectedLanguage];
    const soundFile = soundMap[selectedLanguage];  

    useEffect(() => {
        if (isOpened && !isMatched) {
            playSound(soundFile);
        }
    }, [isOpened]);

    return (
        <View>
            {isOpened || isMatched ? (
                <View style={{ width: 120, height: 120, margin: 5, borderWidth: 2, borderColor: 'green' }}>
                    <Image 
                        source={{ uri: `${API_BASE}${memoCards.word_url}` }}
                        style={{ width: 50, height: 50, margin: 5 }}
                        resizeMode='cover'
                    />
                    <Text>{displayedWord}</Text>
                    {soundFile && (
                        <Pressable onPress={() => playSound(soundFile)} style={{ flex: 1 }}>
                            <AntDesign name="playcircleo" size={24} color="black" />
                        </Pressable>
                    )}
                </View>
                ) : (
                    <Pressable onPress={(() => onPress(index))}>
                        <View style={{ width: 120, height: 120, backgroundColor: 'green', margin: 5 }}></View>
                    </Pressable>
                )
            }
        </View>
    )
}
export default MemoCard;