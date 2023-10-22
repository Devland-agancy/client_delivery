import React, { useState } from "react";
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
  const [hidePass, setHidePass] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  async function logIn(values) {
    try {
      const response = await axios.post("authentication/login/", values);
      if (response?.data && response?.data?.role === "CLIENT") {
        dispatch(setUserInfo(response?.data));
        navigate("/profile");
      }
    } catch (error) {
      setErrMessage(t("wrong-credentials"));
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
            required: t("email_required"),
            pattern: {
              value: emailPattern,
              message: t("email_err"),
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-[90%] mt-2"
              outlineColor="#79747E"
              activeOutlineColor="#FF6D00CC"
              mode="outlined"
              label={t("email_address")}
              placeholder={t("enter_email")}
              returnKeyType="next"
              value={value}
              onChangeText={(event) => {
                onChange(event);
                setErrMessage("");
              }}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text className="text-red-600 self-start ml-[6%]">
            {errors.email.message}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: t("pwd_required"),
            minLength: {
              value: 6,
              message: t("password_err"),
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-[90%] mt-2"
              secureTextEntry={hidePass ? true : false}
              outlineColor="#79747E"
              activeOutlineColor="#FF6D00CC"
              mode="outlined"
              label={t("password")}
              placeholder={t("enter_password")}
              returnKeyType="done"
              value={value}
              onChangeText={(event) => {
                onChange(event);
                setErrMessage("");
              }}
              right={
                <TextInput.Icon
                  icon={hidePass ? "eye" : "eye-off"}
                  size={28}
                  color={"black"}
                  onPress={() => setHidePass(!hidePass)}
                />
              }
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text className="text-red-600 self-start ml-[6%]">
            {errors.password.message}
          </Text>
        )}
        {errMessage && (
          <Text className="text-red-600 self-start ml-[6%]">{errMessage}</Text>
        )}
        <Button
          className="w-[90%] mt-6 bg-[#FF6D00]"
          mode="contained"
          onPress={handleSubmit(logIn)}
        >
          {t("sign_in")}
        </Button>
        {/* <Button
          theme={{ colors: { outline: "#FF6D00" } }}
          textColor="#FF6D00CC"
          className="w-[90%] mt-2"
          mode="outlined"
          onPress={() => navigate("/signup")}
        >
          {t("sign_up")}
        </Button> */}
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
