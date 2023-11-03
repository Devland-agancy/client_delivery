import React from "react";
import { Navigate } from "react-router-native";
import { View } from "react-native";

const ProtectedRoute = ({ children, condition, fallback }) => {
  if (condition) {
    return <Navigate to={fallback} />;
  }
  return (
    <View className="w-full flex-1 items-center justify-center">
      {children}
    </View>
  );
};

export default ProtectedRoute;
