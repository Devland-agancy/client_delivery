import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import Toast from "react-native-toast-message";
import {
  IconButton,
  TextInput,
  Button,
  Modal,
  Portal,
} from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PackageInfo from "../../components/PackageInfo";
import { useLocation, useNavigate } from "react-router-native";
import axios from "./../../API/Axios";
import Spinner from "../../components/Spinner";

const EditDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errMessage, setErrMessage] = useState("");
  const [recievedPackage, setRecievedPackage] = useState(location.state);
  const [modalVisibility, setmodalVisibility] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(30);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const showModal = () => setmodalVisibility(true);
  const hideModal = () => setmodalVisibility(false);
  const containerStyle = {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    alignSelf: "center",
  };

  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      setHours(hours);
      setMinutes(minutes);
    },
    [setVisible]
  );

  async function updateDeliveryDetails() {
    try {
      setIsProcessing(true);
      const estimated_time = date + " " + hours + ":" + minutes;
      const response = await axios.post(
        `package/change_package_time_address/${location.state?.id}/`,
        { estimated_time, address, comment },
        { params: { client_id: location.state?.client?.id } }
      );
      if (response.data.success) {
        setIsProcessing(false);
        showToast(
          "success",
          "Delivery information",
          "The delivery information updated succesfully👋"
        );
        setAddress("");
        setComment("");
        setDate("");
        setTimeout(() => navigate("/home"), 1000);
      }
    } catch (error) {
      setIsProcessing(false);
      setErrMessage("Oops Something went wrong!");
    }
  }

  async function cancelOrder() {
    try {
      setIsProcessing(true);
      const response = await axios.get(
        `package/client_cancel_package/${location.state?.id}/`,
        { params: { client_id: location.state?.client?.id } }
      );
      if (response.data.success) {
        setIsProcessing(false);
        showToast(
          "success",
          "Delivery information",
          "The Order was canceled successfully"
        );
        setTimeout(() => navigate("/home"), 1000);
      }
    } catch (error) {
      hideModal();
      setIsProcessing(false);
      showToast("error", "Delivery information", "Oops Something went wrong!");
    }
  }

  const showToast = (status, text1, text2) => {
    Toast.show({
      type: status,
      text1,
      text2,
    });
  };

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
      <Toast />
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
          <PackageInfo item={recievedPackage} displayUpdateIcon={false} />
          <TextInput
            className="w-full mt-4"
            outlineColor="#79747E"
            activeOutlineColor="#FF6D00CC"
            mode="outlined"
            label={"Address"}
            placeholder={"Address"}
            returnKeyType="next"
            value={address}
            onChangeText={(event) => {
              setAddress(event);
              setErrMessage("");
            }}
            right={
              <TextInput.Icon icon={"map-marker"} size={28} color={"black"} />
            }
          />
          <TextInput
            className="w-full mt-2"
            outlineColor="#79747E"
            activeOutlineColor="#FF6D00CC"
            mode="outlined"
            label={"Date of Delivery"}
            placeholder={"YYYY-MM-DD"}
            returnKeyType="next"
            value={date}
            onChangeText={(event) => {
              setDate(event);
              setErrMessage("");
            }}
            right={
              <TextInput.Icon icon={"calendar"} size={28} color={"black"} />
            }
          />
          <TextInput
            className="w-full mt-2"
            outlineColor="#79747E"
            activeOutlineColor="#FF6D00CC"
            mode="outlined"
            label={"Comment"}
            placeholder={"Write a comment..."}
            returnKeyType="done"
            value={comment}
            onChangeText={(event) => {
              setComment(event);
              setErrMessage("");
            }}
            multiline
            numberOfLines={4}
          />
          <Pressable className="w-full" onPress={() => setVisible(true)}>
            <View className="w-full mt-4 p-4 rounded-lg flex flex-col items-start bg-gray-100">
              <Text>Enter Time</Text>
              <View className="mt-2 flex flex-row items-end">
                <Text className="text-4xl">
                  {hours}:{minutes}
                </Text>
              </View>
            </View>
          </Pressable>
          <SafeAreaProvider>
            <TimePickerModal
              visible={visible}
              onDismiss={onDismiss}
              onConfirm={onConfirm}
              hours={12}
              minutes={14}
              use24HourClock={true}
            />
          </SafeAreaProvider>
          <Portal>
            <Modal
              visible={modalVisibility}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <View>
                <Text className="font-bold text-lg">
                  Are you sure you want to cancel this order?
                </Text>
                <Text className="mt-2 text-md text-[#49454F]">
                  Once you cancel this order, you will not be able to reinstate
                  it.
                </Text>
                <View className="w-full flex flex-row justify-end mt-4">
                  <Button
                    textColor="#FF6D00CC"
                    theme={{ colors: { outline: "#FF6D00" } }}
                    className=""
                    mode="text"
                    onPress={hideModal}
                  >
                    Keep Order
                  </Button>
                  <Button
                    textColor="#FF6D00CC"
                    theme={{ colors: { outline: "#FF6D00" } }}
                    className=""
                    mode="text"
                    onPress={cancelOrder}
                  >
                    Cancel Order
                  </Button>
                </View>
              </View>
            </Modal>
          </Portal>
          {errMessage && <Text className="text-red-600">{errMessage}</Text>}
          <Button
            className="w-full mt-4 bg-[#FF6D00]"
            mode="contained"
            onPress={updateDeliveryDetails}
          >
            Update delivery information
          </Button>
          <Button
            textColor="#FF6D00CC"
            theme={{ colors: { outline: "#FF6D00" } }}
            className="w-full mt-2"
            mode="outlined"
            onPress={showModal}
          >
            Cancel Order
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default EditDetails;
