import { View, Text, Alert } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { useBackHandlerBottomSheet } from "@/hooks";
import { Button } from "@/components/button";
import { DatePicker } from "@/components/date-picker";
import dayjs from "dayjs";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useBookBorrowStore } from "@/store";
import { Work } from "@/interfaces";

const bookBorrowingSchema = yup.object().shape({
  start_date: yup.date().required(),
  end_date: yup.date().required(),
});

type BookBorrowingFormType = yup.InferType<typeof bookBorrowingSchema>;

type BorrowingFormProps = {
  work: Work;
};

const BorrowingForm = (props: BorrowingFormProps) => {
  const { work } = props;
  const bottomSheetSubjectRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);

  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(snapPoints);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetSubjectRef.current?.present();
  }, []);

  const { onChange } = useBackHandlerBottomSheet(bottomSheetSubjectRef);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  const { addBookBorrowed, bookBorrowed } = useBookBorrowStore();

  const form = useForm<BookBorrowingFormType>({
    defaultValues: {
      start_date: dayjs().toDate(),
      end_date: undefined,
    },
    resolver: yupResolver(bookBorrowingSchema),
  });

  const values = form.watch();

  const onSubmit = (data: BookBorrowingFormType) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validate if exists
        if (bookBorrowed.find((borrowed) => borrowed.work.key === work.key)) {
          bottomSheetSubjectRef.current?.dismiss();
          Alert.alert("Error", "You already borrowed this book");

          // need to resolve to reset isSubmitting state
          return resolve(true);
        }

        // Simulate loading
        bottomSheetSubjectRef.current?.dismiss();
        addBookBorrowed(data.start_date, data.end_date, work);
        Alert.alert("Success", "Book borrowed successfully");
        form.reset();

        return resolve(true);
      }, 1500);
    });
  };

  return (
    <View>
      <Button onPress={() => handlePresentModalPress()}>
        <Text>Borrow Book</Text>
      </Button>
      <BottomSheetModal
        ref={bottomSheetSubjectRef}
        index={0}
        backdropComponent={renderBackdrop}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        snapPoints={animatedSnapPoints}
        onChange={onChange}
        enablePanDownToClose
      >
        <FormProvider {...form}>
          <View className="p-4 pb-12 space-y-4" onLayout={handleContentLayout}>
            <Text className="text-lg font-bold">Book Borrowing Form</Text>
            <View>
              <Text className="text-base">Book borrowing date</Text>
              <DatePicker
                onChange={(data) => form.setValue("start_date", data)}
                value={values.start_date ? dayjs(values.start_date).toDate() : null}
                placeholder={"Select date"}
                error={form.formState.errors?.start_date?.message}
              />
            </View>
            <View>
              <Text className="text-base">Return date</Text>
              <DatePicker
                onChange={(data) => form.setValue("end_date", data)}
                value={values.end_date ? dayjs(values.end_date).toDate() : null}
                placeholder={"Select date"}
                error={form.formState.errors?.end_date?.message}
              />
            </View>
            <Button onPress={form.handleSubmit(onSubmit)} isLoading={form.formState.isSubmitting}>
              <Text className="text-base">Submit</Text>
            </Button>
          </View>
        </FormProvider>
      </BottomSheetModal>
    </View>
  );
};

export default BorrowingForm;
