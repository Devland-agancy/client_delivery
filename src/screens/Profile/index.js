import React from "react";
import { SafeAreaView, View, Image, Text, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/userSlice";
import { useNavigate } from "react-router-native";
import profileImage from "../../assets/imgs/profile_image.png";
import FileInput from "./FileInput";

const Profile = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [gender, setGender] = React.useState("");
  const navigate = useNavigate();
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

  function logout() {
    dispatch(setUserInfo(undefined));
  }
  return (
    <ScrollView
      className="w-full"
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
      scrollEnabled={true}
      nestedScrollEnabled={true}
    >
      <View className="flex-1 items-center justify-center">
        <Text className="font-normal text-lg text-center mx-4 mt-20 mb-4">
          Hello {userInfo?.first_name + " " + userInfo?.last_name}!
        </Text>
        <Button
          className="w-[90%] mt-8 bg-[#FF6D00]"
          mode="contained"
          onPress={logout}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

export default Profile;
