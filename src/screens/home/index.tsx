import { BOOKS_GENRE } from "@/datas";
import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CardBook, CardBookSkeleton } from "./components/CardBook";

import { getBooksBySubject } from "@/services/endpoints";
import { BooksBySubjectResponse } from "@/interfaces";
import { QueryFunctionContext, QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { BooksPayload } from "@/services/endpoints.type";
import colors from "tailwindcss/colors";

export const Home = () => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    ...props
  } = useInfiniteQuery<BooksBySubjectResponse>({
    queryKey: ["books"],
    queryFn: ({ pageParam = { limit: 4, offset: 0 } }) => {
      console.log("params diatas", pageParam);
      return getBooksBySubject("love", pageParam as BooksPayload);
    },
    initialPageParam: {
      limit: 4,
      offset: 0,
    },
    getNextPageParam: (lastPage, pages) => {
      if (pages.flatMap((page) => page.works).length >= lastPage.work_count) return false;

      const params = {
        offset: pages.flatMap((page) => page.works).length,
        limit: 4,
      };
      console.log("params", params);
      return params;
    },
  });

  const flattenedWorks = data?.pages.flatMap((page) => page.works) || [];

  return (
    <SafeAreaView>
      <Text className="px-3 my-4 text-2xl font-bold">Cosmart Library</Text>
      <View className="">
        <FlatList
          ListHeaderComponent={() => (
            <>
              <View className="space-y-3 mb-6">
                <Text className="px-3 text-xl font-semibold">Explore By Genre</Text>
                <ScrollView horizontal={true} className="px-3 space-x-2">
                  {Object.keys(BOOKS_GENRE).map((genre) => (
                    <TouchableOpacity className="px-3 py-1 rounded-full border border-indigo-500">
                      <Text className="font-medium text-indigo-500">{BOOKS_GENRE[genre]}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <Text className="text-xl font-semibold px-3 mb-3">Featured </Text>
            </>
          )}
          data={flattenedWorks || []}
          renderItem={(data) => <CardBook data={data.item} />}
          keyExtractor={(item, index) => `${index}`}
          ListEmptyComponent={() => (
            <View className="px-3 space-y-5">
              <CardBookSkeleton />
              <CardBookSkeleton />
              <CardBookSkeleton />
            </View>
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (isLoading) return;
            if (isError) return;
            if (isFetching) return;
            if (isFetchingNextPage) return;

            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          ListFooterComponent={() => (
            <>
              {isFetchingNextPage && (
                <View className="flex flex-row items-center justify-center space-x-2">
                  <ActivityIndicator size={"small"} className="my-5" color={colors.indigo[600]} />
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
