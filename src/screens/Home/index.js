import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import { IconButton, Searchbar, Button } from "react-native-paper";
import ur_packages from "../../assets/imgs/package_sent.png";
import package_icon from "../../assets/imgs/package_ic.png";
import no_packages_yet from "../../assets/imgs/no_packages_yet.png";
import delivered_package from "../../assets/imgs/delivered_package.gif";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [deliveredPackages, setDeliveredPackages] = useState([]);

  const packagesList = [
    {
      id: 1,
      name: "Iphone 14 pro max",
      status: "Shipped",
      adress: "1543 Main street",
    },
    {
      id: 2,
      name: "Iphone 14 pro max",
      status: "Shipped",
      adress: "1543 Main street",
    },
    {
      id: 3,
      name: "Iphone 14 pro max",
      status: "Shipped",
      adress: "1543 Main street",
    },
    {
      id: 4,
      name: "Iphone 14 pro max",
      status: "Shipped",
      adress: "1543 Main street",
    },
  ];

  const Package = ({ item }) => (
    <View className="w-full flex flex-row mt-2 p-2 bg-gray-100 rounded-md">
      <Image source={package_icon} className="w-16 h-16 rounded-full" />
      <View className="flex flex-col justify-center">
        <Text className="">{item.name}</Text>
        <Text className="">{item.status}</Text>
        <Text className="">{item.adress}</Text>
      </View>
    </View>
  );

  return (
    <>
      {/* home page header(settings && notification) */}
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
            icon="cog-outline"
            iconColor={"black"}
            size={20}
            onPress={() => console.log("Config Pressed")}
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
      >
        <View className="flex flex-col flex-1 items-center p-4 gap-y-2">
          {packagesList.length > 0 && !(deliveredPackages.length > 0) && (
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
                <Package key={item.id} item={item} />
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
              className="bg-client-orange w-[48%]"
              contentStyle={{
                paddingVertical: 8,
              }}
              icon="clock-outline"
              mode="contained"
              onPress={() => console.log("In progress Pressed")}
            >
              In progress
            </Button>
            <Button
              className="w-[48%]"
              contentStyle={{
                paddingVertical: 8,
              }}
              textColor="#21212166"
              icon="check"
              mode="outlined"
              onPress={() => console.log("Completed Pressed")}
            >
              Completed
            </Button>
          </View>
          <SafeAreaView className="w-full">
            {packagesList.length === 0 ? (
              <View className="w-full flex flex-col items-center">
                <Image
                  source={no_packages_yet}
                  className="w-[300px] h-[300px]"
                />
                <Text>You haven't placed any orders yet.</Text>
              </View>
            ) : (
              packagesList.map((item) => <Package key={item.id} item={item} />)
            )}
          </SafeAreaView>
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
