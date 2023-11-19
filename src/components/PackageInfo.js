import React from "react";
import { View, Image, Text } from "react-native";
import package_icon from "../assets/imgs/package_ic.png";
import { Pressable } from "react-native";
import { IconButton } from "react-native-paper";
import { useLocation, useNavigate } from "react-router-native";

const PackageInfo = ({ item, handlePackageClick, displayUpdateIcon }) => {
  const navigate = useNavigate();
  const location = useLocation();
  function editPackageDetails() {
    navigate("/editDetails", { state: item });
  }

  return (
    <Pressable className="w-full" onPress={handlePackageClick}>
      <View className="relative w-full flex flex-row mt-2 p-2 bg-gray-100 rounded-md">
        <Image source={package_icon} className="w-16 h-16 rounded-full" />
        <View className="flex flex-col justify-center">
          <Text className="">{item?.name}</Text>
          <Text className="">{item?.status}</Text>
          <Text className="">{item?.address}</Text>
        </View>
        {item.status === "waiting" && displayUpdateIcon && (
          <View className="absolute right-0">
            <IconButton
              icon="pencil-outline"
              iconColor={"#FF6D00CC"}
              size={30}
              onPress={() => editPackageDetails(item)}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default PackageInfo;
