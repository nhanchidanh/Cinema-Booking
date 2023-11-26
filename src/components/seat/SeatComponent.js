import React, { useState } from "react";
import { Button, StyleSheet, TouchableOpacity, Text } from "react-native";

const SeatComponent = ({ item, handlePress, bgColor, color, text }) => {
  return (
    <TouchableOpacity
      key={Math.random()}
      onPress={() => handlePress(item)}
      style={[
        styles.conBlock,
        {
          backgroundColor: bgColor,
          borderWidth: 1,
          borderColor: color,
          marginRight: 20,
        },
      ]}
    >
      {
        text?.length > 0 ? 
        <Text style={{fontSize:8, textAlign:"center", color:"white", fontWeight:"700", marginTop:4}}>{text}</Text> : null
      }
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  conBlock: {
    width: 20,
    height: 20,
    backgroundColor: "red",
    borderRadius: 4,
    marginRight: 4,
  },
});

export default SeatComponent;
