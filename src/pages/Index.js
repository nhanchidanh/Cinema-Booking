// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

import * as Linking from "expo-linking";
import TabNavigator from "../navigation/TabNavigator";

const Tab = createBottomTabNavigator();

export default function Index() {
  const url = Linking.useURL();

  // Linking.openURL("exp://192.168.1.9:8081/--/r?test=param");

  return (
    <NavigationContainer
      linking={{
        prefixes: [Linking.createURL("/")],
        config: { screens: { Home: "r" } },
      }}
    >
      {/* <DrawerNavigator /> */}
      <TabNavigator />
    </NavigationContainer>
  );
}
