import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { textStyles, colors, layout, spacing } from '../constants/layout';
import AntDesign from '@expo/vector-icons/AntDesign';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoryTitle = ({ user, categoryID, name, subtitle, isFocused, refreshProgress, setUnlocked }) => {
    const API_BASE = Constants.expoConfig.extra.API_BASE;
    const [progress, setProgress] = useState(0);
    const [progressMax, setProgressMax] = useState(0);
    
    useEffect (() => {
        if (!isFocused) return;
        const fetchProgress = async () => {
            
            const token = await AsyncStorage.getItem('token');

            if (!token || !user || !categoryID) return;

            try {
                const [progressRes, maxScoreRes] = await Promise.all([
                    fetch(`${API_BASE}/progress/${user.id}/${categoryID}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch(`${API_BASE}/max-score/${categoryID}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);

                const progressData = await progressRes.json();
                const maxScoreData = await maxScoreRes.json();

                console.log('Progress:', progressData);
                console.log('Max score:', maxScoreData);

                setProgress(progressData);
                setProgressMax(maxScoreData.totalMaxScore);
                setUnlocked(progressData.unlockNext);

            } catch (err) {
                console.error('Error fetching progress or max score:', err);
            }
        };
        fetchProgress();
        }, [user, categoryID, isFocused, refreshProgress]);

    return (
        <View style={styles.categoryWrapper}>
            <View style={styles.progressWrapper}>
                <AntDesign name="star" size={24} color={colors.yellow} />
                <Text style={styles.progressText}>
                    {progress.totalProgressAllLanguages} / {progressMax}
                </Text>
            </View>
            <Text style={textStyles.title}>
                {name}
            </Text>
            {subtitle && <Text style={textStyles.subtitle}>{subtitle}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    categoryWrapper: {
        backgroundColor: colors.primary,
        borderBottomWidth: 2,
        borderColor: colors.secondary,
        paddingTop: 15,
  },
  progressWrapper: {
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: colors.secondary,
        flexDirection: 'row',  
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        height: 40,
    },
    progressText: {
        fontFamily: 'ABeeZee',
        fontSize: 16,
    },
})

export default CategoryTitle;