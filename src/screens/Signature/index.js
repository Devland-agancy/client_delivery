import React, { useState } from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { IconButton, TextInput, Button } from "react-native-paper";
import PackageInfo from "../../components/PackageInfo";

const Signature = () => {
  const [recievedPackage, setRecievedPackage] = useState({
    id: 4,
    name: "Iphone 14 pro max",
    status: "Shipped",
    adress: "1543 Main street",
  });

  function confirmDelivery() {}
  function reportProblem() {}
  return (
    <View className="w-full p-2 flex flex-col items-start justify-start">
      <IconButton
        className="mt-8"
        icon="keyboard-backspace"
        iconColor={"black"}
        size={35}
        onPress={() => console.log("<===== <===== <===== <=====")}
      />
      <View className="w-full flex flex-col items-center px-4">
        <PackageInfo item={recievedPackage} />
        <Text className="text-center mt-4">
          Please sign for the package upon delivery and inspect it carefully. If
          there is any damage to the package or its contents, please contact us
          immediately.
        </Text>
        <Text className="text-center mt-12 font-bold text-base">
          I'm <Text className="text-client-orange">Oliver Smith</Text> have
          received my package:
        </Text>
        <TextInput
          className="w-[100%] mt-2"
          outlineColor="#79747E"
          activeOutlineColor="#FF6D00CC"
          mode="outlined"
          label={"Digital Signature"}
          placeholder={"Signature"}
          returnKeyType="done"
          // value={value}
          // onChangeText={(event) => {
          // onChange(event);
          // setErrMessage("");
          // }}
        />
        <Button
          className="w-full mt-12 bg-[#FF6D00]"
          mode="contained"
          onPress={confirmDelivery}
        >
          Confirm delivery
        </Button>
        <Button
          textColor="#FF6D00CC"
          theme={{ colors: { outline: "#FF6D00" } }}
          className="w-full mt-2"
          mode="outlined"
          onPress={reportProblem}
        >
          Report a problem
        </Button>
      </View>
    </View>
  );
};

export default Signature;
