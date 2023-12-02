import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import cinameApi from "../api/cinameApi";
import CinemaComponent from "../components/home/CinemaComponent";

const ShowTimePage = (props) => {
  const [cinemas, setCinemas] = useState([]);
  const route = useRoute();

  // console.log(`props ShowTimePage`, JSON.stringify(props, null, 4));

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
    // backgroundColor: "black",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    // color: "white",
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
    // color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 10,
  },
});
export default ShowTimePage;
