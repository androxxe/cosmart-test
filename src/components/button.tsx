import { cn } from "@/utils";
import { ComponentProps } from "react";
import { Text, TouchableOpacity } from "react-native";


type ButtonProps = {
  children: JSX.Element;
  loading?: boolean;
  textClassName?: string;
  className?: string;
  [key: string]: any;
} & ComponentProps<typeof TouchableOpacity>;

export const Button = (props: ButtonProps) => {
  const { children, isLoading = false, className = "", textClassName = "" } = props;

  return (
    <TouchableOpacity {...props} disabled={isLoading} className={cn("bg-blue-600 py-3 rounded-md", className)}>
      <Text className={cn("text-center text-sm font-semibold text-white", textClassName)}>
        {isLoading ? "Loading..." : children}
      </Text>
    </TouchableOpacity>
  );
};
