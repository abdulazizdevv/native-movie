import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "react-native-vector-icons/Ionicons";
import Home from "../screens/Home";
import Movie from "../screens/Movie";
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Detailed") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <IonIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "crimson",
          tabBarInactiveTintColor: "black",
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Movie"
          component={Movie}
          options={{ headerShown: false, tabBarBadge: 10 }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
