import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { VND } from "../constant";

const TicketDetails = ({ route, navigation }) => {
  const { item } = route.params;

  const seatString = item?.OrderDetails?.map((val) => {
    if (val?.type === 1) {
      return val?.CinemaHallSeat?.seatColumn + val?.CinemaHallSeat?.seatRow;
    }
    return "";
  });
  const priceProduct = item?.OrderDetails?.filter((val) => {
    return val?.type === 2;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <View style={{ marginRight: 12 }}>
            <Image
              style={{
                width: 95,
                height: 130,
                borderRadius: 6,
                marginTop: 8,
              }}
              source={{
                uri: item?.ShowMovie?.Show?.Movie?.image
                  ? item?.ShowMovie?.Show?.Movie?.image
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdMVXZJrkibncovfmQIUqjWgXn27YxQPuzQ&usqp=CAU",
              }}
            />
          </View>
          <View
            style={{
              paddingVertical: 12,
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              flex: 1,
            }}
          >
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {item?.ShowMovie?.Show?.Movie?.nameMovie}
              </Text>
              <Text
                style={{ fontSize: 14, fontWeight: "400", marginVertical: 6 }}
              >
                {item?.ShowMovie?.Show?.Cinema?.name} -{" "}
                {item?.ShowMovie?.Show?.CinemaHall?.name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  marginBottom: 6,
                }}
              >
                {item?.ShowMovie?.Show?.Cinema?.address}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                {item?.ShowMovie?.ShowTime?.showTime} -{" "}
                {item?.ShowMovie?.showDate}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  marginTop: 6,
                }}
              >
                Ghế:{" "}
                <Text
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "500",
                    fontSize: 14,
                  }}
                >
                  {seatString.toString()}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginVertical: 24 }}>
          <View
            style={{
              marginBottom: 12,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "500" }}>Mã vé:</Text>
            <Text style={{ fontSize: 14, fontWeight: "500" }}>#{item?.id}</Text>
          </View>
          <View
            style={{
              marginBottom: 12,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "500" }}>Giá vé:</Text>
            <Text style={{ fontSize: 14, fontWeight: "500" }}>
              {VND.format(+(item?.totalPrice + item?.totalDiscount))}
            </Text>
          </View>
          <View
            style={{
              marginBottom: 12,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "500" }}>Khuyến mãi:</Text>
            <Text style={{ fontSize: 14, fontWeight: "500" }}>
              -{VND.format(item?.totalDiscount)}
            </Text>
          </View>
          <View
            style={{
              marginBottom: 12,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "500" }}>Thanh toán:</Text>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#62CDFF" }}>
              {item?.paymentMethod === 0 ? "Tại quầy" : "ZaloPay"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "500" }}>Tổng:</Text>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "orange" }}>
              {VND.format(+item?.totalPrice)}
            </Text>
          </View>
          <Text style={{ fontSize: 12, fontWeight: "400", marginVertical: 12 }}>
            Hãy đưa mã vé hoặc màn hình vé để nhận vé tại quầy giao dịch!
          </Text>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <QRCode value={item?.id.toString()} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

export default TicketDetails;
