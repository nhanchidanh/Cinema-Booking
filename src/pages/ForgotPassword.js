import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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
import { forgotPasswordHandler } from "../service/userService";

export default function ForgotPassword({ navigation }) {
  const { state, depatch } = useContext(Contex);
  const { userLogin } = state;
  const [loadding, setLoadding] = useState(false);
  const handleLogin = async (values) => {
    const { email } = values;
    if (!email) {
      alert("Chưa nhập email!");
      return;
    } else if (!ValidateEmail(email)) {
      alert("Email không đúng định dạng.");
      return;
    }
    setLoadding(true);
    forgotPasswordHandler({ email: email })
      .then(() => {
        navigation.navigate("SignUpSuccessPage", {
          content:
            " Link đổi mật khẩu đã được gửi vào Email. Vui lòng kiểm tra.",
          button: "Đăng nhập",
        });
      })
      .catch((error) => {
        alert("Email không tồn tại trong hệ thống.");
        console.log(error);
      })
      .finally(() => setLoadding(false));
  };
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }

    return false;
  }
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
                Nhập email để nhận mật khẩu mới.
              </Text>
            </View>
            <Formik
              initialValues={{ email: "" }}
              onSubmit={(values) => handleLogin(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  <View style={styles.viewInput}>
                    <TextInput
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Email"
                      style={{ paddingLeft: 10, color: "#333" }}
                    />
                  </View>

                  <View>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                      <Text style={{ color: "white", fontSize: 18 }}>Gửi</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>

            <View style={styles.recoverPassword}>
              <Text style={{ color: "black" }}>Bạn có tài khoản?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "#519259", marginLeft: 10 }}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {loadding && (
        <View style={styles.screenReload}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  screenReload: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    position: "absolute",
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
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
