import { createStackNavigator } from "@react-navigation/stack";
import MainTabs from "./MainTabs";
import SecondaryStack from "./SecondaryStack";

const Stack = createStackNavigator();
/* This further defines the navigation stack. In our case, the main stack has two different types of screens that can appear on it -
    1. The main screens (the ones that are changed from the menu) - those have a consistent header and footer.
    2. The modal screens - screens that open on top of other screens, eg. AddPet screen.
    if there is only one type of screen - the specific screens can be written in this file directly (see AuthStack.js)
    */
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