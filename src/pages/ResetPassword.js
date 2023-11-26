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
import { Formik } from "formik";
import SimpleLottie from "../components/loading/CatSleeping";
import { updatePasswordCustomer } from "../service/userService";

export default function ResetPassword({ navigation }) {
  const { state, depatch } = useContext(Contex);
  const { userLogin } = state;

  const handleLogin = async (values) => {
    const { confirmPassword, password } = values;
    if (!confirmPassword || !password) {
      alert("Chưa nhập mật khẩu.");
      return;
    } else if (password !== confirmPassword) {
      alert("Mật khẩu phải trùng nhau.");
      return;
    }

    updatePasswordCustomer(userLogin?.customer?.id, { password })
      .then((data) => {
        navigation.navigate("SignUpSuccessPage", {
          content: "Bạn đã đổi mật khẩu thành công.",
          button: "Về trang chủ",
        });
      })
      .catch((error) => {
        alert("Lỗi đổi mật khẩu. Hãy thử lại sau.");
      });
  };

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
                  marginBottom: 10,
                  textAlign: "center",
                  fontWeight: "400",
                  //color:"#6ECB63"
                }}
              >
                Đổi mật khẩu tài khoản.
              </Text>
            </View>

            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              onSubmit={(values) => handleLogin(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  <View style={styles.viewInput}>
                    <TextInput
                      style={{ paddingLeft: 10, color: "#333" }}
                      placeholder="Password"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      secure={true}
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="newPassword"
                      secureTextEntry
                      enablesReturnKeyAutomatically
                    />
                  </View>
                  <View style={styles.viewInput}>
                    <TextInput
                      style={{ paddingLeft: 10, color: "#333" }}
                      placeholder="Confirm password"
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      secure={true}
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="newPassword"
                      secureTextEntry
                      enablesReturnKeyAutomatically
                    />
                  </View>
                  <View>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                      <Text style={{ color: "white", fontSize: 14 }}>
                        Cập nhật
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
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
    flex: 2,

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
