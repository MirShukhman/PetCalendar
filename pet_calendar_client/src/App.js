import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import RootStackScreen from './navigation/RootStack';
import { AuthProvider } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
    return(
        <AuthProvider>
            <NavigationContainer>
                <RootStackScreen />
            </NavigationContainer>
        </AuthProvider>
    );
};


export default App;