import React, { useState } from "react";
import { View, Image, Text, ScrollView, StyleSheet } from "react-native";
import { IconButton, TextInput, Button } from "react-native-paper";
import MapView from "react-native-maps";
import PackageInfo from "../../components/PackageInfo";

const DeliveryMap = () => {
  const [recievedPackage, setRecievedPackage] = useState({
    id: 4,
    name: "Iphone 14 pro max",
    status: "Shipped",
    adress: "1543 Main street",
  });

  function confirmDelivery() {}

  return (
    <>
      <View className="w-full mt-2">
        <IconButton
          className="mt-8"
          icon="keyboard-backspace"
          iconColor={"black"}
          size={35}
          onPress={() => console.log("<===== <===== <===== <=====")}
        />
      </View>
      <ScrollView
        className="w-full"
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View className="w-full flex flex-col items-center px-4">
          <PackageInfo item={recievedPackage} />
          <MapView style={styles.map} className="mt-4" />
          <Button
            className="w-full mt-12 bg-[#FF6D00]"
            mode="contained"
            onPress={confirmDelivery}
          >
            Confirm delivery
          </Button>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default DeliveryMap;
