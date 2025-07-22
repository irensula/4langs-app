import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CircularProgress from 'react-native-circular-progress-indicator';
import Navbar from '../components/Navbar';

const ProgressScreen = ({ route, navigation }) => {
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    const [userProgress, setUserProgress] = useState([]);
    const [value, setValue] = useState(0);
    // const { user } = route?.params || {};
    const { name, categoryID, user, logout } = route.params;
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token || !user?.id) return;
                const res = await fetch(`${API_BASE}/progress/${user.id}`, {
                    headers: {Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setUserProgress(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching texts:', error);
            }
        };
        fetchProgress();
    }, [user])

    const totalScores = userProgress.reduce((totals, progress) => {
        return {
            score_en: totals.score_en + (progress.score_en || 0),
            score_fi: totals.score_fi + (progress.score_fi || 0),
            score_ua: totals.score_ua + (progress.score_ua || 0),
            score_ru: totals.score_ru + (progress.score_ru || 0),
            maxScore : totals.maxScore + (progress.maxScore || 0)
        };
    }, { score_en: 0, score_fi: 0, score_ua: 0, score_ru: 0, maxScore: 0 })
    
    const totalScore = 
        (totalScores.score_en || 0) +
        (totalScores.score_fi || 0) + 
        (totalScores.score_ua || 0) + 
        (totalScores.score_ru || 0);
    
    const totalMaxScorePerExercise = userProgress.reduce((sum, progress) => {
        return sum + (progress.maxScore || 0);
    }, 0);

    const totalMaxScore = totalMaxScorePerExercise * 4;

    return (
        <View style={styles.container}>
            {user && (
                <Navbar user={user} logout={logout} navigation={navigation} />
            )}
            <Text>Progress Screen</Text>
            <Text>Progress in English: {totalScores.score_en} of {totalScores.maxScore}</Text>
            <Text>Progress in Finnish: {totalScores.score_fi} of {totalScores.maxScore}</Text>
            <Text>Progress in Ukrainian: {totalScores.score_ua} of {totalScores.maxScore}</Text>
            <Text>Progress in Russian: {totalScores.score_ru} of {totalScores.maxScore}</Text>
            <Text>Total Score: {totalScore} of {totalMaxScore}</Text>
            <CircularProgress
              radius={90}
              value={85}
              textColor={'#222'}
              fontSize={20}
              valueSuffix={'%'}
              inActiveStrokeColor={´#2ecc71'}
              inActiveStrokeOpacity={'0.2'}
              inActiveStrokeWidth={6}
              duration={3000}
              
                    
             />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    }
})

export default ProgressScreen;
