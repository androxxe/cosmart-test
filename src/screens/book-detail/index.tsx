import { RootStackNavigation, RootStackParamList } from "@/routes/index.type";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useMemo, useRef } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Constants from "expo-constants";
import { generateCover } from "@/utils";
import { TouchableOpacity } from "react-native";
import { Button } from "@/components/button";
import { Author, Availability, Work } from "@/interfaces";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal } from "@gorhom/bottom-sheet";

const DataMapper = ({ work }: { work: Work }) => {
  const Mapper = ({ item }: { item: keyof Work }) => {
    const [isShowMore, setIsShowMore] = React.useState<boolean>(false);
    const [numberOfLines, setNumberOfLines] = React.useState<number | undefined>(3);

    const data = work[item];
    if (typeof data === "string" || typeof data === "number") {
      return <Text className="text-base">{data as string}</Text>;
    } else if (item === "subject") {
      return (
        <View>
          <Text
            className="text-base"
            numberOfLines={numberOfLines}
            onTextLayout={({ nativeEvent: { lines } }) => setIsShowMore(lines.length >= 3)}
          >
            {(data as string[]).map((subject) => `${subject}, `)}
          </Text>
          {isShowMore && (
            <TouchableOpacity onPress={() => setNumberOfLines(numberOfLines === undefined ? 3 : undefined)}>
              <Text className="my-2 text-blue-600">{numberOfLines === undefined ? "Show Less" : "Show More"}</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    } else if (item === "ia_collection") {
      return (
        <View className="gap-2 flex flex-row flex-wrap mt-1">
          {(data as string[]).map((collection, index) => (
            <View className="rounded-full bg-slate-300" key={index}>
              <Text className="text-xs text-slate-800 px-2 py-1">{collection}</Text>
            </View>
          ))}
        </View>
      );
    } else if (item === "authors") {
      return (
        <View className="gap-2 flex flex-row flex-wrap mt-1">
          {(data as Author[]).map((author, index) => (
            <View className="rounded-full bg-slate-300" key={index}>
              <Text className="text-xs text-slate-800 px-2 py-1">{author.name}</Text>
            </View>
          ))}
        </View>
      );
    } else if (
      item === "lendinglibrary" ||
      item === "printdisabled" ||
      item === "has_fulltext" ||
      item === "public_scan"
    ) {
      return (
        <View className="flex items-start mt-1">
          <View className="rounded-full bg-slate-300">
            <Text className="text-xs text-slate-800 px-2 py-1">{data ? "Yes" : "No"}</Text>
          </View>
        </View>
      );
    } else if (item === "availability") {
      return (
        <View className="flex items-start mt-1">
          <View className="rounded-full bg-slate-300">
            <Text className="text-xs text-slate-800 px-2 py-1">
              {(data as Availability).available_to_borrow ? "Yes" : "No"}
            </Text>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <View>
      {Object.keys(work).map((item, index) => {
        return (
          <View className="space-y-1 border-b border-slate-300 py-2" key={index}>
            <Text className="text-sm text-slate-600 font-bold uppercase">{item.replaceAll("_", " ")}</Text>
            <Mapper item={item} />
          </View>
        );
      })}
    </View>
  );
};

const BookDetail = () => {
  const route = useRoute<RootStackParamList["BookDetail"]>();
  const navigation = useNavigation<RootStackNavigation>();

  const { work }: { work: Work } = route.params;
  const bottomSheetSubjectRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetSubjectRef.current?.snapToIndex(0);
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const ButtonBack = () => (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      className="z-10 bg-white w-10 h-10 rounded-full shadow-sm flex items-center justify-center absolute left-4"
      style={{
        top: Constants.statusBarHeight + 16,
      }}
    >
      <Feather name="chevron-left" size={24} color="black" />
    </TouchableOpacity>
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={-1} />,
    []
  );

  return (
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
        <Button>
          <Text>Borrow Book</Text>
        </Button>
      </View>
      <View>
        <BottomSheetModal
          ref={bottomSheetSubjectRef}
          index={0}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View>
            <Text className="text-base">{/* {work[item].map((subject) => `${subject}, `)} */}</Text>
          </View>
        </BottomSheetModal>
      </View>
    </SafeAreaView>
  );
};

export default BookDetail;
