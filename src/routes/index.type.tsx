import { Work } from "@/interfaces";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Login: undefined;
  MainBottomTabs: undefined;
  BookDetail: {
    work: Work;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

export type LoginProps = StackScreenProps<RootStackParamList, "Login">;
export type MainBottomTabsProps = StackScreenProps<RootStackParamList, "MainBottomTabs">;

export type MainBottomTabsParamList = {
  Home: undefined;
  Profil: undefined;
};

export type MainBottomTabsNavigation = StackNavigationProp<MainBottomTabsParamList>;

export type HomeProps = StackScreenProps<MainBottomTabsParamList, "Home">;
export type ProfilProps = StackScreenProps<MainBottomTabsParamList, "Profil">;
