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

  // Linking.openURL("exp://192.168.101.33:8081/--/ticket-detail");

  return (
    <NavigationContainer
      linking={{
        prefixes: [Linking.createURL("/")],
        config: { screens: { TicketDetails: "ticket-detail" } },
      }}
    >
      {/* <DrawerNavigator /> */}
      <TabNavigator />
    </NavigationContainer>
  );
}
