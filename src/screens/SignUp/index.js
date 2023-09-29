import React from "react";
import { View, Image, StyleSheet, Text, ScrollView } from "react-native";
import { TextInput, Checkbox, Button } from "react-native-paper";
import { Link } from "react-router-native";
import { useTranslation } from "react-i18next";
import signUpImage from "../../assets/imgs/signup.png";

const SignUp = () => {
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
        <Image source={signUpImage} className="h-[40%] mt-10 w-[80%]" />
        <Text className="font-normal text-lg">{t("signup_title")}</Text>
        <TextInput
          className="w-[90%] mt-2"
          outlineColor="#79747E"
          activeOutlineColor="#FF6D00CC"
          mode="outlined"
          label={t("phone_number")}
          placeholder={t("enter_number")}
        />
        <TextInput
          className="w-[90%] mt-2"
          outlineColor="#79747E"
          activeOutlineColor="#FF6D00CC"
          mode="outlined"
          label={t("password")}
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
          className="w-[90%] mt-2 bg-[#FF6D00]"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          {t("sign_up")}
        </Button>
        <Button
          theme={{ colors: { outline: "#FF6D00" } }}
          textColor="#FF6D00CC"
          className="w-[90%] mt-2"
          mode="outlined"
          onPress={() => console.log("Pressed")}
        >
          {t("sign_in")}
        </Button>

        <Text className="text-center mx-4 pt-4">
          {t("by_creating_account")}
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignUp;
