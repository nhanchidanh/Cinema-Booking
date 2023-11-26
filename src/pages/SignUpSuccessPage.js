import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import Contex from "../store/Context";
import { SetUserLogin } from "../store/Actions";
import { Formik } from "formik";
import userApi from "../api/userApi";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SimpleLottie from "../components/loading/CatSleeping";

const imageUrl = "https://images.unsplash.com/photo-1526045612212-70caf35c14df";

export default function SignUpSuccessPage({ route, navigation: { goBack } }) {
  const { state, depatch } = useContext(Contex);
  const { userLogin } = state;
  const { content, button } = route.params;
  //const navigation = useNavigation()

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={styles.topView}>
          <SimpleLottie />
        </View>

        <View style={styles.downView}>
          <View style={styles.input}>
            <View
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 26,

                  marginBottom: 10,
                  textAlign: "center",
                  fontWeight: "700",
                  //color:"#6ECB63"
                }}
              >
                Galaxy Cinema
              </Text>
              <Text
                style={{
                  fontSize: 14,

                  marginBottom: 20,
                  marginTop: 20,
                  textAlign: "center",
                  fontWeight: "400",
                  //color:"#6ECB63"
                }}
              >
                {content
                  ? content
                  : " Bạn đã đăng ký tài khoản thành công. Vui lòng check mail để mở tài khoản."}
              </Text>
            </View>

            <View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => goBack("Login")}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  {button ? button : " Đăng ký tiếp"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"red"
  },
  downView: {
    flex: 1.5,

    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 16,
  },

  input: {
    width: "80%",
    justifyContent: "center",
  },
  viewInput: {
    height: 50,
    marginBottom: 20,
    // backgroundColor: "black",
    //borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    borderRadius: 5,
    // color: "white",
  },

  btn: {
    height: 50,
    marginBottom: 10,
    backgroundColor: "#519259",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  recoverPassword: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  downMore: {
    flex: 1,
  },
  btnRegister: {
    paddingTop: 12,
    paddingBottom: 12,
    //borderColor: "white",
  },
});
