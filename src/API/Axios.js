// import axios from "axios";

// export default axios.create({
//   baseURL: "https://dl-app-ss6i.onrender.com/api/",
// });

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "https://dl-app-ss6i.onrender.com/api/",
});

instance.interceptors.request.use(
  async (config) => {
    const userJson = await AsyncStorage.getItem("persist:root");
    const userInfoJson = JSON.parse(userJson)?.userInfo;
    if (userInfoJson) {
      const token = JSON.parse(userInfoJson).api_token;
      config.headers["Authorization"] = `Token ${token}`;
    }

    if (!config.headers["Content-Type"])
      config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      if (error.response.data.detail === "Invalid token.") {
        await AsyncStorage.removeItem("persist:root"); // TODO: update the store state
      }
      return Promise.reject(error);
    }
  }
);

export default instance;
