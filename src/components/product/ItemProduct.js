import React, { useState } from "react";
import { Image } from "react-native";
import { Button, TouchableOpacity } from "react-native";
import { StyleSheet, View, Text } from "react-native";

const ItemProduct = ({ item, pickProducts, setPickProducts }) => {
  const handleDelete = () => {
    const newArr = pickProducts.filter((val) => {
      return val?.id !== item?.id;
    });
    setPickProducts(newArr);
  };
  return (
    <TouchableOpacity onPress={handleDelete} style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8GRx8TxV3MDoA0kF_YrrXg0uQVC8Ag6Ul_w&usqp=CAU",
        }}
      />
      <Text style={styles.text}>
        {item?.qty}x : {item.productName}
      </Text>

      <Text style={styles.cancel}>X</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 6,
    height: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 180,
    flexDirection: "row",
    marginRight: 12,
    marginTop: 6,
  },

  tinyLogo: {
    width: 60,
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cancel: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    marginHorizontal: 10,
    width: 80,
  },
});

export default ItemProduct;
