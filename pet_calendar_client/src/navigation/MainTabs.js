import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllPetsScreen from "../screens/Main/AllPetsScreen";
import CalendarScreen from "../screens/Main/CalendarScreen";
import UpcomingScreen from "../screens/Main/UpcomingScreen";
import SettingsScreen from "../screens/Main/SettingsScreen";
import NavBar from "../components/NavBar";

const Tab = createBottomTabNavigator();
/* Definition of a tabs navigator, this is from the react-navigation package, just helps rendering the tabs like a bottom menu automatically. */
const MainTabs = () => (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={(props) => <NavBar {...props} />}
        >
            <Tab.Screen name="My Pets" component={AllPetsScreen} />
            <Tab.Screen name="Upcoming" component={UpcomingScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
);

export default MainTabs;