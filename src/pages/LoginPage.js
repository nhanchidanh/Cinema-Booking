import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
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

const imageUrl =
  "https://www.galaxycine.vn/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fgalaxy-logo-mobile.074abeac.png&w=128&q=75";

export default function Login({ navigation }) {
  const { state, depatch } = useContext(Contex);
  const { userLogin } = state;

  const handleLogin = async (values) => {
    const { email, password } = values;
    if (!email || !password) {
      Alert.alert("Thông báo", "Chưa nhập tài khoản hoặc mật khẩu!");
      return;
    }
    await userApi
      .login(email, password)
      .then((user) => {
        navigation.navigate("Home");
        depatch(SetUserLogin(user.data));
        AsyncStorage.setItem("user", JSON.stringify(user.data));
      })
      .catch((error) => {
        if (error?.response?.data?.message === "Account is not activated") {
          Alert.alert(
            "Thông báo",
            "Tài khoản chưa được xác minh. Hãy kiểm tra email."
          );
        } else if (
          error?.response?.data?.message === "Password is not correct"
        ) {
          // alert(error?.response?.data?.message);
          Alert.alert("Thông báo", " Tài khoản hoặc mật khẩu không chính xác");
        }
        // alert("Tài khoản hoặc mật khẩu sai!!")
      });
  };

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={styles.topView}>
          {/* <SimpleLottie /> */}
          <Image source={{ uri: imageUrl }} style={styles.image} />
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
                Đăng Nhập Tài khoản
              </Text>
            </View>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => handleLogin(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  <View style={styles.viewInput}>
                    <TextInput
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Tài khoản"
                      style={{ paddingLeft: 10, color: "#333" }}
                    />
                  </View>

                  <View style={styles.viewInput}>
                    <TextInput
                      style={{ paddingLeft: 10, color: "#333" }}
                      placeholder="Mật khẩu"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      secure={true}
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="password"
                      secureTextEntry
                      enablesReturnKeyAutomatically
                    />
                  </View>
                  <View>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                      <Text style={{ color: "white", fontSize: 18 }}>
                        Đăng Nhập
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>

            <View style={styles.recoverPassword}>
              <Text style={{ color: "black" }}>Bạn chưa có tài khoản?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={{ color: "#519259", marginLeft: 10 }}>
                  Đăng Ký
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={{ color: "#333", marginLeft: 10, color: "green" }}
            onPress={() => navigation.navigate("Forgot")}
          >
            Quên mật khẩu
          </Text>
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
  image: {
    width: 200, // Đặt chiều rộng theo nhu cầu của bạn
    height: 150, // Đặt chiều cao theo nhu cầu của bạn
    objectFit: "contain",
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
