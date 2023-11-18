import React, { useState } from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { IconButton, TextInput, Button } from "react-native-paper";
import PackageInfo from "../../components/PackageInfo";
import { useLocation, useNavigate } from "react-router-native";
import axios from "./../../API/Axios";

const Signature = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [recievedPackage, setRecievedPackage] = useState(location.state);
  const [signature, setSignature] = useState("");

  async function confirmDelivery() {
    try {
      const response = await axios.post(
        `package/confirm_client_delivery/${location.state.id}/`,
        null,
        { params: { client_id: location.state?.client?.id } }
      );
      if (response.data.success) {
        setSignature("");
        navigate("/feedback", { state: location.state });
      }
    } catch (error) {
      console.log(":::::::::::::::", error);
    }
  }
  function reportProblem() {
    // TODO: handel the report problem
  }

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
          <Text className="text-center mt-4">
            Please sign for the package upon delivery and inspect it carefully.
            If there is any damage to the package or its contents, please
            contact us immediately.
          </Text>
          <Text className="text-center mt-12 font-bold text-base">
            I'm <Text className="text-client-orange">Oliver Smith</Text> have
            received my package:
          </Text>
          <TextInput
            className="w-full mt-12"
            outlineColor="#79747E"
            activeOutlineColor="#FF6D00CC"
            mode="outlined"
            label={"Digital Signature"}
            placeholder={"Signature"}
            returnKeyType="done"
            value={signature}
            onChangeText={(event) => {
              setSignature(event);
            }}
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
      </ScrollView>
    </>
  );
};

export default Signature;
