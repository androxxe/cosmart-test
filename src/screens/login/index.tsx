import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigation } from "@/routes/index.type";

export const Login = () => {
  const navigation = useNavigation<RootStackNavigation>();

  const LoginButton = ({ onPress, title, icon }: { onPress: () => void; title: string; icon: JSX.Element }) => (
    <TouchableOpacity
      onPress={onPress}
      className="mb-4 flex flex-row items-center space-x-2 border rounded-xl px-3 py-2 border-slate-400"
    >
      {icon}
      <Text className="text-base font-medium">{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="bg-slate-300 flex-1 items-center justify-center">
      <View className="w-full px-12">
        <View className="bg-white rounded-lg px-7 py-5 shadow">
          <Text className="text-lg font-bold mb-4">Login Page</Text>
          <Text className="text-base font-normal mb-4">Please select the type of user you want</Text>
          <LoginButton
            icon={<Feather name="user" size={20} color={colors.blue[500]} />}
            title="User"
            onPress={() => navigation.replace("MainBottomTabs")}
          />
          <LoginButton
            icon={<MaterialCommunityIcons name="library" size={20} color={colors.blue[500]} />}
            title="Librarian"
            onPress={() => navigation.replace("MainBottomTabs")}
          />
        </View>
      </View>
    </View>
  );
};
