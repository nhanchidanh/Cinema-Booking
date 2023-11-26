import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useState } from "react";
export default function NotFound({ url }) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/28344-page-not-found-animation.json")}
        style={styles.animation}
        autoPlay
      />
      <Text style={styles.noShow}>Không có suất chiếu nào!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 250,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noShow: {
    marginTop: 12,
  },
});
