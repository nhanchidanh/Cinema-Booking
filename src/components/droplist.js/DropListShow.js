import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { colorConst } from "../../utils/Color";
import useDropListHook from "./useDropListHook";

const DropListShow = ({ idx, status, show, setIsOpen }) => {
  const {
    showComponent,
    setShowComponent,
    handleShowList,
    handleClick,
    dataFilter,
  } = useDropListHook({ idx, status, show, setIsOpen });
  return (
    <TouchableOpacity
      onPress={handleShowList}
      style={styles.container}
      key={Math.random()}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>{show?.name}</Text>
        <Text style={styles.km}>3.5km</Text>
      </View>
      {showComponent.idx === idx && showComponent.status === status ? (
        <View style={styles.shows}>
          {dataFilter?.map((val) => {
            if (val?.disable) return null;
            return (
              <TouchableOpacity
                onPress={() => handleClick(val)}
                style={styles.show}
                key={Math.random()}
              >
                <Text>{val?.ShowTime?.showTime}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        false
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    marginTop: 24,
    borderTopWidth: 4,
    borderTopColor: "#F9F9F9",
    borderBottomWidth: 4,
    borderBottomColor: "#F9F9F9",
    paddingHorizontal: 20,
  },
  km: {
    fontSize: 11,
    color: colorConst.blueColor,
  },
  title: {
    fontSize: 14,
  },
  show: {
    width: 90,
    height: 45,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#BBBBBB",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginRight: 12,
  },
  shows: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
});

export default DropListShow;
