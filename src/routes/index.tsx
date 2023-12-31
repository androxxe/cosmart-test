import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Login } from "@/screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { MainBottomTabsParamList, RootStackParamList } from "./index.type";
import BookDetail from "@/screens/book-detail";
import Profile from "@/screens/profile";
import BorrowedBook from "@/screens/borrowed-book";
import Splash from "@/screens/splash";
import { useAuthStore } from "@/store";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainBottomTabsParamList>();

function MainBottomTabs() {
  const { type } = useAuthStore();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {type === "user" && (
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }: any) => (
              <Feather name="home" size={24} color={focused ? colors.blue[600] : colors.slate[500]} />
            ),
            tabBarLabel: "Home",
            tabBarActiveTintColor: colors.blue[600],
            tabBarInactiveTintColor: colors.slate[500],
          }}
        />
      )}
      <Tab.Screen
        name="BorrowedBook"
        component={BorrowedBook}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <Feather name="book" size={24} color={focused ? colors.blue[600] : colors.slate[500]} />
          ),
          tabBarLabel: "Borrowed Book",
          tabBarActiveTintColor: colors.blue[600],
          tabBarInactiveTintColor: colors.slate[500],
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }: any) => (
            <Feather name="user" size={24} color={focused ? colors.blue[600] : colors.slate[500]} />
          ),
          tabBarLabel: "Profil",
          tabBarActiveTintColor: colors.blue[600],
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
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainBottomTabs" component={MainBottomTabs} />
        <Stack.Screen name="BookDetail" component={BookDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
