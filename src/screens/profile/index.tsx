import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Button } from "@/components/button";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigation } from "@/routes/index.type";
import { useAuthStore } from "@/store";

const Profile = () => {
  const navigation = useNavigation<RootStackNavigation>();
  const { setType, type } = useAuthStore();

  const handleLogout = () => {
    setType(undefined);
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView>
      <View className="flex items-center py-5 h-full">
        <View className="bg-blue-600 rounded-full w-18 h-24 w-24 flex items-center justify-center">
          <Feather name="user" size={40} color={colors.white} />
        </View>
        <View className="my-3 space-y-1 flex flex-col">
          <Text className="text-center text-base font-bold">Andrio Pratama Sirait</Text>
          <Text className="text-center text-base">0812 2669 6696</Text>
          <View className="flex items-center justify-center">
            <View className="bg-blue-600 px-3 py-1 rounded-full">
              <Text className="text-base text-white uppercase">{type}</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="absolute bottom-6 w-full">
        <Button className="mx-4" onPress={handleLogout}>
          <Text>Logout</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
