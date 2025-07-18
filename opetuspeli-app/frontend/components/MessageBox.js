import { View, Text, StyleSheet } from "react-native"; 

const MessageBox = ({ message, messageType }) => {
    return (
        <View style={styles.messageBox}>
            <Text style={styles.message}>Some text is here{message}</Text>
        </View>
    )
} 

const styles=StyleSheet.create({
    messageBox: {
        padding: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#55962f',
        backgroundColor: '#f0f8eb',
    },
    message: {
        padding: 5,
        fontSize: 18,
        fontFamily: 'ABeeZee',
    }
})

export default MessageBox;