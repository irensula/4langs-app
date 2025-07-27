import { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import AntDesign from '@expo/vector-icons/AntDesign';
import LANG_KEYS from '../constants/langKeys';
import { layout } from '../constants/layout';

const WordListCard = ({ word, API_BASE }) => {
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

    return (        
        <View style={{ flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#ccc'}}>
            
            {word.word_url && (
                <Image
                    source={{ uri: `${API_BASE}${word.word_url}` }}
                    style={layout.image}
                    resizeMode='cover'
                />
            )}
            <View style={{flex: 1}}>
                {
                LANG_KEYS.map(({ key }) => {
                    const value = word[`value_${key}`];
                    const soundFile = word[`sound_${key}`];
                    return(
                        <View key={key} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 3 }}>
                            <Text style={{ flex: 1, padding: 5 }}>{value}</Text>
                            {soundFile && (
                                <Pressable onPress={() => playSound(soundFile)} style={{ flex: 1 }}>
                                    <AntDesign name="playcircleo" size={24} color="black" />
                                </Pressable>
                            )}
                        </View>
                    )
                })
            }
            </View>
        </View>
    )
}

export default WordListCard;