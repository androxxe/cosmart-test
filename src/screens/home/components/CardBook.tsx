import { Work } from "@/interfaces";
import { generateCover } from "@/utils";
import { memo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export const CardBook = memo(({ data, onPress }: { data: Work; onPress: () => void }) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="rounded-lg bg-white shadow-sm flex flex-row h-48 space-x-3 border border-slate-400 mx-3 mb-3"
    >
      {!isImageLoaded && (
        <SkeletonPlaceholder borderRadius={12}>
          <SkeletonPlaceholder.Item height={192} width={144} />
        </SkeletonPlaceholder>
      )}
      <Image
        onLoad={() => setIsImageLoaded(true)}
        className="w-36 h-full rounded-tl-lg rounded-bl-lg"
        style={{
          position: isImageLoaded ? "relative" : "absolute",
        }}
        resizeMode="cover"
        source={{
          uri: generateCover(data.cover_id, "M"),
        }}
      />
      <View className="flex justify-center flex-1 space-y-2">
        <Text className="font-bold text-base mb-3 text-blue-600">{data.title}</Text>
        <View className="mb-2">
          <Text className="text-xs text-slate-700 font-bold uppercase">Author:</Text>
          <View>
            {data.authors.slice(0, 3).map((author) => (
              <Text>{author.name}</Text>
            ))}
          </View>
        </View>
        <View className="mb-2">
          <Text className="text-xs text-slate-700 font-bold uppercase">Cover Edition:</Text>
          <Text>{data.cover_edition_key ?? "-"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export const CardBookSkeleton = () => (
  <View className="mb-4 border border-slate-400 rounded-lg">
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
