import { createStackNavigator } from "@react-navigation/stack";
import AddPetScreen from "../screens/Secondary/AddPetScreen";
import PetProfileScreen from "../screens/Secondary/PetProfileScreen";

const Stack = createStackNavigator();
/* List of modal screens that can be loaded on top of MainStack */
const SecondaryStack = () => (
    <Stack.Navigator
        screenOptions={{headerShown: false,
            presentation: 'modal',
        }}
        >
            <Stack.Screen name="AddPet" component={AddPetScreen}/>
            <Stack.Screen name="PetProfile" component={PetProfileScreen}/>
    </Stack.Navigator>
);

export default SecondaryStack;