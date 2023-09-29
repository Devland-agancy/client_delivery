import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter } from "react-router-native";
import { PaperProvider } from "react-native-paper";
import AppRoutes from "./src/routes/index";
import "./i18n";

export default function App() {
  return (
    <NativeRouter>
      <PaperProvider>
        <View style={styles.container}>
          <AppRoutes />
        </View>
      </PaperProvider>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
  },
});
