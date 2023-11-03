import React, { useEffect, useState } from "react";
import { View, Image, Text, ScrollView, BackHandler } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { useNavigate } from "react-router-native";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import forgotPwdImage from "../../assets/imgs/forget_pwd.png";
import axios from "./../../API/Axios";
import Spinner from "../../components/Spinner";
import useBackButtonHandler from "../../hooks/useBack";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProccessing, setIsProccessing] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [errMessage, setErrMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  useBackButtonHandler();

  async function sendOtpCode(values) {
    try {
      setIsProccessing(true);
      const response = await axios.post("authentication/otp/resend/", values);
      if (response?.data?.status === "SUCCESS") {
        setIsProccessing(false);
        navigate("/resetCode", { state: values });
      } else {
        setIsProccessing(false);
        setErrMessage(t("email_err"));
      }
    } catch (error) {
      setIsProccessing(false);
      setErrMessage(t("email_err"));
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
      {isProccessing && <Spinner />}
      <View className={`${isProccessing && "opacity-30"} flex-1 items-center`}>
        <Image source={forgotPwdImage} className="h-[40%] mt-10 w-[80%]" />
        <Text className="font-normal text-lg text-center mx-4">
          {t("forgot_pwd_title")}
        </Text>
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
              className="w-[90%] mt-8"
              outlineColor="#79747E"
              activeOutlineColor="#FF6D00CC"
              mode="outlined"
              label={t("email_address")}
              placeholder={t("enter_email")}
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
        {errMessage && (
          <Text className="text-red-600 self-start ml-[6%]">{errMessage}</Text>
        )}
        <Button
          className="w-[90%] mt-8 bg-[#FF6D00]"
          mode="contained"
          onPress={handleSubmit(sendOtpCode)}
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
