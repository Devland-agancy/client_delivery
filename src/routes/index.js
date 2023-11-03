import React from "react";
import { Route, Routes } from "react-router-native";
import SignIn from "./../screens/Signin/index";
import SignUp from "./../screens/SignUp/index";
import ForgotPassword from "./../screens/ForgotPassword/index";
import ResetCode from "./../screens/ResetCode/index";
import ResetPassword from "./../screens/ResetPassword/index";
import ConfirmationCode from "./../screens/Confirmation/index";
import Profile from "./../screens/Profile/index";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const userInfo = useSelector((state) => state.userInfo);
  console.log("usr:", userInfo);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute condition={!!userInfo} fallback={"/profile"}>
            <SignIn />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/signup"
        element={
          <ProtectedRoute condition={!!userInfo} fallback={"/profile"}>
            <SignUp />
          </ProtectedRoute>
        }
      /> */}
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetCode" element={<ResetCode />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      {/* <Route path="/confirmationCode" element={<ConfirmationCode />} /> */}
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
