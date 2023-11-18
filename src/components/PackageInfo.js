import React from "react";
import { View, Image, Text } from "react-native";
import package_icon from "../assets/imgs/package_ic.png";

const PackageInfo = ({ item }) => (
  <View className="w-full flex flex-row mt-2 p-2 bg-gray-100 rounded-md">
    <Image source={package_icon} className="w-16 h-16 rounded-full" />
    <View className="flex flex-col justify-center">
      <Text className="">{item.name}</Text>
      <Text className="">{item.status}</Text>
      <Text className="">{item.address}</Text>
    </View>
  </View>
);

export default PackageInfo;
