import React from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { useNavigate } from "react-router-native";
import { useTranslation } from "react-i18next";
import forgotPwdImage from "../../assets/imgs/forget_pwd.png";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
          {t("forgot_pwd_title")}
        </Text>
        <TextInput
          className="w-[90%] mt-8"
          outlineColor="#79747E"
          activeOutlineColor="#FF6D00CC"
          mode="outlined"
          label={t("phone_number")}
          placeholder={t("enter_number")}
        />
        <Button
          className="w-[90%] mt-8 bg-[#FF6D00]"
          mode="contained"
          onPress={() => navigate("/resetCode")}
        >
          {t("send_code")}
        </Button>
        <Button
          theme={{ colors: { outline: "#FF6D00" } }}
          textColor="#FF6D00CC"
          className="w-[90%] mt-2"
          mode="outlined"
          onPress={() => navigate("/")}
        >
          {t("sign_in")}
        </Button>

        <Text className="text-center mx-4 pt-4">{t("copyright")}</Text>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;
