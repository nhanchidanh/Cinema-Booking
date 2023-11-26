import React, { useState } from "react";
import { Button, TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";
import moment from "moment";
import {
  caculatorDay,
  dateFormat,
  dateFormatQuery,
  dateVN,
} from "../../utils/Date";

const CardTime = ({ item, datePicked, onSetPicked, setDateQUery }) => {
  
  const handlePress = () => {
    const day = caculatorDay(
      moment()
        .add(item - 1, "days")
        .day()
    );
    const time = moment()
      .add(item - 1, "days")
      .format(dateVN);
    const string = day + ", " + time;
    onSetPicked({ text: string, number: item });
    setDateQUery(
      moment()
        .add(item - 1, "days")
        .format(dateFormatQuery)
    );
  };
  
  return (
    <TouchableOpacity
      style={
        item === datePicked.number
          ? [styles.container, styles.bg]
          : styles.container
      }
      onPress={handlePress}
    >
      <Text
        style={
          item === datePicked.number
            ? [styles.textDate, styles.active]
            : styles.textDate
        }
      >
        {caculatorDay(
          moment()
            .add(item - 1, "days")
            .day()
        )}
      </Text>
      <Text
        style={
          item === datePicked.number
            ? [styles.text, styles.active]
            : styles.text
        }
      >
        {moment()
          .add(item - 1, "days")
          .format(dateFormat)}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#3E54AC",
  },
  container: {
    width: 100,
    height: 60,

    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textDate: {
    color: "#333",
    fontSize: 10,
  },
  active: {
    color: "white",
  },
  text: {
    color: "black",
    fontWeight: "600",
    marginTop: 6,
  },
});

export default CardTime;
