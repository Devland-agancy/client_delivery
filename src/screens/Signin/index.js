import React from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-native";
import axios from "./../../API/Axios";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/userSlice";
import loginImg from "../../assets/imgs/login.png";

const SignIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "y.bounoua@esi-sba.dz",
    },
  });
  async function logIn(values) {
    console.log("signin pressed!");
    try {
      console.log("val user:", values);
      const response = await axios.post("authentication/login/", values);
      dispatch(setUserInfo(values));
      navigate("/profile");
      // if (response?.data) {
      // }
    } catch (error) {
      console.log("err:", error.message);
    }
  }

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
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /\+213\d{9}/,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-[90%] mt-2"
              outlineColor="#79747E"
              activeOutlineColor="#FF6D00CC"
              mode="outlined"
              label={t("phone_number")}
              placeholder={t("enter_number")}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="phone"
        />
        {errors.phone && <Text className="text-red-600">{t("phone_err")}</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 6,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-[90%] mt-2"
              outlineColor="#79747E"
              activeOutlineColor="#FF6D00CC"
              mode="outlined"
              label={t("password")}
              placeholder={t("enter_password")}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text className="text-red-600">{t("password_err")}</Text>
        )}
        <Button
          className="w-[90%] mt-6 bg-[#FF6D00]"
          mode="contained"
          onPress={handleSubmit(logIn)}
        >
          {t("sign_in")}
        </Button>
        <Button
          theme={{ colors: { outline: "#FF6D00" } }}
          textColor="#FF6D00CC"
          className="w-[90%] mt-2"
          mode="outlined"
          onPress={() => navigate("/signup")}
        >
          {t("sign_up")}
        </Button>
        <Button
          textColor="#FF6D00CC"
          className="w-[90%] mt-2"
          mode="text"
          onPress={() => navigate("/forgotPassword")}
        >
          {t("forgot_password")}
        </Button>
        <Text className="text-center mx-4 pt-4">{t("copyright")}</Text>
      </View>
    </ScrollView>
  );
};

export default SignIn;
