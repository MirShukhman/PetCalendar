import { createStackNavigator } from "@react-navigation/stack";
import MainTabs from "./MainTabs";
import SecondaryStack from "./SecondaryStack";

const Stack = createStackNavigator();

const MainStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="SecondaryStack"
            component={SecondaryStack}
            options={{
                headerShown: false,
                presentation: 'modal',
            }}
        />
    </Stack.Navigator>
);

export default MainStack;