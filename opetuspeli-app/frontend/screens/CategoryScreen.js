import { ScrollView, Text, View, Pressable, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';
import { layout, colors, textStyles, spacing } from '../constants/layout';

export default function CategoryScreen({ route, navigation }) {
    const { name, categoryID, user, logout } = route.params;
    
    return (
        <View style={layout.screen}>
            <ScrollView contentContainerStyle={layout.scrollContent}>
                <View style={layout.categoryWrapper}>
                    <Text style={textStyles.title}>
                        {route.params.name}
                    </Text>
                </View>
                
                <View style={styles.categoriesWrap}>
                    <Pressable onPress={() => navigation.navigate('WordsListScreen', { name, categoryID, user, logout })} style={styles.category}>
                        <Text style={styles.categoryTitle}>Words list</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('TextScreen', { name, categoryID, user, logout })} style={styles.category}>
                        <Text style={styles.categoryTitle}>Text</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('ConnectScreen', { name, categoryID, user, logout })} style={styles.category}>
                        <Text style={styles.categoryTitle}>Connect Task</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('MemoScreen', { name, categoryID, user, logout })} style={styles.category}>
                        <Text style={styles.categoryTitle}>MemoGame</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('GapsScreen', { name, categoryID, user, logout })} style={styles.category}>
                        <Text style={styles.categoryTitle}>Gaps Task</Text>
                    </Pressable>
                </View>
            </ScrollView>
            {user && (
                <View style={layout.navbarWrapper}>
                    <Navbar user={user} logout={logout} navigation={navigation} />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    categoriesWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    category: {
        width: '48%',
        padding: 10,
        alignItems: 'center',
        marginVertical: 10,
        height: 100,
        justifyContent: 'center',
        backgroundColor: colors.orange, 
        borderColor: colors.lightorange,
        borderRadius: 25,
        borderWidth: 2,
    },
    categoryTitle: {
        color: colors.white,
        fontFamily: 'ABeeZee',
    }
})