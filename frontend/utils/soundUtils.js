import { Audio } from 'expo-av';

let currentSound = null;

export const playSound = async (file, baseUri = '') => {
        if (!file) return;
        try {
            if (currentSound) {
                await currentSound.unloadAsync();
            }
            const { sound } = await Audio.Sound.createAsync(
                {uri: `${baseUri}${file}`}
            );
            currentSound = sound;
            await sound.playAsync();
        } catch (err) {
            console.error('Sound play error:', err);
        }
    };