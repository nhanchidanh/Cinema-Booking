import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import Carousel from "../components/home/Carousel";
import HomeFilm from "../components/home/HomeFilm";
import TicketComponent from "../components/tickets/TicketComponent";
import useTicketBookedHook from "./useTicketBookedHook";
import { useContext } from "react";
import Contex from "../store/Context";
import EmptyData from "../components/loading/EmptyData";

const TicketBooked = () => {
  const { listTicket, refreshing, onRefresh } = useTicketBookedHook();
  const { state, depatch } = useContext(Contex);
  const { booking, userLogin } = state;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text
          style={{
            fontSize: 10,
            fontWeight: "400",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Lưu ý: Chỉ hiển thị 20 giao dịch gần nhất
        </Text>
        {listTicket.length === 0 ? (
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
            {listTicket.map((val) => {
              return <TicketComponent key={val?.id} item={val} />;
            })}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  scrollView: {},
});

export default TicketBooked;
