import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { AlertDialog, Button, Center, NativeBaseProvider } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Contex from "../store/Context";
import { SetUserLogin } from "../store/Actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CinemaComponent from "../components/home/CinemaComponent";
import cinameApi from "../api/cinameApi";

const ShowTimePage = () => {
  const [cinemas, setCinemas] = useState([]);
  useEffect(() => {
    const getCinema = async () => {
      const data = await cinameApi.getCinemas();
      setCinemas(data);
    };
    getCinema();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Hệ Thống Rạp</Text>
        {/* <View>
          <TouchableOpacity style={styles.buttonGPlusStyle} activeOpacity={0.5}>
            <Text style={styles.buttonTextStyle}>TPHCM</Text>
          </TouchableOpacity>
        </View> */}
        <ScrollView style={styles.profile_bottom}>
          {cinemas.map((cinema) => {
            return <CinemaComponent key={Math.random()} cinema={cinema} />;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    textTransform: "capitalize",
    fontSize: 22,
    paddingBottom: 20,
  },
  profile_top: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    // backgroundColor:"red"
  },
  profile_bottom: {
    flex: 1,
    // backgroundColor:"red"
  },
  buttonGPlusStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#79D70F",
    height: 40,
    width: "30%",
    borderRadius: 5,
    marginBottom: 20,
  },

  buttonTextStyle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 10,
  },
});
export default ShowTimePage;
