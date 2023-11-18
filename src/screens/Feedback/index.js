import React from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { IconButton, TextInput, Button } from "react-native-paper";
import { useLocation, useNavigate } from "react-router-native";
import axios from "./../../API/Axios";
import feedback_img from "../../assets/imgs/feedback.png";

const Feedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  function submitReview() {}
  function skipNow() {}
  return (
    <>
      <View className="w-full mt-2">
        <IconButton
          className="mt-8"
          icon="keyboard-backspace"
          iconColor={"black"}
          size={35}
          onPress={() => console.log("<===== <===== <===== <=====")}
        />
      </View>
      <ScrollView
        className="w-full"
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View className="w-full flex flex-col items-center px-4">
          <Text>Your feedback is important to us</Text>
          <Image source={feedback_img} className="w-[300px] h-[300px]" />
          <TextInput
            className="w-full mt-2"
            outlineColor="#79747E"
            activeOutlineColor="#FF6D00CC"
            mode="outlined"
            label={"Review"}
            placeholder={"Write your experience with us"}
            returnKeyType="done"
            // value={value}
            // onChangeText={(event) => {
            // onChange(event);
            // setErrMessage("");
            // }}
            multiline
            numberOfLines={6}
          />
          <Button
            className="w-full mt-4 bg-[#FF6D00]"
            mode="contained"
            onPress={submitReview}
          >
            Submit
          </Button>
          <Button
            textColor="#FF6D00CC"
            theme={{ colors: { outline: "#FF6D00" } }}
            className="w-full mt-2"
            mode="outlined"
            onPress={skipNow}
          >
            Skip
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default Feedback;
