import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Button, TouchableOpacity } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { colorConst } from "../../utils/Color";
import { SetBooking } from "../../store/Actions";
import Contex from "../../store/Context";

const useDropListHook = ({ idx, status, show, setIsOpen }) => {
  const { state, depatch } = useContext(Contex);
  const { booking, userLogin } = state;

  const navigation = useNavigation();


  const [showComponent, setShowComponent] = useState({
    idx: 0,
    status: true,
  });
  const handleShowList = () => {
    setShowComponent({
      idx: idx,
      status: true,
    });
  };
  const { dataFilter } = show;

  const handleClick = (value) => {
    if(userLogin){
      navigation.navigate("PickSeatScreen");
      depatch(SetBooking({ ...booking, show: value }));

    }else{
      setIsOpen(true)
    }
  };

  return {
    showComponent,
    setShowComponent,
    handleShowList,
    handleClick,
    dataFilter,
  };
};

export default useDropListHook;
