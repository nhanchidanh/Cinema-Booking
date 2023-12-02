import React, { useContext, useEffect, useState } from "react";
import { getAllSeatByIdHall } from "../../service/HallSeatService";
import {
  createReservationData,
  getReservationData,
} from "../../service/ReservationFetch";
import { getPrice } from "../../service/PriceService";

import Contex from "../../store/Context";
import { useNavigation } from "@react-navigation/native";
import { SetBooking } from "../../store/Actions";

const usePickSeatHook = (url) => {
  const { state, depatch } = useContext(Contex);
  const { booking } = state;

  const { film, show } = booking;

  const navigation = useNavigation();

  const [seats, setSeats] = useState([]);
  const [listPrice, setListPrice] = useState([]);
  const [seatPicked, setSeatPicked] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handlePress = (seat) => {
    if (seat.statusSeat || !seat.status) {
      return;
    }
    const isFound = seatPicked.some((element) => {
      if (element.id === seat.id) {
        return true;
      }
      return false;
    });
    if (isFound) {
      const newArr = seatPicked.filter((val) => {
        if (val?.id != seat?.id) {
          return val;
        }
      });
      setSeatPicked(newArr);
    } else {
      if (seat.Product.typeSeat === 3) {
        //double seat
        //featch price
        const array = listPrice.filter((val) => {
          return val.productName == "Ghế Đôi";
        });
        setSeatPicked([...seatPicked, { ...seat, price: array[0].price }]);
      } else if (seat.Product.typeSeat === 1) {
        const array = listPrice.filter((val) => {
          return val.productName == "Ghế Đơn";
        });
        setSeatPicked([...seatPicked, { ...seat, price: array[0].price }]);
      }
    }
  };

  const handleContinue = () => {
    if (seatPicked.length === 0) {
      alert("Chưa chọn ghế!");
      return;
    }

    depatch(SetBooking({ ...booking, seats: seatPicked }));
    const listSeatId = seatPicked.map((seat) => {
      return seat?.id;
    });
    const dataPayload = {
      showTime_id: show?.id,
      staff_id: 5,
      seats: [...listSeatId],
    };
    createReservationData(dataPayload)
      .then(() => {
        navigation.navigate("PickProducts");
      })
      .catch(() => {
        alert("Lỗi hệ thống - lỗi giữ chỗ");
      });
  };

  useEffect(() => {
    getAllSeatByIdHall(booking?.show?.Show?.idCinemaHall)
      .then((response) => {
        if (response) {
          getReservationData(show?.id)
            .then((result) => {
              const dataClear = result.filter((seat) => {
                return seat?.status === 0;
              });

              const finalSeat = response.map((val) => {
                const searchIndex = dataClear.findIndex(
                  (item) => item.id === val.id
                );
                if (searchIndex != -1) {
                  return { ...val, status: 0 };
                }
                return val;
              });

              setSeats(finalSeat);
            })
            .catch(() => {
              alert("Lỗi hệ thống không lấy được danh sách ghế đã đặt.");
            });
        }
      })
      .catch((err) => {
        alert("Lỗi hệ thốn khi lấy ds ghế!!");
      });

    getPrice().then((data) => {
      setListPrice(data);
    });
  }, []);

  useEffect(() => {
    const sumWithInitial = seatPicked.reduce((total, item) => {
      return item?.price + total;
    }, 0);

    setTotalPrice(sumWithInitial);
  }, [seatPicked]);

  return {
    film,
    show,
    totalPrice,
    seats,
    seatPicked,
    handlePress,
    handleContinue,
  };
};

export default usePickSeatHook;
