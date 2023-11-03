import React, { useState } from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-native";
import axios from "./../../API/Axios";
import confirmPwdImage from "../../assets/imgs/confirm_code.png";

const ConfirmationCode = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [err, setErr] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: location.state.phone,
      otp: "",
    },
  });

  async function sendOtp(values) {
    try {
      const response = await axios.post("authentication/otp/check/", values);
      console.log("response: ", response?.data);
      if (response?.data?.status === "SUCCESS") {
        navigate("/");
      } else {
        setErr(t("wrong_otp"));
      }
    } catch (error) {
      setErr(error?.message);
    }
  }
  async function resendOtp() {
    try {
      await axios.post("authentication/otp/resend/");
    } catch (error) {
      setErr(error?.message);
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
        <Image source={confirmPwdImage} className="h-[40%] mt-10 w-[80%]" />
        <Text className="font-normal text-lg text-center mx-4">
          {t("confirmation_title")}
        </Text>
        <Controller
          control={control}
          rules={{
            required: t("otp_code_required"),
            minLength: {
              value: 6,
              message: t("min_6"),
            },
            maxLength: {
              value: 6,
              message: t("min_6"),
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
              onChangeText={(e) => {
                onChange(e);
                setErr("");
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
        {!errors.otp && err && (
          <Text className="text-red-600 self-start ml-[6%]">
            {t("wrong_otp")}
          </Text>
        )}
        <Button
          className="w-[90%] mt-8 bg-[#FF6D00]"
          mode="contained"
          onPress={handleSubmit(sendOtp)}
        >
          {t("get-started")}
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

export default ConfirmationCode;
