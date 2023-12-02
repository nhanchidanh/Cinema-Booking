import React, { useState } from "react";
import { Button, TouchableOpacity } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const CinemaComponent = ({ cinema }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqab4LF9LOfIQBwkuQqJbqRcIyrYYdaXa_sg&usqp=CAU",
        }}
      />
      <View style={styles.blockRight}>
        <Text style={styles.text}>{cinema?.name}</Text>
        <View
          style={{ width: "100%", flexDirection: "row", paddingRight: 140 }}
        >
          <AntDesign
            name="pushpino"
            // color="white"
            size={12}
            style={{ marginTop: 2 }}
          />
          <Text style={styles.textAdd}>{cinema?.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: "row",
    marginBottom: 24,
  },
  tinyLogo: {
    width: "30%",
    borderRadius: 6,
    height: "100%",
  },
  blockRight: {
    marginLeft: 10,
    width: "100%",
  },
  text: {
    // color: "white",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 8,
  },
  textAdd: {
    // color: "#ECE8DD",
    fontWeight: "400",
    fontSize: 12,
    marginLeft: 4,
  },
});

export default CinemaComponent;
