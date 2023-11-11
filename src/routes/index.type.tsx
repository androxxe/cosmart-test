import { Work } from "@/interfaces";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainBottomTabs: {
    screen: keyof MainBottomTabsParamList;
  };
  BookDetail: {
    work: Work;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

export type LoginProps = RouteProp<RootStackParamList, "Login">;
export type BookDetailProps = RouteProp<RootStackParamList, "BookDetail">;
export type MainBottomTabsProps = RouteProp<RootStackParamList, "MainBottomTabs">;

export type MainBottomTabsParamList = {
  Home: undefined;
  Profil: undefined;
  BorrowedBook: undefined;
};

export type MainBottomTabsNavigation = StackNavigationProp<MainBottomTabsParamList>;

export type HomeProps = RouteProp<MainBottomTabsParamList, "Home">;
export type ProfilProps = RouteProp<MainBottomTabsParamList, "Profil">;
