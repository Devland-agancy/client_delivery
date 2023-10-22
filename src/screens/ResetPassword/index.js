import React, { useState } from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-native";
import forgotPwdImage from "../../assets/imgs/forget_pwd.png";
import axios from "./../../API/Axios";

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);
  const location = useLocation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: location.state.email,
    },
  });

  async function resetPassword(values) {
    try {
      const response = await axios.post(
        "authentication/reset-password/",
        values
      );
      if (response?.data?.status === "SUCCESS") {
        navigate("/");
      } else {
        setErrMessage(response?.data?.message);
      }
    } catch (error) {
      setErrMessage(error.message);
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
        <Image source={forgotPwdImage} className="h-[40%] mt-10 w-[80%]" />
        <Text className="font-normal text-lg text-center mx-4">
          {t("reset_pwd_title")}
        </Text>
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
              label={t("new_password")}
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
            {errors.password1.message}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: t("pwd_required"),
            validate: (value) =>
              value === watch("password1") || t("confirm_err"),
            minLength: {
              value: 6,
              message: t("password_err"),
            },
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
            {errors.password2.message}
          </Text>
        )}
        {errMessage && (
          <Text className="text-red-600 self-start ml-[6%]">{errMessage}</Text>
        )}
        <Button
          className="w-[90%] mt-8 bg-[#FF6D00]"
          mode="contained"
          onPress={handleSubmit(resetPassword)}
        >
          {t("let_in")}
        </Button>

        <Text className="text-center mx-4 pt-4">{t("copyright")}</Text>
      </View>
    </ScrollView>
  );
};

export default ResetPassword;
