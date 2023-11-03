import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Spinner = () => {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 z-10 flex flex-1 justify-center items-center ">
      <ActivityIndicator size="large" color="#FF6D00CC" />
    </View>
  );
};

export default Spinner;
