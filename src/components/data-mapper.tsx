import { Author, Availability, Work } from "@/interfaces";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

export const DataMapper = ({ work }: { work: Work }) => {
  const Mapper = ({ item }: { item: keyof Work }) => {
    const [isShowMore, setIsShowMore] = useState<boolean>(false);
    const [numberOfLines, setNumberOfLines] = useState<number | undefined>(3);

    const data = work[item];
    if (typeof data === "string" || typeof data === "number") {
      return <Text className="text-base">{(data as string) ?? "-"}</Text>;
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
            <Mapper item={item as keyof Work} />
          </View>
        );
      })}
    </View>
  );
};
