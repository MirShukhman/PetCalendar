import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { AuthContext } from '../context/AuthContext';


/* The navigator cnosists of the following components:
    1. The Root Stack - or rather, the root stack SCREEN - This defines the navigator the main navigator, this navigator acts as a loader for the different screens.
    2. The main stacks - example, MainStack and AuthStack, those components define which screens are on which stack. this seperates screens into different navigation patterns
        Please see MainStack.js for more info. */
const RootStack = createStackNavigator();

const RootStackScreen = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return(
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
                <RootStack.Screen name="MainStack" component={MainStack} />
            ):(
                <RootStack.Screen name="AuthStack" component={AuthStack} />
            )}
        </RootStack.Navigator>
    );
}

export default RootStackScreen;