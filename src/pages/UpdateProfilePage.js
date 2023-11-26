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
import React, { useContext, useEffect, useState } from "react";
import Contex from "../store/Context";
import { SetUserLogin } from "../store/Actions";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getCustomerById,
  updateInfoCustomerById,
} from "../service/userService";
import * as ImagePicker from "expo-image-picker";
import { storageRef } from "../config/Firebase";

export default function UpdateProfilePage({ navigation: { goBack } }) {
  const { state, depatch } = useContext(Contex);
  const { userLogin } = state;
  const [image, setImage] = useState("");
  const navigation = useNavigation();
  const [onChangeImage, setOnChangeImage] = useState(false);
  const [loadding, setLoadding] = useState(false);
  const handleUpdate = async (values) => {
    const { name } = values;
    if (name.length === 0) {
      alert("Không được để trống.");
      return;
    }
    setLoadding(true);
    if (onChangeImage) {
      const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
      const imageBlob = await getBlobFroUri(image.uri);
      storageRef
        .child(`images/users/${filename}`)
        .put(imageBlob)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
          storageRef
            .child(`images/users/${filename}`)
            .getDownloadURL()
            .then((url) => {
              updateInfoCustomerById(userLogin?.customer?.id, {
                firstName: name,
                image: url,
              })
                .then((data) => {
                  //console.log(data);
                  getCustomerById(userLogin?.customer?.id)
                    .then((data) => {
                      const dataFormat = { customer: data };
                      // console.log(dataFormat);
                      depatch(SetUserLogin(dataFormat));
                      AsyncStorage.setItem("user", JSON.stringify(dataFormat));
                    })
                    .catch((erro) => {
                      console.log(erro);
                    });
                  goBack();
                })
                .catch((erro) => {
                  console.log(erro);
                  alert("Lỗi hệ thống.");
                })
                .finally(() => setLoadding(false));
            });
        });
    } else {
      updateInfoCustomerById(userLogin?.customer?.id, { firstName: name })
        .then((data) => {
          //console.log(data);
          getCustomerById(userLogin?.customer?.id)
            .then((data) => {
              const dataFormat = { customer: data };
              // console.log(dataFormat);
              depatch(SetUserLogin(dataFormat));
              AsyncStorage.setItem("user", JSON.stringify(dataFormat));
            })
            .catch((erro) => {
              console.log(erro);
            });
          goBack();
        })
        .catch((erro) => {
          console.log(erro);
          alert("Lỗi hệ thống.");
        })
        .finally(() => setLoadding(false));
    }
    setOnChangeImage(false);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };
      setImage(source);
      setOnChangeImage(true);
    }
  };

  const getBlobFroUri = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    return blob;
  };

  useEffect(() => {
    if (userLogin?.customer?.image) {
      setImage({ uri: userLogin.customer.image });
    }
  }, []);

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.topView} onPress={() => pickImage()}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri:
                image?.uri ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
            }}
          />
        </TouchableOpacity>

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
            </View>
            <Formik
              initialValues={{
                name:
                  userLogin?.customer?.firstName +
                  " " +
                  userLogin?.customer?.lastName,
                email: userLogin?.customer?.email,
                phone: userLogin?.customer?.phone,
              }}
              onSubmit={(values) => handleUpdate(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  <View style={styles.viewInput}>
                    <TextInput
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      placeholder="Name"
                      style={{ paddingLeft: 10, color: "#333" }}
                    />
                  </View>

                  <View
                    style={[styles.viewInput, { backgroundColor: "#F0ECE3" }]}
                  >
                    <TextInput
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Email"
                      style={{ paddingLeft: 10, color: "#333" }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      selectTextOnFocus={false}
                    />
                  </View>

                  <View
                    style={[styles.viewInput, { backgroundColor: "#F0ECE3" }]}
                  >
                    <TextInput
                      style={{ paddingLeft: 10, color: "#333" }}
                      placeholder="Phone"
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                      underlineColorAndroid="transparent"
                      editable={false}
                      selectTextOnFocus={false}
                    />
                  </View>
                  <View>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                      <Text style={{ color: "white", fontSize: 16 }}>
                        Cập Nhật
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>

            <TouchableOpacity
              style={styles.recoverPassword}
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text style={{ color: "black" }}>Đổi mật khẩu ?</Text>
            </TouchableOpacity>
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
    flex: 2.5,

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
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "orange",
  },
});
