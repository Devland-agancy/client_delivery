import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter } from "react-router-native";
import { PaperProvider } from "react-native-paper";
import AppRoutes from "./src/routes/index";
import { Provider } from "react-redux";
import { store } from "./src/redux/store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import "./i18n";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeRouter>
          <PaperProvider>
            <View style={styles.container}>
              <AppRoutes />
            </View>
          </PaperProvider>
        </NativeRouter>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
    fontFamily: "Roboto",
  },
});
