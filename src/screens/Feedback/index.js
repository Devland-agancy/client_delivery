import React, { useState } from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { IconButton, TextInput, Button } from "react-native-paper";
import { useLocation, useNavigate } from "react-router-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import axios from "./../../API/Axios";
import feedback_img from "../../assets/imgs/feedback.png";
import useBackButtonHandler from "../../hooks/useBack";
import Spinner from "../../components/Spinner";

const Feedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [startNumber, setStarsNumber] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  function ratingCompleted(rating) {
    console.log("Rating is: " + rating);
    setStarsNumber(rating);
  }

  async function submitReview() {
    try {
      setIsProcessing(true);
      const response = await axios.post(
        `package/create_review/${location.state?.id}/`,
        { rating: startNumber.toString(), review: reviewText },
        { params: { client_id: location.state?.client?.id } }
      );
      if (response.data.success) {
        setIsProcessing(false);
        navigate("/home");
      }
    } catch (error) {
      setErrMessage("Oops something went wrong!");
      setIsProcessing(false);
    }
  }

  function skipNow() {}
  useBackButtonHandler();
  return (
    <>
      <View className="w-full mt-2">
        <IconButton
          className="mt-8"
          icon="keyboard-backspace"
          iconColor={"black"}
          size={35}
          onPress={() => navigate(-1)}
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
        {isProcessing && <Spinner />}
        <View
          className={`${
            isProcessing && "opacity-30"
          } w-full flex flex-col items-center px-4`}
        >
          <Text>Your feedback is important to us</Text>
          <Image source={feedback_img} className="w-[300px] h-[280px]" />
          <AirbnbRating
            count={5}
            showRating={false}
            defaultRating={5}
            size={30}
            selectedColor="#FF6D00CC"
            onFinishRating={ratingCompleted}
          />
          <TextInput
            className="w-full mt-2"
            outlineColor="#79747E"
            activeOutlineColor="#FF6D00CC"
            mode="outlined"
            label={"Review"}
            placeholder={"Write your experience with us"}
            returnKeyType="done"
            value={reviewText}
            onChangeText={(event) => {
              setReviewText(event);
              setErrMessage("");
            }}
            multiline
            numberOfLines={5}
          />
          {errMessage && <Text className="text-red-600">{errMessage}</Text>}
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
