import React from "react";
import { Route, Routes } from "react-router-native";
import SignIn from "./../screens/Signin/index";
import ForgotPassword from "./../screens/ForgotPassword/index";
import ResetCode from "./../screens/ResetCode/index";
import ResetPassword from "./../screens/ResetPassword/index";
import Profile from "./../screens/Profile/index";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import Home from "../screens/Home";
import Signature from "../screens/Signature";

const AppRoutes = () => {
  const userInfo = useSelector((state) => state.userInfo);
  console.log("usr:", userInfo);
  return (
    <Routes>
      <Route
        path="/s"
        element={
          <ProtectedRoute condition={!!userInfo} fallback={"/profile"}>
            <SignIn />
          </ProtectedRoute>
        }
      />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetCode" element={<ResetCode />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Signature />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute condition={!userInfo} fallback="/">
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
