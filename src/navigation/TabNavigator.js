// ./navigation/TabNavigator.js

import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons, { FontAwesome } from "@expo/vector-icons/Ionicons";
import {  HomeStackNavigator, ShowStackNavigator, PromotionStackNavigator, ProfileStackNavigator, LoginStackNavigator } from "./StackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Contex from "../store/Context";
import { SetUserLogin } from "../store/Actions";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { state, depatch } = useContext(Contex);
  const { userLogin } = state;
 
  const handleGetUSer = async () =>{
    const user = await AsyncStorage.getItem('user');
    if(user){
      depatch(SetUserLogin(JSON.parse(user)))
    }
  }
  useEffect(()=>{
    handleGetUSer();
   
  }, [])
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Rạp") {
              iconName = focused ? "ios-list" : "ios-list";
            } else if (route.name === "Khuyến mãi") {
              iconName = focused ? "gift" : "gift";
            } else if (route.name === "Tài khoản") {
              iconName = focused ? "person" : "person";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#06FF00",
          tabBarInactiveTintColor: "gray",
          tabBarStyle:{
            backgroundColor:'#413F42',
           paddingTop:4,
           paddingBottom:4,
          },
        })}
      >
      
      <Tab.Screen options={{ headerShown: false}} name="Home" component={HomeStackNavigator} />
      <Tab.Screen  options={{ headerShown: false}} name="Rạp" component={ShowStackNavigator} />
      <Tab.Screen   options={{ headerShown: false}}name="Khuyến mãi" component={PromotionStackNavigator} />
      <Tab.Screen   options={{ headerShown: false}}name="Tài khoản" component={userLogin ? ProfileStackNavigator: LoginStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
