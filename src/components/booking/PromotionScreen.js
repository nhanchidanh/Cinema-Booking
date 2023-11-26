import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import PromotionCard from "./PromotionCard";
import { useContext } from "react";
import Contex from "../../store/Context";
import {
  SetPromotion,
  SetPromotionNotActive,
  SetPromotionWillActive,
} from "../../store/Actions";
const PromotionScreen = ({ route, navigation }) => {
  const { promotion } = route.params;
  const { state, depatch } = useContext(Contex);
  const { promotionNotActive, promotionWillActive } = state;
  console.log("rerender");

  const handlePromotionPick = () => {
    if (promotionNotActive.length > 0) {
      const data = promotion.map((val) => {
        const index = promotionNotActive.findIndex((element) => {
          if (element?.promotionCode === val?.promotionCode) {
            return true;
          }
          return false;
        });

        if (index != -1) {
          return { ...val, isActive: false };
        }
        return val;
      });
      depatch(SetPromotionNotActive([]));
      depatch(SetPromotion(data));
    }
    if (promotionWillActive.length > 0) {
      const data = promotion.map((val) => {
        const index = promotionWillActive.findIndex((element) => {
          if (element?.promotionCode === val?.promotionCode) {
            return true;
          }
          return false;
        });

        if (index != -1) {
          return { ...val, isActive: true };
        }
        return val;
      });
      depatch(SetPromotion(data));
      depatch(SetPromotionWillActive([]));
    }
    navigation.navigate("BookingPreview");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 12,
            marginTop: 24,
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Vui lòng nhập mã Vouncher"
          />
          <TouchableOpacity
            style={{
              paddingVertical: 12,
              marginLeft: 12,
              width: 60,
              paddingHorizontal: 3,
              borderRadius: 4,
              backgroundColor: "#F0F0F0",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 12, color: "gray" }}>
              Thêm
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "#EEEEEE",
            paddingVertical: 10,
            paddingHorizontal: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{ height: 1, width: 80, backgroundColor: "gray" }}
          ></View>
          <Text
            style={{ textAlign: "center", color: "gray", marginHorizontal: 24 }}
          >
            Voucher hệ thống
          </Text>
          <View
            style={{ height: 1, width: 80, backgroundColor: "gray" }}
          ></View>
        </View>
        <View style={{ marginHorizontal: 12 }}>
          {promotion &&
            promotion?.map((val) => {
              return <PromotionCard key={Math.random()} item={val} />;
            })}
          {promotion.length === 0 ? (
            <View>
              <Text
                style={{
                  textAlign: "center",
                  color: "gray",
                  marginHorizontal: 24,
                  marginTop: 24,
                }}
              >
                Không có voucher!
              </Text>
            </View>
          ) : null}
        </View>

        <View
          style={{
            backgroundColor: "#EEEEEE",
            paddingVertical: 10,
            paddingHorizontal: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 24,
          }}
        >
          <View
            style={{ height: 1, width: 80, backgroundColor: "gray" }}
          ></View>
          <Text
            style={{ textAlign: "center", color: "gray", marginHorizontal: 24 }}
          >
            Voucher của bạn
          </Text>
          <View
            style={{ height: 1, width: 80, backgroundColor: "gray" }}
          ></View>
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              marginHorizontal: 24,
              marginTop: 24,
            }}
          >
            Không có voucher!
          </Text>
        </View>
      </ScrollView>
      <View style={{ marginHorizontal: 12 }}>
        <TouchableOpacity
          onPress={handlePromotionPick}
          style={{
            width: "100%",
            paddingVertical: 14,
            backgroundColor: "#FF5D5D",
            position: "absolute",
            bottom: 10,
            left: 0,
            borderRadius: 4,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>
            Lưu
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    flexGrow: 1,
    borderColor: "#EEEEEE",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default PromotionScreen;
