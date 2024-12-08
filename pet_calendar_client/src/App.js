import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import RootStackScreen from './navigation/RootStack';
import { AuthProvider } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import store from './store/store';
import { runMigrations } from './db/migrations';


const App = () => {
    useEffect(() => {
        runMigrations();
    })

    return(
        <Provider store={store}>
            <AuthProvider>
                <NavigationContainer>
                    <RootStackScreen />
                </NavigationContainer>
            </AuthProvider>
        </Provider>
    );
};


export default App;