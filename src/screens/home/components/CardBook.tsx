import { Work } from "@/interfaces";
import { generateCover } from "@/utils";
import { AntDesign } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export const CardBook = ({ data }: { data: Work }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    className="rounded-md bg-white shadow-sm flex flex-row h-48 space-x-3 border border-slate-400 mx-3 mb-3"
  >
    <Image
      className="w-36 h-full"
      source={{
        uri: generateCover(data.cover_id),
      }}
    />
    <View className="flex justify-center flex-1 space-y-2">
      <Text className="font-medium text-base mb-3 text-indigo-600">{data.title}</Text>
      <View>
        <Text className="text-xs text-slate-900 font-bold mb-2">Author:</Text>
        <View>
          {data.authors.slice(0, 3).map((author) => (
            <Text>{author.name}</Text>
          ))}
        </View>
      </View>
      <Text>{data.cover_edition_key}</Text>
    </View>
  </TouchableOpacity>
);

export const CardBookSkeleton = () => (
  <View className="mb-4">
    <SkeletonPlaceholder borderRadius={12}>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item height={192} width={144} />
        <SkeletonPlaceholder.Item marginLeft={12} gap={12}>
          <SkeletonPlaceholder.Item height={28} width={"50%"} />
          <SkeletonPlaceholder.Item height={20} width={140} />
          <SkeletonPlaceholder.Item height={20} width={140} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </View>
);
