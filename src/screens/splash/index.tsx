import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "@/store";
import { RootStackNavigation } from "@/routes/index.type";

const Splash = () => {
  const { type } = useAuthStore();
  const navigation = useNavigation<RootStackNavigation>();

  useEffect(() => {
    setTimeout(() => {
      if (type) {
        if (type === "user") {
          navigation.navigate("MainBottomTabs", {
            screen: "Home",
          });
        } else {
          navigation.navigate("MainBottomTabs", {
            screen: "BorrowedBook",
          });
        }
      } else {
        navigation.navigate("Login");
      }
    }, 1000);
  }, [type]);

  return (
    <View className="flex flex-1 items-center justify-center">
      <Text className="text-lg font-semibold">Cosmart Library</Text>
    </View>
  );
};

export default Splash;
