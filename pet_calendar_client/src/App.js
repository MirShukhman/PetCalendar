import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import RootStackScreen from './navigation/RootStack';
import { AuthProvider } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import store from './store/store';
import { runMigrations } from './db/migrations';

/* Provider - the redux store
   AuthProvider - the auth contex, to make sure any other child can know if the user is authenticated (and the auth details)
   NavigationContainer - contains the root stack screen - which defines the navigation and structure of the apps screens (and renders them)  */
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

/*
    TODO:
    1. add URL context (server info) ----------------------------------------------------------------
    2. diagram for components ----------------------------------------------------------------------- DONE
    3. set up server-communication infrastructure - JSONify, unJSONify ------------------------------ 
*/

export default App;