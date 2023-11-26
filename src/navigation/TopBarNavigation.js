

import React, { useContext, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DetailFilm from "../components/show/DetailFilm";
import ShowFilm from "../components/show/ShowFilm";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colorConst } from "../utils/Color";
const Tab = createMaterialTopTabNavigator();

const TopBarNavigation = () => {
const insets = useSafeAreaInsets()
  return (
      <Tab.Navigator
        initialRouteName='showfilm'
        screenOptions={{
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: { backgroundColor: 'white', marginTop: insets.top},
            tabBarActiveTintColor: colorConst.blueColor
          }}
      >
      
      <Tab.Screen options={{ headerShown: false, tabBarLabel:'Suất Chiếu'}} name="showfilm" component={ShowFilm} />
      <Tab.Screen  options={{ headerShown: false, tabBarLabel:'Thông Tin'}} name="detailfilm" component={DetailFilm} />
    
    </Tab.Navigator>
  );
};

export default TopBarNavigation;
