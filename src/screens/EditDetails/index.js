import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
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

const EditDetails = () => {
  const [recievedPackage, setRecievedPackage] = useState({
    id: 4,
    name: "Iphone 14 pro max",
    status: "Waiting",
    adress: "1543 Main street",
  });
  function updateDeliveryDetails() {}
  const [modalVisibility, setmodalVisibility] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(30);

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

  function cancelOrder() {
    hideModal();
  }

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
          <PackageInfo item={recievedPackage} />
          <TextInput
            className="w-full mt-4"
            outlineColor="#79747E"
            activeOutlineColor="#FF6D00CC"
            mode="outlined"
            label={"Address"}
            placeholder={"Address"}
            returnKeyType="next"
            // value={value}
            // onChangeText={(event) => {
            // onChange(event);
            // setErrMessage("");
            // }}
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
            placeholder={"MM/DD/YYYY"}
            returnKeyType="next"
            // value={value}
            // onChangeText={(event) => {
            // onChange(event);
            // setErrMessage("");
            // }}
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
            // value={value}
            // onChangeText={(event) => {
            // onChange(event);
            // setErrMessage("");
            // }}
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
                {/* <Text className="text-2xl leading-10"> am</Text> */}
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