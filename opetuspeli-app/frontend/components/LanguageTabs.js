import { View, Text, Pressable, StyleSheet } from 'react-native';
import { layout, textStyles, colors, spacing } from '../constants/layout';
import LANG_KEYS from '../constants/langKeys';

const LanguageTabs = ({ selectedLanguage, setSelectedLanguage, activeLanguage }) => {
    console.log('Lang keys', LANG_KEYS);
    return (
        <View style={styles.tabsWrapper}>

             {LANG_KEYS.map(({ key, label }) => (
                <Pressable
                    key={key}
                    style={[
                        styles.tabWrapper,
                        selectedLanguage.toLowerCase() === key && styles.activeTab,
                        !activeLanguage && styles.disabledTab
                    ]}
                    onPress={() => setSelectedLanguage({label}.toLowerCase())}
                    disabled={!activeLanguage}
                >
                    <Text
                        style={[
                            styles.text,
                            selectedLanguage.toLowerCase() === key && styles.activeText
                        ]}
                    >
                        {label}
                    </Text>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    tabsWrapper: {
        flexDirection: 'row', 
        justifyContent: 'center',
        marginVertical: 10,
    },
    tabWrapper: {
        borderWidth: 2, 
        backgroundColor: colors.lightorange,
        borderColor: colors.lightorange,  
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginVertical: 10,
        marginHorizontal: 5,
        backgroundColor: colors.white,
    },
    activeTab: {
        backgroundColor: colors.orange,
    },
    disabledTab: {
        opacity: 0.4,
    },
    text: {
        color: colors.white,
        fontFamily: 'ABeeZee',
        fontSize: 14,
    },
      activeText: {
        color: colors.white,
    },
});

export default LanguageTabs;