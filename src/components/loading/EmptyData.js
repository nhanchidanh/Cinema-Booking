import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useState } from "react";
export default function EmptyData({ url }) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/lf20_Celp8h.json")}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 100,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
