import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { VND } from "../../constant";

const TicketComponent = ({ item }) => {
  const navigation = useNavigation();
  var date = new Date(item?.createdAt);
  return (
    <TouchableOpacity
      key={item}
      style={styles.container}
      onPress={() => navigation.navigate("TicketDetails", { item })}
    >
      <View style={{ marginRight: 12 }}>
        <Image
          style={{
            width: 120,
            height: "100%",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
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
        }}
      >
        <View>
          <Text style={{ fontSize: 14, fontWeight: "500" }}>
            {item?.ShowMovie?.Show?.Movie?.nameMovie?.length > 30
              ? item?.ShowMovie?.Show?.Movie?.nameMovie.substring(0, 25) + "..."
              : item?.ShowMovie?.Show?.Movie?.nameMovie}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "400", marginVertical: 6 }}>
            {item?.ShowMovie?.Show?.Cinema?.name} -{" "}
            {item?.ShowMovie?.Show?.CinemaHall?.name}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "400" }}>
            {item?.ShowMovie?.ShowTime?.showTime} - {item?.ShowMovie?.showDate}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "400", paddingVertical: 4 }}>
            Tổng tiền:{" "}
            <Text style={{ color: "green", marginLeft: 10 }}>
              {VND.format(+item?.totalPrice)}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#146C94",
              fontWeight: "400",
              textAlign: "left",
              marginLeft: 0,
            }}
          >
            Ngày đặt: {date.toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 20,
  },
});

export default TicketComponent;
