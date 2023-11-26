// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomePage from "../pages/HomePage";
import ShowTimePage from "../pages/ShowTimesPage";
import Promotion from "../pages/Promotion";
import ProfilePage from "../pages/ProfilePage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import DetailsFilm from "../pages/DetailsFilm";
import PickFilmScreen from "../pages/PickFilmScreen";
import TopBarNavigation from "./TopBarNavigation";
import PickSeatComponent from "../components/seat/PickSeatComponent";
import PickProduct from "../components/product/PickProduct";
import BookingPreview from "../components/booking/BookingPreview";
import ForgotPassword from "../pages/ForgotPassword";
import ProfileScreen from "../pages/ProfileScreen";
import SignUpSuccessPage from "../pages/SignUpSuccessPage";
import UpdateProfilePage from "../pages/UpdateProfilePage";
import TicketBooked from "../pages/TicketBooked";
import TicketDetails from "../pages/TicketDetails";
import PromotionScreen from "../components/booking/PromotionScreen";
import ResetPassword from "../pages/ResetPassword";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerTintColor: "black",
  headerBackTitle: "",
  headerTitleStyle: {
    fontWeight: "bold",
    color: "black",
  },
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomePage"
        component={HomePage}
      />
      <Stack.Screen
        options={{ title: "Chọn suất chiếu" }}
        name="FilmDetail"
        component={TopBarNavigation}
      />
      <Stack.Screen
        options={{ title: "Chọn ghế" }}
        name="PickFilm"
        component={PickFilmScreen}
      />
      <Stack.Screen
        options={{ title: "Chọn ghế" }}
        name="PickSeatScreen"
        component={PickSeatComponent}
      />
      <Stack.Screen
        options={{ title: "Chọn bắp nước" }}
        name="PickProducts"
        component={PickProduct}
      />
      <Stack.Screen
        options={{ title: "Khuyến mãi" }}
        name="PromotionScreen"
        component={PromotionScreen}
      />
      <Stack.Screen
        options={{ title: "Thanh toán" }}
        name="BookingPreview"
        component={BookingPreview}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        name="TicketBooked"
        component={TicketBooked}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        options={{ title: "Thành công" }}
        name="SignUpSuccessPage"
        component={SignUpSuccessPage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Promotion"
        component={Promotion}
      />
    </Stack.Navigator>
  );
};

const ShowStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Showtimes"
        component={ShowTimePage}
      />
    </Stack.Navigator>
  );
};

const PromotionStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Promotion"
        component={Promotion}
      />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        options={{ title: "Cập nhật thông tin" }}
        name="UpdateProfile"
        component={UpdateProfilePage}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        options={{ title: "Danh sách vé" }}
        name="TicketBooked"
        component={TicketBooked}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        options={{ title: "Chi tiết vé" }}
        name="TicketDetails"
        component={TicketDetails}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        options={{ title: "Đổi mật khẩu" }}
        name="ResetPassword"
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};
const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={Register}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUpSuccessPage"
        component={SignUpSuccessPage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Forgot"
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
};

export {
  LoginStackNavigator,
  ProfileStackNavigator,
  PromotionStackNavigator,
  ShowStackNavigator,
  HomeStackNavigator,
};
