import { BookDetailProps, RootStackNavigation, RootStackParamList } from "@/routes/index.type";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Constants from "expo-constants";
import { generateCover } from "@/utils";
import { TouchableOpacity } from "react-native";
import {  Work } from "@/interfaces";
import BorrowingForm from "./components/borrowing-form";
import { DataMapper } from "@/components";

const BookDetail = () => {
  const route = useRoute<BookDetailProps>();
  const navigation = useNavigation<RootStackNavigation>();

  const { work }: { work: Work } = route.params;

  const ButtonBack = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.goBack()}
      className="z-10 bg-white w-10 h-10 rounded-full shadow-sm flex items-center justify-center absolute left-4"
      style={{
        top: Constants.statusBarHeight + 16,
      }}
    >
      <Feather name="chevron-left" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView className="flex-1">
        <ButtonBack />
        <ScrollView>
          <Image
            source={{ uri: generateCover(work.cover_id, "L") }}
            className="w-full"
            style={{ height: Dimensions.get("window").width }}
          />
          <View className="p-4">
            <DataMapper work={work} />
          </View>
        </ScrollView>
        <View className="bg-white p-4 pb-8 shadow-sm bottom-0 left-0 absolute w-full">
          <BorrowingForm work={work} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default BookDetail;
