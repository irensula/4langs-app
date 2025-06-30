import { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native"; 
import Constants from 'expo-constants';

const AvatarsList = ({ avatars, onSelect }) => {
    const [selectedImageID, setSelectedImageID] = useState(null);
    const [showAllAvatars, setShowAllAvatars] = useState(false);
    const API_BASE = Constants.expoConfig?.extra?.API_BASE || 'fallback value';

    useEffect(() => {
        if (avatars.length > 0 && selectedImageID === null) {
            setSelectedImageID(avatars[0].imageID);
            onSelect && onSelect(avatars[0].imageID);
        }
    }, [avatars]);

    return (
        <View>
        {showAllAvatars ? (
            <FlatList
                horizontal
                data={avatars}
                keyExtractor={item => item.imageID.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        setSelectedImageID(item.imageID);
                        onSelect && onSelect(item.imageID);
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
            ) : (
                    avatars.length > 0 && (
                        <TouchableOpacity
                            onPress={() => {
                                setShowAllAvatars(true);
                            }}
                        >
                            <Image 
                                source={{ uri: `${API_BASE}${avatars[0].url}` }}
                                style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                margin: 10,
                                borderWidth: 2,
                                borderColor: 'blue'
                                }}
                            />
                            <Text>Valitse kuva</Text>
                        </TouchableOpacity>
                    )
                )}
        </View>
    )
}

export default AvatarsList;