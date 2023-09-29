import React from "react";
import { Route, Routes } from "react-router-native";
import SignIn from "./../screens/Signin/index";
import SignUp from "./../screens/SignUp/index";
import ForgotPassword from "./../screens/ForgotPassword/index";
import ResetCode from "./../screens/ResetCode/index";
import ResetPassword from "./../screens/ResetPassword/index";
import ConfirmationCode from "./../screens/Confirmation/index";
import Profile from "./../screens/Profile/index";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetCode" element={<ResetCode />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/confirmationCode" element={<ConfirmationCode />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
