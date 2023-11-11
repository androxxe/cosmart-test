import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useBookBorrowStore } from "@/store";
import { CardBook } from "../home/components/CardBook";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { useBackHandlerBottomSheet } from "@/hooks";
import { Work } from "@/interfaces";
import { DataMapper } from "@/components";
import dayjs from "dayjs";

const BorrowedBook = () => {
  const { bookBorrowed } = useBookBorrowStore();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["75%"], []);
  const [book, setBook] = useState<Work | undefined>(undefined);
  const [date, setDate] = useState<{ start_date: undefined | Date; end_date: undefined | Date }>({
    start_date: undefined,
    end_date: undefined,
  });

  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(snapPoints);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  const { onChange } = useBackHandlerBottomSheet(bottomSheetRef);

  const handleCardBookPress = useCallback((start_date: Date, end_date: Date, work: Work) => {
    bottomSheetRef.current?.present();
    setBook(work);
    setDate({ start_date, end_date });
  }, []);

  return (
    <>
      <SafeAreaView>
        <View className="space-y-5">
          <Text className="text-xl font-bold mx-4 pt-4">List of Book Borrowed By User</Text>
          <ScrollView>
            {bookBorrowed.map((book) => (
              <CardBook
                data={book.work}
                onPress={() => handleCardBookPress(book.start_date, book.end_date, book.work)}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        onChange={onChange}
        enablePanDownToClose
      >
        <BottomSheetScrollView onLayout={handleContentLayout}>
          <View className="p-4">
            <View className="bg-indigo-500 rounded-lg p-4">
              {date.start_date && (
                <View className="space-y-1 border-b border-slate-300 py-2">
                  <Text className="text-sm text-white font-bold uppercase">Start Date Borrow</Text>
                  <Text className="text-base text-white">{dayjs(date.start_date).format("ddd, DD/MM/YYYY HH:mm")}</Text>
                </View>
              )}
              {date.end_date && (
                <View className="space-y-1 border-slate-300 py-2">
                  <Text className="text-sm text-white font-bold uppercase">End Date Borrow</Text>
                  <Text className="text-base text-white">{dayjs(date.end_date).format("ddd, DD/MM/YYYY HH:mm")}</Text>
                </View>
              )}
            </View>
            {book && <DataMapper work={book} />}
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

export default BorrowedBook;
