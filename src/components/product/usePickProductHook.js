import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { getCinemaById } from "../../service/CinemaService";
import { getProductAndPrice } from "../../service/ProductService";
import { getShow } from "../../service/ShowService";
import Contex from "../../store/Context";
import { caculatorDay, dateFormatQuery, dateVN } from "../../utils/Date";
import { SetBooking } from "../../store/Actions";

const usePickProductHook = () => {
  const { state, depatch } = useContext(Contex);
  const { booking } = state;
  const { seats } = booking;
  const [loadding, setLoadding] = useState(true)
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [pickProducts, setPickProducts] = useState([]);

  const [quality, setQuality] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    
    getProductAndPrice()
      .then((data) => {
        const dataFormat = data.filter(val => {
          return val?.price > 0
        })
        setProducts(dataFormat);
      })
      .catch(() => {
        alert("Lỗi hệ thống khi lấy sản phẩm");
      }).finally(() => setLoadding(false));
  }, []);

  useEffect(() => {
    const sumWithInitial = seats.reduce((total, item) => {
      return item?.price + total;
    }, 0);

    const sumProducts = pickProducts.reduce((total, item) => {
      return item?.price * item?.qty + total;
    }, 0);

    setTotalPrice(sumWithInitial + sumProducts);
  }, [pickProducts]);

  const handleContinue = () => {
    depatch(SetBooking({ ...booking, products: pickProducts }));
    navigation.navigate("BookingPreview");
  };
  return {
    seats,
    products,
    pickProducts,
    setPickProducts,
    quality,
    setQuality,
    totalPrice,
    handleContinue,
    loadding
  };
};

export default usePickProductHook;
