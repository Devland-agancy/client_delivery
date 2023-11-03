import React, { useState } from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { useNavigate, useLocation } from "react-router-native";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import forgotPwdImage from "../../assets/imgs/forget_pwd.png";
import axios from "./../../API/Axios";
import Spinner from "../../components/Spinner";
import useBackButtonHandler from "../../hooks/useBack";

const ResetCode = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProccessing, setIsProccessing] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: location.state.email,
    },
  });
  useBackButtonHandler();
  async function verifyOtpCode(values) {
    try {
      setIsProccessing(true);
      const response = await axios.post("authentication/otp/check/", values);
      if (response?.data?.status === "SUCCESS") {
        setIsProccessing(false);
        navigate("/resetPassword", { state: values });
      } else {
        setIsProccessing(false);
        setErrMessage(t("wrong_otp"));
      }
    } catch (error) {
      setIsProccessing(false);
      setErrMessage(t("wrong_otp"));
    }
  }

  async function resendOtp() {
    try {
      setIsProccessing(true);
      await axios.post("authentication/otp/resend/", location.state);
      setIsProccessing(false);
    } catch (error) {
      setIsProccessing(false);
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
      {isProccessing && <Spinner />}
      <View className={`${isProccessing && "opacity-30"} flex-1 items-center`}>
        <Image source={forgotPwdImage} className="h-[40%] mt-10 w-[80%]" />
        <Text className="font-normal text-lg text-center mx-4">
          {t("reset_code_title")}
        </Text>
        <Controller
          control={control}
          rules={{
            required: t("otp_required"),
            pattern: {
              value: /^\d{6}$/,
              message: t("code_pattern"),
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-[90%] mt-8"
              outlineColor="#79747E"
              activeOutlineColor="#FF6D00CC"
              mode="outlined"
              label={t("code")}
              placeholder={t("enter_code")}
              value={value}
              onChangeText={(event) => {
                onChange(event);
                setErrMessage("");
              }}
            />
          )}
          name="otp"
        />
        {errors.otp && (
          <Text className="text-red-600 self-start ml-[6%]">
            {errors.otp.message}
          </Text>
        )}
        {errMessage && (
          <Text className="text-red-600 self-start ml-[6%]">{errMessage}</Text>
        )}
        <Button
          className="w-[90%] mt-8 bg-[#FF6D00]"
          mode="contained"
          onPress={handleSubmit(verifyOtpCode)}
        >
          {t("reset_pwd")}
        </Button>
        <Button
          theme={{ colors: { outline: "#FF6D00" } }}
          textColor="#FF6D00CC"
          className="w-[90%] mt-2"
          mode="outlined"
          onPress={resendOtp}
        >
          {t("resend_code")}
        </Button>

        <Text className="text-center mx-4 pt-4">{t("copyright")}</Text>
      </View>
    </ScrollView>
  );
};

export default ResetCode;
