import React, { useState } from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-native";
import axios from "./../../API/Axios";
import signUpImage from "../../assets/imgs/signup.png";

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "CLIENT",
      phone: "",
      password1: "",
      password2: "",
    },
  });
  async function createUser(values) {
    console.log("register values:", values);
    try {
      const response = await axios.post("authentication/register/", values);
      if (response?.data?.role === "CLIENT") {
        navigate("/confirmationCode", { state: values });
      } else {
        setErrMessage(response?.data?.message);
      }
    } catch (error) {
      setErrMessage(t("phone_exists"));
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
        <Image source={signUpImage} className="h-[40%] mt-10 w-[80%]" />
        <Text className="font-normal text-lg">{t("signup_title")}</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /\+213\d{9}/ || "Password do not match",
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-[90%] mt-2"
              outlineColor="#79747E"
              activeOutlineColor="#FF6D00CC"
              mode="outlined"
              label={t("phone_number")}
              placeholder={t("enter_number")}
              returnKeyType="next"
              value={value}
              onChangeText={(event) => {
                onChange(event);
                setErrMessage("");
              }}
            />
          )}
          name="phone"
        />
        {errors.phone && (
          <Text className="text-red-600 self-start ml-[6%]">
            {t("phone_err")}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 6,
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
              returnKeyType="next"
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
          name="password1"
        />
        {errors.password1 && (
          <Text className="text-red-600 self-start ml-[6%]">
            {t("password_err")}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 6,
            validate: (value) => value === watch("password1"),
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-[90%] mt-2"
              secureTextEntry={hidePass2 ? true : false}
              outlineColor="#79747E"
              activeOutlineColor="#FF6D00CC"
              mode="outlined"
              label={t("confirm_pwd")}
              placeholder={t("confirm_your_pwd")}
              returnKeyType="done"
              value={value}
              onChangeText={(event) => {
                onChange(event);
                setErrMessage("");
              }}
              right={
                <TextInput.Icon
                  icon={hidePass2 ? "eye" : "eye-off"}
                  size={28}
                  color={"black"}
                  onPress={() => setHidePass2(!hidePass2)}
                />
              }
            />
          )}
          name="password2"
        />
        {errors.password2 && (
          <Text className="text-red-600 self-start ml-[6%]">
            {t("confirm_err")}
          </Text>
        )}
        {errMessage && (
          <Text className="text-red-600 self-start ml-[6%]">{errMessage}</Text>
        )}
        <Button
          className="w-[90%] mt-2 bg-[#FF6D00]"
          mode="contained"
          onPress={handleSubmit(createUser)}
        >
          {t("sign_up")}
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

        <Text className="text-center mx-4 pt-4">
          {t("by_creating_account")}
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignUp;
