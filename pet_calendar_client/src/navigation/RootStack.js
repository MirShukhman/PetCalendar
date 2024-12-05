import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { AuthContext } from '../context/AuthContext';

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