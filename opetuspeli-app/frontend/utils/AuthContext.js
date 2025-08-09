import { createContext, useState, useEffect, Children } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const loadToken = async () => {
            const savedToken = await AsyncStorage.getItem('token');
            if (savedToken) setToken(savedToken);
        };
        loadToken();
    }, []);

    useEffect(() => {
        if (token) {
            AsyncStorage.setItem('token', token);
        } else {
            AsyncStorage.removeItem('token');
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};