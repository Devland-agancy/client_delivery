import React from "react";
import { View, Image, StyleSheet, Text, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Checkbox } from "react-native-paper";
import { Button } from "react-native-paper";
import { Link } from "react-router-native";
import { useTranslation } from "react-i18next";
import forgotPwdImage from "../../assets/imgs/forget_pwd.png";

const ResetPassword = () => {
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
        <Image source={forgotPwdImage} className="h-[40%] mt-10 w-[80%]" />
        <Text className="font-normal text-lg text-center mx-4">
          {t("reset_pwd_title")}
        </Text>
        <TextInput
          className="w-[90%] mt-8"
          outlineColor="#79747E"
          activeOutlineColor="#FF6D00CC"
          mode="outlined"
          label={t("new_password")}
          placeholder={t("enter_password")}
        />
        <TextInput
          className="w-[90%] mt-2"
          outlineColor="#79747E"
          activeOutlineColor="#FF6D00CC"
          mode="outlined"
          label={t("confirm_pwd")}
          placeholder={t("confirm_your_pwd")}
        />
        <Button
          className="w-[90%] mt-8 bg-[#FF6D00]"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          {t("let_in")}
        </Button>

        <Text className="text-center mx-4 pt-4">{t("copyright")}</Text>
      </View>
    </ScrollView>
  );
};

export default ResetPassword;
