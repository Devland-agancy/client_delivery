import React from "react";
import { Image, Text, View } from "react-native";
import { Button, IconButton } from "react-native-paper";

const DeliveredTimeLine = ({ confirmDelivery }) => {
  function startChat() {}
  return (
    <View className="w-full mt-4 flex flex-row p-2">
      <View className="w-[20%] flex- flex-col items-center">
        <Image
          source={{ uri: "https://picsum.photos/100" }}
          className="w-14 h-14 rounded-full"
        />
        <View className="h-[70px] border w-0 mt-1"></View>
        <IconButton
          className=""
          icon="check-circle-outline"
          iconColor={"black"}
          size={20}
          onPress={() => console.log("Pressed")}
        />
      </View>
      <View className="w-[80%]">
        <Text className="font-bold text-xl">Delivery man</Text>
        <Text className="text-gray-600">1542 Main street</Text>
        <Button
          className="w-full mt-4 bg-[#FF6D00]"
          mode="contained"
          onPress={confirmDelivery}
        >
          Confirm
        </Button>
        <Text className="text-gray-600 text-lg mt-9">Delivered</Text>
      </View>
    </View>
  );
};

export default DeliveredTimeLine;
