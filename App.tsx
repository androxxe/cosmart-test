import { StyleSheet, Text, View } from "react-native";
import { Navigator } from "./src/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const queryClient = new QueryClient();

export default function App() {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView className="flex-1">
        <BottomSheetModalProvider>
          <QueryClientProvider client={queryClient}>
            <Navigator />
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
