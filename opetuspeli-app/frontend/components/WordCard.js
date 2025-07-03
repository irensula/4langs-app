// import { useState } from 'react';
// import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
// import { Audio } from 'expo-av';

// const WordRow = ({ label, value, soundFile, playSound }) => {
//     return (
//         <View style={styles.rowContainer}>

//         </View>
//     )
// }

// const WordCard = ({ word, API_BASE }) => {
//     const [currentSound, setCurrentSound] = useState(null);
//     const playSound = async (file) => {
//         if (!file) return;
//         try {
//             if (currentSound) {
//                 await currentSound.unloadAsync();
//             }
//             const { sound } = await Audio.Sound.createAsync(
//                 {uri: `${API_BASE}${file}`}
//             );
//             setCurrentSound(sound);
//             await sound.playAsync();
//         } catch (err) {
//             console.error('Sound play error:', err);
//         }
//     };

//     const renderWordRow = (label, value, langKey) => {
//         const soundFile = word.sounds?.[langKey];
//         return (
//             <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
//                 <Text style={{ flex: 1 , padding: 5}}>{label} {value}</Text>
//                 {soundFile && (
//                     <Pressable onPress={() => playSound(soundFile)}>
//                         <Text>Listen</Text>
//                     </Pressable>
//                 )}
//             </View>
//         )
//     };

//     return (
//         <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
//             {word.word_url && (
//                 <Image
//                     source={{ uri: `${API_BASE}${word.word_url}` }}
//                     style={{ width: 50, height: 50, margin: 10 }}
//                     resizeMode='containe'
//                 />
//             )}

//             {renderWordRow('Русский:', word.value_ru, 'ru')}
//             {renderWordRow('Suomi:', word.value_fi, 'fi')}
//             {renderWordRow('English:', word.value_en, 'en')}
//             {renderWordRow('Українська', word.value_ua, 'ua')}
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     rowContainer: {
//         backgroundColor: yellow,
//     }
// })

// export default WordCard;

import { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Audio } from 'expo-av';

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

    const renderWordRow = (label, value, langKey) => {
        const soundFile = word.sounds?.[langKey];
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <Text style={{ flex: 1 , padding: 5}}>{label} {value}</Text>
                {soundFile && (
                    <Pressable onPress={() => playSound(soundFile)}>
                        <Text>Listen</Text>
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
                    style={{ width: 50, height: 50, margin: 10 }}
                    resizeMode='containe'
                />
            )}

            {renderWordRow('Русский:', word.value_ru, 'ru')}
            {renderWordRow('Suomi:', word.value_fi, 'fi')}
            {renderWordRow('English:', word.value_en, 'en')}
            {renderWordRow('Українська', word.value_ua, 'ua')}
        </View>
    )
}

export default WordCard;