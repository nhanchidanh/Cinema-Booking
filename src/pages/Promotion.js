import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import EmptyData from "../components/loading/EmptyData";
import { getPromotionActive } from "../service/PromotionService";
import PromotionCard from "./PromotionCard";

const Promotion = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [listPromotion, setListPromotion] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setListPromotion([]);
    setTimeout(() => {
      getPromotionActive()
        .then((data) => {
          setListPromotion(data);
        })
        .catch((erro) => {
          alert("Lỗi mạng.");
        })
        .finally(() => {
          setRefreshing(false);
        });
    }, 300);
  }, []);

  useEffect(() => {
    getPromotionActive()
      .then((data) => {
        setListPromotion(data);
      })
      .catch((erro) => {
        alert("Lỗi mạng.");
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.time}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "400",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Các chương trình khuyến mãi
          </Text>
        </View>
        {listPromotion?.length === 0 ? (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 500,
            }}
          >
            <EmptyData />
            <Text>Không có dữ liệu</Text>
          </View>
        ) : (
          <>
            {listPromotion.length > 0 &&
              listPromotion.map((item) => {
                return <PromotionCard item={item} key={Math.random()} />;
              })}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
    // backgroundColor: "#DDDDDD",
  },
  time: {
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

export default Promotion;
