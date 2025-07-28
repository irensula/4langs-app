import { View, Text, Pressable, StyleSheet } from 'react-native';
import { layout, textStyles, colors, spacing } from '../constants/layout';

const LanguageTabs = ({ selectedLanguage, setSelectedLanguage, activeLanguage }) => {
    return (
        <View style={styles.tabsWrapper}>
            <Pressable 
                onPress={(() => {setSelectedLanguage('en')})}
                disabled={activeLanguage}
                style={[styles.tabWrapper, { backgroundColor: selectedLanguage == 'en' ? colors.orange : colors.lightorange }]}
            >
                <Text style={styles.text}>English</Text>
            </Pressable>
            <Pressable 
                onPress={(() => {setSelectedLanguage('fi')})}
                disabled={activeLanguage}
                style={[styles.tabWrapper, { backgroundColor: selectedLanguage == 'fi' ? colors.orange : colors.lightorange }]}
            >
                <Text style={styles.text}>Finnish</Text>
            </Pressable>
            <Pressable 
                onPress={(() => {setSelectedLanguage('ua')})}
                disabled={activeLanguage}
                style={[styles.tabWrapper, { backgroundColor: selectedLanguage == 'ua' ? colors.orange : colors.lightorange }]}
            >
                <Text style={styles.text}>Ukrainian</Text>
            </Pressable>
            <Pressable 
                onPress={(() => {setSelectedLanguage('ru')})}
                disabled={activeLanguage}
                style={[styles.tabWrapper, { backgroundColor: selectedLanguage == 'ru' ? colors.orange : colors.lightorange }]}
            >
                <Text style={styles.text}>Russian</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    tabsWrapper: {
        flexDirection: 'row', 
        gap: 5, 
        marginBottom: 15, 
    },
    tabWrapper: {
        borderWidth: 2, 
        backgroundColor: colors.orange,
        borderColor: colors.lightorange,  
        borderRadius: 50,
        paddingVertical: 7,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    text: {
        color: colors.white,
        fontFamily: 'ABeeZee',
        fontSize: 14,
    }
})

export default LanguageTabs;