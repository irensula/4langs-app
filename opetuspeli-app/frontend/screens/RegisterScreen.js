import { useState } from "react";
import { View, Text, TextInput, Alert, Pressable } from "react-native"; 

const RegisterScreen = ({ navigation }) => {
    const [userdata, setUserdata] = useState({
        username: '',
        email: '',
        phonenumber: '',
        password: '',
        imageID: ''
    });

    const handleChange = (field, value) => {
        setUserdata(prevState => ({
            ...prevState,
            [field]: value
        }));
    };
    
    const handleRegister = async () => {
        // simple validation
        if (!userdata.username || !userdata.email || !userdata.password) {
            Alert.alert('Error', 'Please fill all required fields');
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: userdata.username,
                    email: userdata.email,
                    phonenumber: userdata.phonenumber,
                    password: userdata.password,
                    imageID: parseInt(userdata.imageID) || 0 
                })
            });

            if (response.ok) {
                Alert.alert("Success", "User registered successfully");
                navigation.goBack();
            } else {
                const errorData = await response.json();
                Alert.alert("Error", errorData.message || "Registration failed");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Network error");
        }
    };

    return (
        <View>
            <Text>Register</Text>
            <Text>Käyttäjätunnus</Text>
            <TextInput 
                value={userdata.username}
                onChangeText={(text) => handleChange('username', text)}
            />
            <Text>Sähköposti</Text>
            <TextInput 
                value={userdata.email}
                onChangeText={(text) => handleChange('email', text)}
            />
            <Text>Puhelinnumero</Text>
            <TextInput 
                value={userdata.phonenumber}
                onChangeText={(text) => handleChange('phonenumber', text)}
            />
            <Text>Password</Text>
            <TextInput 
                value={userdata.password}
                onChangeText={(text) => handleChange('password', text)}
            />
            <Text>Image</Text>
            <TextInput 
                value={userdata.imageID}
                onChangeText={(text) => handleChange('imageID', text)}
            />
            <Pressable onPress={handleRegister}>
                <Text>Register</Text>
            </Pressable>

            <Pressable onPress={() => navigation.goBack()}>
                <Text>Back</Text>
            </Pressable>

        </View>
    )
} 

export default RegisterScreen;