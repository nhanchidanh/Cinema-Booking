import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { Button, TouchableOpacity } from "react-native";
import { StyleSheet, View, Text } from "react-native";

const RankComponent = ({ rank }) => {
  return (
    <View
      style={{
        paddingHorizontal: 4,
        height: 22,
        borderRadius: 8,
        backgroundColor: "orange",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 2,
      }}
    >
      <Text
        style={[
          styles.text,
          {
            textAlign: "center",
            color: "white",
            marginBottom: 0,
            fontSize: 10,
          },
        ]}
      >
        {rank}
      </Text>
    </View>
  );
};
const PromotionCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.image}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://img.freepik.com/premium-vector/cinema-design-background-yellow_44392-38.jpg",
          }}
        />
      </View>
      <View style={styles.content}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[
              styles.text,
              { color: "gray", fontWeight: 400, marginRight: 4 },
            ]}
          >
            Mã Khuyến Mãi:{" "}
          </Text>
          <Text style={[styles.text, { textTransform: "uppercase" }]}>
            {item?.promotionCode || "00000"}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[
              styles.text,
              { color: "gray", fontWeight: 400, marginRight: 4 },
            ]}
          >
            Thời gian áp dụng:{" "}
          </Text>
          <Text style={[styles.text]}>
            {item?.startDate} - {item?.endDate}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={[
              styles.text,
              { color: "gray", fontWeight: 400, marginRight: 4 },
            ]}
          >
            Đối tượng áp dụng:{" "}
          </Text>
          {item?.rank &&
            item?.rank?.map((rank) => {
              return <RankComponent key={Math.random()} rank={rank} />;
            })}
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={[
              styles.text,
              { color: "gray", fontWeight: 400, marginRight: 4 },
            ]}
          >
            Chi tiết:{" "}
          </Text>
          <Text style={[styles.text, { paddingRight: 70 }]}>
            {item?.desc || "Khuyến mãi"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  blocks: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 6,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  container: {
    backgroundColor: "white",
    height: 380,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
  },
  image: {
    flex: 2.5,
  },
  content: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  tinyLogo: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "cover",
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
    textTransform: "capitalize",
  },
  option: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default PromotionCard;
