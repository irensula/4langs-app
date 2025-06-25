import { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, Pressable, Image, FlatList, TouchableOpacity } from "react-native"; 

const RegisterScreen = ({ navigation }) => {
    const [avatars, setAvatars] = useState([]);
    const [selectedImageID, setSelectedImageID] = useState(null);
    const API_BASE = 'http://192.168.1.162:3001';
    useEffect(() => {
        const fetchAvatars = async () => {
            try {
                const response = await fetch(`${API_BASE}/avatars`);
                const data = await response.json();
                console.log("Fetched avatars:", data);
                setAvatars(data);
            } catch (error) {
                console.error("Error fetching avatars:", error);
            }
        };
        fetchAvatars();
    }, []);

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
        if (!userdata.username || !userdata.email || !userdata.phonenumber || !userdata.password || !userdata.imageID) {
            Alert.alert('Error', 'Please fill all required fields');
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/register`, {
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
            <FlatList
                horizontal
                data={avatars}
                keyExtractor={item => item.imageID.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        setSelectedImageID(item.imageID);
                        handleChange('imageID', item.imageID.toString());
                    }}>
                    <Image
                        source={{ uri: `${API_BASE}${item.url}` }}
                        style={{
                        width: 80,
                        height: 80,
                        margin: 5,
                        borderWidth: item.imageID === selectedImageID ? 2 : 0,
                        borderColor: 'blue',
                        borderRadius: 40
                        }}
                    />
                    </TouchableOpacity>
                )}
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