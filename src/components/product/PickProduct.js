import React, { useState } from "react";
import {
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { GHE_DOI, GHE_THUONG, VND } from "../../constant";
import CountDownTime from "../../utils/CountDownTime";
import ItemProduct from "./ItemProduct";
import ProductCard from "./ProductCard";
import usePickProductHook from "./usePickProductHook";

const PickProduct = () => {
  const {
    seats,
    products,
    setPickProducts,
    quality,
    setQuality,
    pickProducts,
    handleContinue,
    totalPrice,
    loadding,
  } = usePickProductHook();
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.time}>
        <CountDownTime />
      </View> */}
      <ScrollView style={{ flex: 1 }}>
        {products.map((p) => {
          if (p?.productName === GHE_DOI || p?.productName === GHE_THUONG) {
            return null;
          }
          return (
            <ProductCard
              setPickProducts={setPickProducts}
              pickProducts={pickProducts}
              key={Math.random()}
              setQuality={setQuality}
              qualityGlobal={quality}
              product={p}
            />
          );
        })}
      </ScrollView>
      {pickProducts.length > 0 ? (
        <View style={styles.productPickedClass}>
          <FlatList
            horizontal
            data={pickProducts}
            keyExtractor={() => Math.random()}
            renderItem={({ item }) => (
              <ItemProduct
                setPickProducts={setPickProducts}
                pickProducts={pickProducts}
                item={item}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : null}
      <View style={styles.bottomSecond}>
        <View style={styles.left}>
          <View style={{ flexDirection: "row", width: 250, flexWrap: "wrap" }}>
            <Text style={{ fontSize: 12 }}>{seats.length}x ghế: </Text>
            {seats.length > 0 ? (
              seats.map((val) => {
                return (
                  <Text style={{ fontSize: 12 }} key={Math.random()}>
                    {val?.seatColumn + "-" + val?.seatRow + ", "}
                  </Text>
                );
              })
            ) : (
              <Text style={{ fontSize: 12 }}>Chưa chọn ghế.</Text>
            )}
          </View>

          <Text style={{ marginTop: 6, color: "#DBD0C0" }}>
            Tổng:{" "}
            <Text style={{ color: "orange", fontSize: 18, fontWeight: "600" }}>
              {VND.format(totalPrice)}
            </Text>
          </Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={{ color: "white", fontWeight: 600 }}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loadding && (
        <View style={styles.screenReload}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screenReload: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    position: "absolute",
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productPickedClass: {
    backgroundColor: "#DDDDDD",
    width: "100%",
    height: 70,
    borderTopWidth: 1,
    borderTopColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#DDDDDD",
  },
  time: {
    backgroundColor: "orange",
    width: "100%",
    paddingVertical: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSecond: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  left: {},
  right: {},
  button: {
    backgroundColor: "orange",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

export default PickProduct;
