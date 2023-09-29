import React from "react";
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { TextInput, Checkbox, Button } from "react-native-paper";
import { Link } from "react-router-native";
import DropDown from "react-native-paper-dropdown";
import { useTranslation } from "react-i18next";

import profileImage from "../../assets/imgs/profile_image.png";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [gender, setGender] = React.useState("");
  const genderList = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];
  return (
    <ScrollView
      className="w-full"
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
      scrollEnabled={true}
      nestedScrollEnabled={true}
    >
      <View className="flex-1 items-center">
        <Text className="font-normal text-lg text-center mx-4 mt-20">
          {t("profile_step")}
        </Text>
        <Image
          source={profileImage}
          className="h-[150px] mt-4 w-[150px] rounded-full"
        />
        <TextInput
          className="w-[90%] mt-8"
          outlineColor="#79747E"
          activeOutlineColor="#FF6D00CC"
          mode="outlined"
          label={t("user_name")}
          placeholder="Chaker kercha"
        />
        <TextInput
          className="w-[90%] mt-2"
          outlineColor="#79747E"
          activeOutlineColor="#FF6D00CC"
          mode="outlined"
          label={t("birth_date")}
          placeholder="08/17/2023"
          right={<TextInput.Icon icon="calendar" />}
        />
        <SafeAreaView className="w-[90%] mt-2">
          <DropDown
            label={t("gender")}
            mode={"outlined"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={gender}
            setValue={setGender}
            list={genderList}
            dropDownItemSelectedTextStyle={{ color: "#FF6D00CC" }}
          />
        </SafeAreaView>
        <Button
          className="w-[90%] mt-8 bg-[#FF6D00]"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          {t("setup_profile")}
        </Button>
        <Button
          theme={{ colors: { outline: "#FF6D00" } }}
          textColor="#FF6D00CC"
          className="w-[90%] mt-2"
          mode="outlined"
          onPress={() => console.log("Pressed")}
        >
          {t("skip_now")}
        </Button>

        <Text className="text-center mx-4 pt-4">{t("copyright")}</Text>
      </View>
    </ScrollView>
  );
};

export default Profile;
