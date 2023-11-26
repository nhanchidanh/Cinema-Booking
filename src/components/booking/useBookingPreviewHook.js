import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Contex from "../../store/Context";
import {
  SetBooking,
  SetPromotion,
  SetPromotionNotActive,
  SetPromotionWillActive,
} from "../../store/Actions";
import { useContext, useEffect } from "react";
import { checkPromotionCinema } from "../../service/PromotionService";
import { getAllHalls } from "../../service/HallSeatService";
import { createOrderMethod } from "../../service/OrderService";
import { checkStatus, createPayZalo } from "../../service/ZaloService";
import { Link } from "native-base";
import { Linking, Alert } from "react-native";

const useBookingPreviewHook = () => {
  const { state, depatch } = useContext(Contex);
  const { booking, userLogin, promotion, promotionWillActive } = state;
  const { seats, film, products, show } = booking;

  console.log("anhanh", promotionWillActive);
  const navigation = useNavigation();

  const [quality, setQuality] = useState(0);

  const [totalPriceTmp, setTotalPriceTmp] = useState(0);

  const [moneyPromotion, setMoneyPromotion] = useState(0);

  const [dataOrder, setDataOrder] = useState(null);

  const [count, setCount] = useState(0);

  const [reCall, setReCall] = useState(false);
  //const [promotion, setPromotion] = useState([])

  const [cinemaHall, setCinemaHall] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    setLoaddingPayment(false);
  };

  const [selectedId, setSelectedId] = useState(false);

  const [loaddingGetPromotion, setLoaddingGetPromotion] = useState(true);

  const [loaddingPayment, setLoaddingPayment] = useState(false);

  const [dataZalo, setDataZalo] = useState(null);

  useEffect(() => {
    depatch(SetPromotionWillActive([]));
    depatch(SetPromotionNotActive([]));
  }, []);

  // console.log(promotion);
  useEffect(() => {
    const sumWithInitial = seats.reduce((total, item) => {
      return item?.price + total;
    }, 0);

    const sumProducts = products.reduce((total, item) => {
      return item?.price * item?.qty + total;
    }, 0);

    setTotalPriceTmp(sumWithInitial + sumProducts);
  }, [products]);

  const handleContinue = () => {
    depatch(SetBooking({ ...booking, products: pickProducts }));
    navigation.navigate("BookingPreview");
  };

  const handleShowTextSeat = () => {
    const string = seats.map((val) => {
      return val?.seatColumn + val?.seatRow;
    });
    const price = seats.reduce((acc, val) => {
      return acc + val?.price;
    }, 0);
    return {
      text: seats.length + " vé " + string.toString(),
      price,
    };
  };

  const handleCancelOrder = () => {
    setLoaddingPayment(false);
    setReCall(false);
    navigation.navigate("HomePage");
  };
  useEffect(() => {
    const products = seats.map((seat) => {
      return {
        id: seat?.Product?.id,
      };
    });
    const groupByProductId = products.reduce((acc, item) => {
      acc[item.id] = acc[item.id] || [];
      acc[item.id].push(item);
      return acc;
    }, {});
    const productPayLoad = Object.keys(groupByProductId).map((key) => {
      return {
        id: key,
        qty: groupByProductId[key].length,
      };
    });

    const dataPayload = {
      date: booking.show.showDate,
      phone: userLogin?.customer?.phone,
      totalMoney: totalPriceTmp,
      products: productPayLoad,
    };
    setLoaddingGetPromotion(true);
    checkPromotionCinema(dataPayload)
      .then((res) => {
        const data = res.filter((val) => {
          return val?.warning !== true;
        });

        const newData = data.map((val) => {
          return { ...val, isActive: true };
        });

        depatch(SetPromotion(newData));
      })
      .catch((err) => {
        console.log(err);
        alert("Lỗi lấy khuyến mãi");
      })
      .finally(() => {
        setLoaddingGetPromotion(false);
      });
  }, [totalPriceTmp]);

  useEffect(() => {
    const discount = promotion?.reduce((acc, val) => {
      if (val?.isActive) {
        return acc + val?.discount;
      }
      return acc + 0;
    }, 0);
    setMoneyPromotion(discount);
  }, [promotion]);

  useEffect(() => {
    getAllHalls()
      .then((data) => {
        const dataCinemaHall = data.filter((val) => {
          return val?.id === show?.Show?.idCinemaHall;
        });
        setCinemaHall(dataCinemaHall[0]);
      })
      .catch(() => {});
  }, []);

  const handlePayment = () => {
    if (!selectedId) {
      alert("Hãy chọn phương thức thanh toán.");
      return;
    }
    setIsOpen(true);
  };

  const handleCreateOrder = async () => {
    setLoaddingPayment(true);
    const dataSeatPayLoad = seats?.map((seat) => {
      return {
        idSeat: seat?.id,
        idProduct: seat?.Product?.id,
        price: seat?.price,
        qty: 1,
      };
    });
    const dataProductPayLoad = products?.map((product) => {
      return {
        id: product?.id,
        qty: product?.quatity,
        price: product?.price,
      };
    });

    const promotionClear = promotion?.filter((product) => {
      if (product?.promotionCode && product?.isActive) {
        return product;
      }
    });

    const dataPromotionPayLoad = promotionClear?.map((pro) => {
      return {
        promotionLine_id: pro?.promotionLine_id,
        discount: pro?.discount || 0,
      };
    });

    let price = totalPriceTmp - moneyPromotion;

    const dataPayload = {
      idShowMovie: show?.id,
      idCustomer: userLogin?.customer?.id,
      totalPrice: price,
      seats: [...dataSeatPayLoad],
      product_sp: [...dataProductPayLoad],
      promotionApplicalbe: [...dataPromotionPayLoad],
    };
    setDataOrder(dataPayload);
    createPayZalo(price).then((data) => {
      setDataZalo(data);
      setReCall(true);
      setCount(count + 1);
      Linking.openURL(data?.result?.order_url);
      // callBank = setInterval(() => {
      //   checkStatus(data?.appTransId, data?.appTime).then(
      //     (data) => {
      //        console.log(data?.status);
      //       if(data?.status === 1){
      //         createOrderMethod(dataPayload)
      //         .then((data) => {
      //           depatch(SetPromotion([]));
      //           clearInterval(callBank);
      //           navigation.navigate("HomePage");
      //           navigation.navigate("TicketBooked");
      //         })
      //         .catch(() => {});
      //       }else if(data?.status === 2){
      //         alert("Thanh toán thất bại")
      //        clearInterval(callBank)
      //       }
      //     }
      //   );
      // }, 2000);
    });
  };

  const reCallStatus = (appTransId, appTime, dataPayload) => {
    checkStatus(appTransId, appTime).then((data) => {
      console.log(data?.status);
      if (data?.status === 1) {
        createOrderMethod(dataPayload)
          .then((data) => {
            depatch(SetPromotion([]));
            navigation.navigate("HomePage");
            navigation.navigate("TicketBooked");
          })
          .catch(() => {});
      } else if (data?.status === 2) {
        alert("Thanh toán thất bại");
      }
    });
  };
  useEffect(() => {
    //Implementing the setInterval method
    if (reCall) {
      const interval = setInterval(() => {
        reCallStatus(dataZalo?.appTransId, dataZalo?.appTime, dataOrder);
        setCount(count + 1);
      }, 2000);

      //Clearing the interval
      return () => clearInterval(interval);
    }
  }, [count]);

  const handleShowPromotion = () => {
    navigation.navigate("PromotionScreen", { promotion });
  };

  const handleClickZaloPay = () => {
    setSelectedId(!selectedId);
  };

  return {
    seats,
    film,
    products,
    show,
    quality,
    setQuality,
    totalPrice: totalPriceTmp,
    handleContinue,
    handleShowTextSeat,
    moneyPromotion,
    promotion,
    cinemaHall,
    handlePayment,
    isOpen,
    setIsOpen,
    onClose,
    handleCreateOrder,
    selectedId,
    handleShowPromotion,
    setSelectedId,
    handleClickZaloPay,
    loaddingGetPromotion,
    setLoaddingPayment,
    loaddingPayment,
    handleCancelOrder,
  };
};

export default useBookingPreviewHook;
