import React, { useEffect, useState } from "react";
import { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Contex from "../../store/Context";
import { SetPromotion, SetPromotionNotActive, SetPromotionWillActive } from "../../store/Actions";

const PromotionCard = ({ item }) => {
  const [activeCheckBox, setActiveCheckBox] = useState(item?.isActive);
  const { state, depatch } = useContext(Contex);
  const {promotionNotActive, promotionWillActive } = state;
  
  const handleClick = () => {
    if(activeCheckBox && item?.isActive){
      depatch(SetPromotionNotActive([...promotionNotActive, item]))
    } else if(!activeCheckBox && item?.isActive) {
      const data = promotionNotActive.filter(val => {
        return val?.promotionCode !== item?.promotionCode
      })
      depatch(SetPromotionNotActive(data))
    }

    if(activeCheckBox === false && !item?.isActive){
      const arr = [...promotionNotActive, item]
      const dataUnique = arr.filter( (val, idx) => {
        return idx === arr.findIndex(v => val.promotionCode ===v.promotionCode)
      })
      depatch(SetPromotionWillActive(dataUnique))
    } else if(activeCheckBox && !item?.isActive) {
      const data = promotionWillActive.filter(val => {
        return val?.promotionCode !== item?.promotionCode
      })
      depatch(SetPromotionWillActive(data))
    }
    setActiveCheckBox(!activeCheckBox);
  };

  useEffect(() => {
    if(promotionWillActive.length > 0){
      setActiveCheckBox(!activeCheckBox)
    }
    const index = promotionNotActive.findIndex((element) => {
      if (element?.promotionCode === item?.promotionCode) {
        return true;
      }
      return false;
    });
    if(index != -1) {
      setActiveCheckBox(false)
    }
  }, [])

  return (
    <TouchableOpacity
      onPress={handleClick}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 12,
          borderRadius: 8,
          backgroundColor: "#F9F9F9",
        },
        styles.shadowProp,
      ]}
    >
      <Image
        style={{
          width: 110,
          height: 110,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          marginRight: 12,
        }}
        source={{
          uri: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQmSUjbcA_Z0jgBrAcXMYbQHHJyA61K5v01mSZb67NtpMp4ANGi",
        }}
      />
      <View style={{ width: 250, position: "relative" }}>
        <View>
          <Text
            style={{
              fontSize: 14,
              width: "70%",
              fontWeight: "600",
              marginBottom: 12,
            }}
          >
            {item?.message}
          </Text>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <View
              style={{
                backgroundColor: "orange",
                width: 40,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "500",
                  fontSize:10,
                  textAlign: "center",
                }}
              >
               #{item?.promotionCode}
              </Text>
            </View>
            <Text
              style={{
                color: "gray",
                marginLeft:4,
                fontSize:10
              }}
            >
             Giảm: {item?.discount} đ
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 20,
            position: "absolute",
            right: 0,
            top: "25%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 20,
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 100,
          }}
        >
          {activeCheckBox ? (
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 100,
                backgroundColor: "gray",
              }}
            ></View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  scrollView: {
    height: 30,
  },
});

export default React.memo(PromotionCard);
