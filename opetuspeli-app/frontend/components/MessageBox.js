import { View, Text } from "react-native"; 

const MessageBox = ({ message, messageType }) => {
    return (
        <View>
            <Text>MessageBox</Text>
            <Text>{message}</Text>
        </View>
    )
} 

export default MessageBox;