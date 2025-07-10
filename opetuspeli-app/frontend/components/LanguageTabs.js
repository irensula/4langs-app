import { View, Text, Pressable } from 'react-native';

const LanguageTabs = ({ selectedLanguage, setSelectedLanguage, activeLanguage }) => {
    return (
        <View style={{flexDirection: 'row', gap: 10, marginBottom: 15}}>
            <Pressable 
                onPress={(() => {setSelectedLanguage('en')})}
                disabled={activeLanguage}
                style={{ opacity: activeLanguage && selectedLanguage !== 'en' ? 0.5 : 1 }}
            >
                <Text>English</Text>
            </Pressable>
            <Pressable 
                onPress={(() => {setSelectedLanguage('fi')})}
                disabled={activeLanguage}
                style={{ opacity: activeLanguage && selectedLanguage !== 'fi' ? 0.5 : 1 }}
            >
                <Text>Finnish</Text>
            </Pressable>
            <Pressable 
                onPress={(() => {setSelectedLanguage('ua')})}
                disabled={activeLanguage}
                style={{ opacity: activeLanguage && selectedLanguage !== 'ua' ? 0.5 : 1 }}
            >
                <Text>Ukrainian</Text>
            </Pressable>
            <Pressable 
                onPress={(() => {setSelectedLanguage('ru')})}
                disabled={activeLanguage}
                style={{ opacity: activeLanguage && selectedLanguage !== 'ru' ? 0.5 : 1 }}
            >
                <Text>Russian</Text>
            </Pressable>
        </View>
    )
}

export default LanguageTabs;