import { BOOKS_GENRE } from "@/datas";
import React from "react";
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CardBook, CardBookSkeleton } from "./components/CardBook";
import colors from "tailwindcss/colors";
import { useBooks } from "@/hooks";
import { cn } from "@/utils";

export const Home = () => {
  const [selectedSubject, setSelectedSubject] = React.useState<keyof typeof BOOKS_GENRE>(BOOKS_GENRE.PROGRAMMING);

  const { flattenedData, onEndReached, isFetchingNextPage, isFetching } = useBooks(selectedSubject);

  const MenuSubject = () => (
    <ScrollView horizontal={true} className="px-3 space-x-2">
      {Object.keys(BOOKS_GENRE).map((subject, index) => (
        <TouchableOpacity
          onPress={() => setSelectedSubject(BOOKS_GENRE[subject])}
          key={index}
          className={cn(
            "px-3 py-1 rounded-full border border-blue-600",
            selectedSubject === BOOKS_GENRE[subject] ? "bg-blue-600 text-white" : ""
          )}
        >
          <Text
            className={cn(
              "font-medium",
              selectedSubject === BOOKS_GENRE[subject] ? "text-white font-bold" : "text-blue-500"
            )}
          >
            {BOOKS_GENRE[subject]}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView className="bg-slate-50">
      <Text className="px-3 my-4 text-2xl font-bold">Cosmart Library</Text>
      <View>
        <FlatList
          ListHeaderComponent={() => (
            <>
              <View className="mb-6">
                <Text className="mb-3 px-3 text-xl font-semibold">Explore By Genre</Text>
                <MenuSubject />
              </View>
              <Text className="text-xl font-semibold px-3 mb-3">Featured </Text>
              {isFetching && (
                <View className="px-3 space-y-5">
                  <CardBookSkeleton key={"skeleton_0"} />
                  <CardBookSkeleton key={"skeleton_1"} />
                  <CardBookSkeleton key={"skeleton_2"} />
                </View>
              )}
            </>
          )}
          data={flattenedData}
          renderItem={(data) => <CardBook data={data.item} />}
          keyExtractor={(item, index) => `${item.key}_${index}`}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          ListFooterComponent={() => (
            <>
              {isFetchingNextPage && (
                <View className="flex flex-row items-center justify-center space-x-2">
                  <ActivityIndicator size={"small"} className="my-5" color={colors.blue[600]} />
                  <Text>Loading..</Text>
                </View>
              )}
              <View className="h-[120px]" />
            </>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
