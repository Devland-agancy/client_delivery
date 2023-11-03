import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useNavigate } from "react-router-native";

const useBackButtonHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigate(-1);
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);
};

export default useBackButtonHandler;
