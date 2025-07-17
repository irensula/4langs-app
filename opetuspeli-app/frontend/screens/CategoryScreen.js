import { Text, View, Pressable, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';

export default function CategoryScreen({ route, navigation }) {
    const { name, categoryID, user, logout } = route.params;
    
    return (
        <View style={styles.container}>
            {user && (
                <Navbar user={user} logout={logout} navigation={navigation} />
            )}
            <Text style={styles.title}>
                {route.params.name}
            </Text>
            <View style={styles.categoriesWrap}>
                <Pressable onPress={() => navigation.navigate('WordsListScreen', { name, categoryID, user, logout })} style={styles.category}>
                    <Text style={styles.categoryTitle}>Words list</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('TextScreen', { name, categoryID, user, logout })} style={styles.category}>
                    <Text style={styles.categoryTitle}>Text</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('MemoScreen', { name, categoryID, user, logout })} style={styles.category}>
                    <Text style={styles.categoryTitle}>MemoGame</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('ConnectScreen', { name, categoryID, user, logout })} style={styles.category}>
                    <Text style={styles.categoryTitle}>Connect Task</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('GapsScreen', { name, categoryID, user, logout })} style={styles.category}>
                    <Text style={styles.categoryTitle}>Gaps Task</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5CED73',
        padding: 10,
    },
    title: {
        fontFamily: 'LuckiestGuy',
        fontSize: 30,
        color: '#fff',
        textAlign: 'center',
        marginVertical: 15,
    },
    categoriesWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    category: {
        width: '48%',
        padding: 10,
        backgroundColor: '#a1f69d',
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#008002',
        alignItems: 'center',
        marginVertical: 10,
    },
    categoryTitle: {
        color: '#008002',
    }
})