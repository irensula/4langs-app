import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CircularProgress from 'react-native-circular-progress-indicator';
import Navbar from '../components/Navbar';
import { layout, textStyles, spacing, colors } from '../constants/layout';

const ProgressScreen = ({ route, navigation }) => {
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';
    const [userProgress, setUserProgress] = useState([]);
    const [value, setValue] = useState(0);
    const [totalMaxScore, setTotalMaxScore] = useState(0);
    const { name, categoryID, user } = route.params;
    
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token || !user?.id) return;
                const res = await fetch(`${API_BASE}/progress/${user.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setUserProgress(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching user progress:', error);
            }
        };
        fetchProgress();
    }, [user])

    useEffect (() => {
        const fetchTotalMaxScore = async () => {
            try {
                const token = await AsyncStorage.getItem('token');

                if (!token || !user?.id) return;

                const res = await fetch(`${API_BASE}/max-score`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await res.json();
                
                setTotalMaxScore(Number(data.totalMaxScore));
                console.log('TotalMaxScore: ', data.totalMaxScore);
            } catch (error) {
                console.error('Error fetching total max score', error);
            }
        }
        fetchTotalMaxScore();
    }, [user]);

    const totalScores = userProgress.reduce((totals, progress) => {
        return {
            score_en: totals.score_en + (progress.score_en || 0),
            score_fi: totals.score_fi + (progress.score_fi || 0),
            score_ua: totals.score_ua + (progress.score_ua || 0),
            score_ru: totals.score_ru + (progress.score_ru || 0),
            maxScore: totals.maxScore + (progress.maxScore || 0)
        };
    }, { score_en: 0, score_fi: 0, score_ua: 0, score_ru: 0, maxScore: 0 })

    const totalScore =
        (totalScores.score_en || 0) +
        (totalScores.score_fi || 0) +
        (totalScores.score_ua || 0) +
        (totalScores.score_ru || 0);

    const totalMaxScoreAllLanguages = totalMaxScore * 4;
    const toPercent = (score, max) => {
        if (max === 0) return 0;
        return Math.round((score / max) * 100);
    }
    return (
        <View style={[layout.screen, { backgroundColor: colors.primary }]}>
            <ScrollView contentContainerStyle={layout.scrollContent}>

                <View style={layout.mainContainer}>
                    <View style={[layout.formContainer, layout.center, layout.shadowStyle]}>
                        <Text style={[textStyles.title, { color: colors.secondary }]}>Edistymisesi</Text>

                        <CircularProgress
                            radius={60}
                            value={toPercent(totalScore, totalMaxScoreAllLanguages)}
                            textColor={''}
                            fontSize={20}
                            valueSuffix={''}
                            progressFormatter={(value) => `${Math.round(value)}%`}
                            inActiveStrokeColor={colors.secondary}
                            inActiveStrokeOpacity={'0.2'}
                            inActiveStrokeWidth={6}
                            duration={3000}
                        />
                        <View style={[layout.button, { width: 'auto', paddingHorizontal: 20, marginTop: 5 }]}>
                            <Text style={textStyles.default}>
                                Kokonaispisteet {totalScore} / {totalMaxScoreAllLanguages}
                            </Text>
                        </View>

                        <CircularProgress
                            radius={60}
                            value={toPercent(totalScores.score_en, totalMaxScore)}
                            textColor={''}
                            fontSize={20}
                            valueSuffix={''}
                            progressFormatter={(value) => `${Math.round(value)}%`}
                            inActiveStrokeColor={colors.secondary}
                            inActiveStrokeOpacity={'0.2'}
                            inActiveStrokeWidth={6}
                            duration={3000}
                        />
                        <View style={[layout.button, { width: 'auto', paddingHorizontal: 20, marginTop: 5 }]}>
                            <Text style={[textStyles.default, { textAlign: 'center' }]}>
                                Edistyminen englanniksi {"\n"} {totalScores.score_en} / {totalMaxScore}
                            </Text>
                        </View>

                        <CircularProgress
                            radius={60}
                            value={toPercent(totalScores.score_fi, totalMaxScore)}
                            textColor={''}
                            fontSize={20}
                            valueSuffix={''}
                            progressFormatter={(value) => `${Math.round(value)}%`}
                            inActiveStrokeColor={colors.secondary}
                            inActiveStrokeOpacity={'0.2'}
                            inActiveStrokeWidth={6}
                            duration={3000}
                        />
                        <View style={[layout.button, { width: 'auto', paddingHorizontal: 20, marginTop: 5 }]}>
                            <Text style={[textStyles.default, { textAlign: 'center' }]}>
                                Edistyminen suomeksi {"\n"} {totalScores.score_fi} / {totalMaxScore}
                            </Text>
                        </View>

                        <CircularProgress
                            radius={60}
                            value={toPercent(totalScores.score_ua, totalMaxScore)}
                            textColor={''}
                            fontSize={20}
                            valueSuffix={''}
                            progressFormatter={(value) => `${Math.round(value)}%`}
                            inActiveStrokeColor={colors.secondary}
                            inActiveStrokeOpacity={'0.2'}
                            inActiveStrokeWidth={6}
                            duration={3000}
                        />
                        <View style={[layout.button, { width: 'auto', paddingHorizontal: 20, marginTop: 5 }]}>
                            <Text style={[textStyles.default, { textAlign: 'center' }]}>
                                Edistyminen ukrainaksi {"\n"} {totalScores.score_ua} / {totalMaxScore}
                            </Text>
                        </View>

                        <CircularProgress
                            radius={60}
                            value={toPercent(totalScores.score_ru, totalMaxScore)}
                            textColor={''}
                            fontSize={20}
                            valueSuffix={''}
                            progressFormatter={(value) => `${Math.round(value)}%`}
                            inActiveStrokeColor={colors.secondary}
                            inActiveStrokeOpacity={'0.2'}
                            inActiveStrokeWidth={6}
                            duration={3000}
                        />
                        <View style={[layout.button, { width: 'auto', paddingHorizontal: 20, marginTop: 5 }]}>
                            <Text style={[textStyles.default, { textAlign: 'center' }]}>
                                Edistyminen venäjäksi {"\n"} {totalScores.score_ru} / {totalMaxScore}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {user && (
                <View style={layout.navbarWrapper}>
                    <Navbar user={user} navigation={navigation} />
                </View>
            )}
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
