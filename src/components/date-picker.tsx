import dayjs from "dayjs";
import React, { useState } from "react";
import colors from "tailwindcss/colors";
import { AntDesign } from "@expo/vector-icons";
import RNDatePicker from "react-native-date-picker";
import { Text, View, TouchableOpacity } from "react-native";

type DatePickerType = {
  placeholder?: string | null;
  value: string | Date | null | undefined;
  format?: string | null;
  mode?: "date" | "time" | "datetime";
  onChange: (date: Date) => void;
  error?: string;
};

export const DatePicker = (props: DatePickerType) => {
  const { placeholder, value, format = "DD-MM-YYYY", mode = "date", onChange, error } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <View className="p-3 rounded-lg border-gray-300 border">
        <TouchableOpacity onPress={() => setIsOpen(true)} className="flex-row justify-between">
          {value ? (
            <Text className="text-sm">{dayjs(value).format(format || "")}</Text>
          ) : (
            <Text className="text-sm text-primary-dark-gray">{placeholder}</Text>
          )}
          <AntDesign name="calendar" size={18} color={colors.gray[500]} />
        </TouchableOpacity>

        <RNDatePicker
          theme="light"
          modal={true}
          open={isOpen}
          mode={mode}
          date={dayjs().toDate()}
          onConfirm={(date: Date) => {
            setIsOpen(false);
            onChange(date);
          }}
          onCancel={() => {
            setIsOpen(false);
          }}
        />
      </View>
      {error && <Text className="text-red-500 text-sm">{error}</Text>}
    </>
  );
};
