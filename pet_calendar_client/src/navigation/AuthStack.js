import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignupScreen from "../screens/Auth/SignupScreen";
import ConfirmLoginScreen from "../screens/Auth/ConfirmLoginScreen"

const Stack = createStackNavigator();

const AuthStack = () => (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen}/>
        <Stack.Screen name="ConfirmLogin" component={ConfirmLoginScreen} />
    </Stack.Navigator>


);

export default AuthStack;