import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import Carousel from "../home/Carousel";
import Contex from "../../store/Context";
import { TouchableOpacity } from "react-native-gesture-handler";

const DetailFilm = () => {
  const { state, depatch } = useContext(Contex);
  const { booking } = state;
  const { film } = booking;
  const [showAll, setShowAll] = useState(false);
  const [arrActor, setArrActor] = useState([]);
  useEffect(() => {
    setArrActor(film?.cast.split(","));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Image
            style={{ height: 250, width: "100%" }}
            source={{
              uri: film?.image
                ? film?.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdMVXZJrkibncovfmQIUqjWgXn27YxQPuzQ&usqp=CAU",
            }}
          />
          <View
            style={{
              paddingHorizontal: 12,
              flexDirection: "row",
              alignItems: "center",
              transform: [{ translateY: -40 }],
            }}
          >
            <Image
              style={{
                height: 130,
                width: 90,
                borderWidth: 1,
                borderColor: "white",
                borderRadius: 6,
              }}
              source={{
                uri: film?.image
                  ? film?.image
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdMVXZJrkibncovfmQIUqjWgXn27YxQPuzQ&usqp=CAU",
              }}
            />
            <View
              style={{ flexDirection: "column", marginLeft: 12, marginTop: 8 }}
            >
              <Text style={{ fontSize: 20, fontWeight: 700 }}>
                {film?.nameMovie?.length > 20
                  ? film?.nameMovie.substring(0, 20) + "..."
                  : film?.nameMovie}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 8,
                }}
              >
                <View
                  style={{
                    width: 40,
                    paddingVertical: 4,
                    borderRadius: 6,
                    backgroundColor: "orange",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "white", fontWeight: "500", fontSize: 12 }}
                  >
                    {film?.classify.substring(0, 3)}
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 8,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      height: 14,
                      width: 14,
                      borderRadius: 100,
                      marginRight: 2,
                    }}
                    source={{
                      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQGe5skDcUpBqiYS8-MdWrYcYZ1bo7E_P8w&usqp=CAU",
                    }}
                  />
                  <Text
                    style={{ color: "gray", fontSize: 13, fontWeight: "400" }}
                  >
                    {film?.duration} phút
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      height: 16,
                      width: 16,
                      borderRadius: 100,
                      marginRight: 2,
                    }}
                    source={{
                      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNJtTD5r-z2y1CxcJFoeSXwezSNZSrPry7Ng&usqp=CAU",
                    }}
                  />
                  <Text
                    style={{ color: "gray", fontSize: 13, fontWeight: "400" }}
                  >
                    {film?.releaseDate.substring(0, 10)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{ paddingHorizontal: 12, transform: [{ translateY: -20 }] }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 6 }}>
              Nội dung
            </Text>
            <View>
              <Text>
                {film?.desc?.length > 250 && showAll
                  ? film?.desc.substring(0, 250) + "..."
                  : film?.desc}
                {film?.desc?.length > 250 && showAll ? (
                  <Text
                    style={{ color: "orange", fontWeight: "500" }}
                    onPress={() => setShowAll(!showAll)}
                  >
                    Xem thêm
                  </Text>
                ) : null}

                {film?.desc?.length > 250 && !showAll ? (
                  <Text
                    style={{ color: "orange", fontWeight: "500" }}
                    onPress={() => setShowAll(!showAll)}
                  >
                    Thu gọn
                  </Text>
                ) : null}
              </Text>
            </View>
          </View>
          <View
            style={{ height: 6, backgroundColor: "#E9E8E8", width: "100%" }}
          ></View>
          <View style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 6 }}>
              Diễn viên
            </Text>
            <View style={{ flexDirection: "row" }}>
              {arrActor.length > 0 &&
                arrActor.map((val) => {
                  return (
                    <View
                      style={{
                        marginRight: 24,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      key={val}
                    >
                      <Image
                        style={{
                          height: 70,
                          width: 70,
                          borderRadius: 100,
                          marginRight: 2,
                          borderWidth: 2,
                          borderColor: "orange",
                        }}
                        source={{
                          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppdqubqczPc8F7aZsqmytuGjaYe5hscxHrQ&usqp=CAU",
                        }}
                      />
                      <Text
                        style={{
                          textAlign: "center",
                          textTransform: "capitalize",
                          fontWeight: "700",
                          marginTop: 8,
                        }}
                      >
                        {val}
                      </Text>
                    </View>
                  );
                })}
            </View>
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
  },
});

export default DetailFilm;
