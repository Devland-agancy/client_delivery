import React from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { TextInput, Checkbox, Button } from "react-native-paper";
import { Link } from "react-router-native";
import { useTranslation } from "react-i18next";
import loginImg from "../../assets/imgs/login.png";

const SignIn = () => {
  const [checked, setChecked] = React.useState(false);
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
        <Image source={loginImg} className="mt-10 w-[80%] h-[40%]" />
        <Text className="font-normal text-lg">{t("signin_title")}</Text>
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
        <Checkbox.Item
          label={t("remember_me")}
          color="#FF6D00CC"
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Button
          className="w-[90%] mt-2 bg-[#FF6D00]"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          {t("sign_in")}
        </Button>
        <Button
          theme={{ colors: { outline: "#FF6D00" } }}
          textColor="#FF6D00CC"
          className="w-[90%] mt-2"
          mode="outlined"
          onPress={() => console.log("Pressed")}
        >
          {t("sign_up")}
        </Button>
        <Button
          textColor="#FF6D00CC"
          className="w-[90%] mt-2"
          mode="text"
          onPress={() => console.log("Pressed")}
        >
          {t("forgot_password")}
        </Button>
        <Text className="text-center mx-4 pt-4">{t("copyright")}</Text>
      </View>
    </ScrollView>
  );
};

export default SignIn;
