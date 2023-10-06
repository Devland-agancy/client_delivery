import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import userReducer from "../userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default persistor = persistStore(store);
