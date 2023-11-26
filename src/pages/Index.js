// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "../navigation/TabNavigator";
import DrawerNavigator from "../navigation/DrawerNavigator";
import PropTypes from "prop-types";
import TopBarNavigation from "../navigation/TopBarNavigation";

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      {/* <DrawerNavigator /> */}
      <TabNavigator />
    </NavigationContainer>
  );
}
