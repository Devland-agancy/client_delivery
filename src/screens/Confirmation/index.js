import React from "react";
import { View, Image, StyleSheet, Text, ScrollView } from "react-native";
import { TextInput, Checkbox, Button } from "react-native-paper";
import { Link } from "react-router-native";
import { useTranslation } from "react-i18next";
import confirmPwdImage from "../../assets/imgs/confirm_code.png";

const ConfirmationCode = () => {
  const { t, i18n } = useTranslation();
  return (
    <ScrollView
      className="w-full"
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
      scrollEnabled={true}
      nestedScrollEnabled={true}
    >
      <View className="flex-1 items-center">
        <Image source={confirmPwdImage} className="h-[40%] mt-10 w-[80%]" />
        <Text className="font-normal text-lg text-center mx-4">
          {t("confirmation_title")}
        </Text>
        <TextInput
          className="w-[90%] mt-8"
          outlineColor="#79747E"
          activeOutlineColor="#FF6D00CC"
          mode="outlined"
          label={t("code")}
          placeholder={t("enter_code")}
        />
        <Button
          className="w-[90%] mt-8 bg-[#FF6D00]"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          {t("get-started")}
        </Button>
        <Button
          theme={{ colors: { outline: "#FF6D00" } }}
          textColor="#FF6D00CC"
          className="w-[90%] mt-2"
          mode="outlined"
          onPress={() => console.log("Pressed")}
        >
          {t("resend_code")}
        </Button>

        <Text className="text-center mx-4 pt-4">{t("copyright")}</Text>
      </View>
    </ScrollView>
  );
};

export default ConfirmationCode;
