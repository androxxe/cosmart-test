import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Login } from "@/screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { MainBottomTabsParamList, RootStackParamList } from "./index.type";
import BookDetail from "@/screens/book-detail";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainBottomTabsParamList>();

function MainBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <Feather name="home" size={24} color={focused ? colors.indigo[600] : colors.slate[500]} />
          ),
          tabBarLabel: "Home",
          tabBarActiveTintColor: colors.indigo[600],
          tabBarInactiveTintColor: colors.slate[500],
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Home}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <Feather name="user" size={24} color={focused ? colors.indigo[600] : colors.slate[500]} />
          ),
          tabBarLabel: "Profil",
          tabBarActiveTintColor: colors.indigo[600],
          tabBarInactiveTintColor: colors.slate[500],
        }}
      />
    </Tab.Navigator>
  );
}

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainBottomTabs" component={MainBottomTabs} />
        <Stack.Screen name="BookDetail" component={BookDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
