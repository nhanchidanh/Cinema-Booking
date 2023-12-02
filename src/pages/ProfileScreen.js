import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  RefreshControl,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";

import { useNavigation } from "@react-navigation/native";
import Contex from "../store/Context";
import { SetUserLogin } from "../store/Actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMemberShipById } from "../service/userService";
import { VND } from "../constant";

const data = [
  {
    id: "id00001",
    name: "Gọi đường dây nóng: 19001234",
    iconName: "profile",
  },
  {
    id: "id00002",
    name: "Email: nhanchidanh@gmail.com",
    iconName: "user",
  },
  {
    id: "id00004",
    name: "Thông tin công ty",
    iconName: "lock",
  },
  {
    id: "id00084",
    name: "Điều khoản sử dụng",
    iconName: "back",
  },
  {
    id: "id00005",
    name: "FAQ",
    iconName: "logout",
    onPress: "showModel",
  },
];

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { state, depatch } = useContext(Contex);
  const [refreshing, setRefreshing] = useState(false);
  const [memberShip, setMemberShip] = useState(null);
  const { userLogin } = state;

  const handleLogOut = async () => {
    navigation.navigate("Home");
    depatch(SetUserLogin(null));
    await AsyncStorage.removeItem("user");
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const fetchData = async () => {
    try {
      const val = await getMemberShipById(userLogin?.customer?.id);
      setMemberShip(val);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshing]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1, paddingVertical: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("UpdateProfile")}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          {userLogin?.customer?.image ? (
            <Image
              style={styles.tinyLogo}
              source={{
                uri: userLogin?.customer?.image,
              }}
            />
          ) : (
            <Image
              style={styles.tinyLogo}
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
              }}
            />
          )}
          <View style={{ marginRight: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ width: 20, marginRight: 8, height: 20 }}
                source={{
                  uri: "https://freeiconshop.com/wp-content/uploads/edd/badge-outline-filled.png",
                }}
              />
              <View>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    textTransform: "capitalize",
                  }}
                >
                  {userLogin
                    ? userLogin?.customer?.firstName +
                      " " +
                      userLogin?.customer?.lastName
                    : ""}
                </Text>
                <Text
                  style={{ fontWeight: "600", fontSize: 10, color: "orange" }}
                >
                  {memberShip?.Rank?.nameRank}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ width: 16, marginRight: 8, height: 16, marginTop: 8 }}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKUFdpk0cUspRgRm_T91DFtSY3l4q0FjUQwg&usqp=CAU",
                }}
              />
              <Text style={{ marginTop: 8 }}>
                {memberShip?.currentPoint} điểm
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("UpdateProfile")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRightWidth: 1,
              borderRightColor: "#333",
              paddingRight: 24,
              paddingVertical: 6,
            }}
          >
            <Image
              style={{ width: 16, marginRight: 4, height: 16 }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd7dKAeLk7-c4MMTwDLQhXp-ozUFFQX4E9ZA&usqp=CAU",
              }}
            />

            <Text style={{ fontWeight: "600", fontSize: 14 }}>Thông tin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("TicketBooked")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              marginLeft: 12,
            }}
          >
            <Image
              style={{ width: 16, marginRight: 4, height: 16 }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyNpGIfffEdGdpDGpYCvbZzBwYdMOulmUJ1g&usqp=CAU",
              }}
            />

            <Text style={{ fontWeight: "600", fontSize: 14 }}>Giao dịch</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 4,
            width: "100%",
            backgroundColor: "#EEEEEE",
            marginVertical: 18,
          }}
        ></View>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 16 }}>
              Tổng chi tiêu trong tháng
            </Text>
            <Text style={{ color: "orange", fontSize: 14 }}>
              {VND.format(memberShip?.total_spent)}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 24,
            position: "relative",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={{
                uri: "https://freeiconshop.com/wp-content/uploads/edd/badge-outline-filled.png",
              }}
            />
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: "#576CBC",
                marginVertical: 6,
              }}
            ></View>
            <Text>0đ</Text>
          </View>
          <View
            style={{
              height: 6,
              flexGrow: 1,
              backgroundColor: "#A5D7E8",
              marginTop: 5,
              marginRight: -12,
              marginLeft: -8,
            }}
          ></View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={{
                uri: "https://freeiconshop.com/wp-content/uploads/edd/badge-outline-filled.png",
              }}
            />
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: "#576CBC",
                marginVertical: 6,
              }}
            ></View>
            <Text>100đ</Text>
          </View>
          <View
            style={{
              height: 6,
              flexGrow: 1,
              backgroundColor: "#A5D7E8",
              marginTop: 5,
              marginRight: -12,
              marginLeft: -10,
            }}
          ></View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={{
                uri: "https://freeiconshop.com/wp-content/uploads/edd/badge-outline-filled.png",
              }}
            />
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: "#576CBC",
                marginVertical: 6,
              }}
            ></View>
            <Text style={{ textAlign: "center" }}>200đ</Text>
          </View>
        </View>
        <View
          style={{
            height: 4,
            width: "100%",
            backgroundColor: "#EEEEEE",
            marginVertical: 18,
          }}
        ></View>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          {data.map((val) => {
            return (
              <TouchableOpacity
                key={val?.id}
                style={{
                  flexDirection: "row",
                  paddingVertical: 18,
                  alignItems: "center",
                  borderBottomWidth: 2,
                  borderBottomColor: "#EEEEEE",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "700" }}>{val?.name}</Text>
                <AntDesign style={styles.text_right} name="right" size={16} />
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity onPress={handleLogOut}>
          <Text
            style={{
              color: "orange",
              fontSize: 16,
              fontWeight: "700",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    // backgroundColor: "white",
  },
  tinyLogo: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginRight: 10,
  },
});

export default ProfileScreen;
