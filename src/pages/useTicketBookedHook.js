import React, { useContext, useEffect, useState } from "react";
import { getOrderByIdCustomer } from "../service/OrderService";
import Contex from "../store/Context";

const useTicketBookedHook = (url) => {
  const [listTicket, setListTicket] = useState([]);
  const { state, depatch } = useContext(Contex);
  const { booking, userLogin } = state;
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  useEffect(() => {
    getOrderByIdCustomer(userLogin?.customer?.id)
      .then((data) => {
        setListTicket(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userLogin]);

  return { listTicket, refreshing, onRefresh };
};

export default useTicketBookedHook;
