import { BOOKS_GENRE } from "@/datas";
import { cn } from "@/utils";
import { ScrollView, Text, TouchableOpacity } from "react-native";

type MenuSubjectProps = {
  selectedSubject: keyof typeof BOOKS_GENRE;
  setSelectedSubject: (subject: keyof typeof BOOKS_GENRE) => void;
};

export const MenuSubject = ({ selectedSubject, setSelectedSubject }: MenuSubjectProps) => (
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
