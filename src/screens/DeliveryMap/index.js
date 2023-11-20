import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import { useLocation, useNavigate } from "react-router-native";
import PackageInfo from "../../components/PackageInfo";
import { useEffect } from "react";
import Spinner from "../../components/Spinner";
import DeliveredTimeLine from "../../components/DeliveredTimeLine";
import useBackButtonHandler from "./../../hooks/useBack";

const DeliveryMap = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [recievedPackage, setRecievedPackage] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function confirmDelivery() {}

  useEffect(() => {
    setIsLoading(true);
    setRecievedPackage(location.state);
    setIsLoading(false);
  }, []);

  function handlePackageClick() {}
  function confirmDelivery() {
    navigate("/signature", { state: recievedPackage });
  }
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
        {isLoading ? (
          <Spinner />
        ) : (
          <View className="w-full flex flex-col items-center px-4">
            <PackageInfo
              item={recievedPackage}
              handlePackageClick={handlePackageClick}
              displayUpdateIcon={true}
            />
            <MapView
              style={styles.map}
              className="mt-4"
              initialRegion={{
                latitude: location.state.latitude,
                longitude: location.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.state.latitude,
                  longitude: location.state.longitude,
                }}
                title={"Your Package"}
                description={"Package current position"}
              />
            </MapView>
            <DeliveredTimeLine confirmDelivery={confirmDelivery} />
          </View>
        )}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "50%",
  },
});

export default DeliveryMap;
