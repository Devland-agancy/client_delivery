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
import Feedback from "../screens/Feedback";
import EditDetails from "../screens/EditDetails";
import DeliveryMap from "../screens/DeliveryMap";

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
      <Route path="/signature" element={<Signature />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/editDetails" element={<EditDetails />} />
      <Route path="/" element={<DeliveryMap />} />
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
