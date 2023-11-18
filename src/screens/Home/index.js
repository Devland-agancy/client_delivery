import React, { useEffect, useState } from "react";
import { View, Image, Text, ScrollView, SafeAreaView } from "react-native";
import {
  Modal,
  Portal,
  IconButton,
  Searchbar,
  Button,
} from "react-native-paper";
import { useNavigate } from "react-router-native";
import ur_packages from "../../assets/imgs/package_sent.png";
import no_packages_yet from "../../assets/imgs/no_packages_yet.png";
import delivered_package from "../../assets/imgs/delivered_package.gif";
import PackageInfo from "../../components/PackageInfo";
import axios from "./../../API/Axios";
import Spinner from "../../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/userSlice";

const Home = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [allPackages, setAllPackages] = useState([]);
  const [deliveredPackages, setDeliveredPackages] = useState([]);
  const [displayedPackages, setDisplayedPackages] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [completedButton, setCompletedButton] = useState(false);
  const dispatch = useDispatch();
  const [modalVisibility, setmodalVisibility] = useState(false);
  const showModal = () => setmodalVisibility(true);
  const hideModal = () => setmodalVisibility(false);
  const containerStyle = {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    alignSelf: "center",
  };

  useEffect(() => {
    async function getClientPackages() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `package/client_all_packages/?client_id=${userInfo?.id}`
        );
        if (response.data.success) {
          setAllPackages(response.data.message);
          waitingList = response.data.message?.filter(
            (item) => (item.status = "waiting")
          );
          shippedList = response.data.message?.filter(
            (item) => item.status === "shipped"
          );
          if (shippedList.length > 0) {
            const lastShippedItem = shippedList[shippedList.length - 1];
            setDeliveredPackages(lastShippedItem);
          }
          setDisplayedPackages(waitingList);
          setIsLoading(false);
        }
      } catch (error) {
        setErrMessage(error.message);
        setIsLoading(false);
      }
    }
    getClientPackages();
  }, []);

  function getCompletedPackages() {
    setCompletedButton(true);
    setIsLoading(true);
    const completedPackages = allPackages.filter((item) => item.isConfirmed);
    setDisplayedPackages(completedPackages);
    setIsLoading(false);
  }

  function getInProgressPackages() {
    setCompletedButton(false);
    setIsLoading(true);
    const completedPackages = allPackages.filter(
      (item) => (item.status = "waiting")
    );
    setDisplayedPackages(completedPackages);
    setIsLoading(false);
  }

  function logout() {
    dispatch(setUserInfo(undefined));
    hideModal();
  }

  useEffect(() => {
    const searchResult = allPackages.filter((item) =>
      item.name.includes(searchQuery)
    );
    setDisplayedPackages(searchResult);
  }, [searchQuery]);

  function handlePackageClick(item) {
    navigate("/deliveryMap", { state: item });
  }

  return (
    <>
      <View className="w-full flex flex-row justify-between mt-8 p-4">
        <View className="flex flex-row items-center gap-x-2">
          <Image
            source={{ uri: "https://picsum.photos/200" }}
            className="w-14 h-14 rounded-full"
          />
          <View className="flex flex-col justify-center">
            <Text className="font-bold">Welcome !</Text>
            <Text>Oliver Smith</Text>
          </View>
        </View>
        <View className="flex flex-row items-center">
          <IconButton
            icon="bell-outline"
            iconColor={"black"}
            size={20}
            onPress={() => console.log("notifications Pressed")}
          />
          <IconButton
            icon="logout"
            iconColor={"black"}
            size={20}
            onPress={showModal}
          />
        </View>
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
        {isLoading ? (
          <Spinner />
        ) : (
          <View className="flex flex-col flex-1 items-center p-4 gap-y-2">
            {allPackages.length > 0 && !(deliveredPackages.length > 0) && (
              <>
                <Image source={ur_packages} className="w-[250px] h-[240px]" />
                <Text>Your packages are on its way!</Text>
              </>
            )}
            {deliveredPackages.length > 0 && (
              <>
                <Image
                  source={delivered_package}
                  className="w-[250px] h-[240px]"
                />
                <Text>Your package has been delivered!</Text>
                {deliveredPackages.map((item) => (
                  <PackageInfo key={item.id} item={item} />
                ))}
              </>
            )}
            <Searchbar
              placeholder="Search for delivery order"
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
            <View className="w-full flex flex-row items-center justify-between">
              <Button
                className={`${!completedButton && "bg-client-orange"}  w-[48%]`}
                contentStyle={{
                  paddingVertical: 8,
                }}
                icon="clock-outline"
                mode={!completedButton ? "contained" : "outlined"}
                textColor={!completedButton ? "#ffff" : "#21212166"}
                onPress={getInProgressPackages}
              >
                In progress
              </Button>
              <Button
                className={`${completedButton && "bg-client-orange"}  w-[48%]`}
                contentStyle={{
                  paddingVertical: 8,
                }}
                textColor={completedButton ? "#ffff" : "#21212166"}
                icon="check"
                mode={completedButton ? "contained" : "outlined"}
                onPress={getCompletedPackages}
              >
                Completed
              </Button>
            </View>
            <SafeAreaView className="w-full">
              {allPackages.length === 0 ? (
                <View className="w-full flex flex-col items-center">
                  <Image
                    source={no_packages_yet}
                    className="w-[300px] h-[300px]"
                  />
                  <Text>You haven't placed any orders yet.</Text>
                </View>
              ) : displayedPackages.length > 0 ? (
                displayedPackages.map((item) => (
                  <PackageInfo
                    key={item.id}
                    item={item}
                    handlePackageClick={() => handlePackageClick(item)}
                  />
                ))
              ) : (
                <View className="w-full mt-8">
                  <Text className="text-center text-base">No packages!</Text>
                </View>
              )}
            </SafeAreaView>
            <Portal>
              <Modal
                visible={modalVisibility}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}
              >
                <View>
                  <Text className="font-bold text-base">
                    Are you sure you want to Logout?
                  </Text>
                  <View className="w-full flex flex-row justify-end mt-4">
                    <Button
                      textColor="#FF6D00CC"
                      theme={{ colors: { outline: "#FF6D00" } }}
                      className=""
                      mode="text"
                      onPress={hideModal}
                    >
                      Cancel
                    </Button>
                    <Button
                      textColor="#FF6D00CC"
                      theme={{ colors: { outline: "#FF6D00" } }}
                      className=""
                      mode="text"
                      onPress={logout}
                    >
                      Confirm
                    </Button>
                  </View>
                </View>
              </Modal>
            </Portal>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default Home;
