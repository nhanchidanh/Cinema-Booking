import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useState } from "react";
export default function Loadding({ url }) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/lf20_gbfwtkzw.json")}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 45,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
