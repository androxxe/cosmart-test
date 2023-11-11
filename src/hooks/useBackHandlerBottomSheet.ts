import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { RefObject, useCallback, useEffect, useState } from "react";
import { BackHandler } from "react-native";

export const useBackHandlerBottomSheet = (bottomSheetRef: RefObject<BottomSheetModal>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);

  const onChange = (index: number) => {
    setIsOpen(index === -1 ? false : true);
    setIndex(index);
  };

  const backAction = useCallback((): boolean => {
    if (isOpen) {
      bottomSheetRef.current?.close();
    }

    return isOpen;
  }, [isOpen]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [isOpen]);

  return {
    isOpen,
    onChange,
    index,
  };
};
