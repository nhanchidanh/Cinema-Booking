import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { fetchRevenueByCustomer } from "../../../services/StatitisFetch";
import { SDT_VANG_LAI, VND } from "../../../constant";
import { getCinemas } from "../../../services/CinemaFetch";
import { getCity } from "../../../services/AddressFetch";
import openAddressApi from "../../../api/openApi";
const dateFormat = "YYYY-MM-DD";

const useCustomerComponentHook = () => {
  const [revenues, setRevenues] = useState([]);
  const user = useSelector((state) => state.user);
  const cinema = useSelector((state) => state.cinema);
  const [listCinema, setListCinema] = useState([]);

  const [params, setParams] = useState({
    end_date: moment().format(dateFormat),
    start_date: moment().startOf("month").format(dateFormat),
    cinema_id: "",
    customer_id: "",
  });

  const onChangeDate = (date, dateString) => {
    setParams({
      ...params,
      start_date: dateString[0].replaceAll("/", "-"),
      end_date: dateString[1].replaceAll("/", "-"),
    });
  };

  const onChangeCustomer = (value) => {
    if (value === undefined) {
      setParams({ ...params, customer_id: "" });
      return;
    }
    setParams({ ...params, customer_id: value });
  };

  useEffect(() => {
    console.log(params);
    fetchRevenueByCustomer(params)
      .then(async (data) => {
        if (data.length === 0) {
          setRevenues([]);
        } else {
          const newDate = await Promise.all(
            data.map(async (val, idx) => {
              let ward = await openAddressApi.getWardByCode(
                val?.Customer?.ward_id
              );
              let district = await openAddressApi.getDistrictByCode(
                val?.Customer?.district_id
              );
              let city = await openAddressApi.getProvinceByCode(
                val?.Customer?.city_id
              );

              let address;
              if (val?.Customer?.address !== null) {
                address = `${val?.Customer?.address}, ${ward?.name}, ${district?.name}, ${city?.name}`;
              }
              return {
                ...val,
                createdAt: val?.createdAt.substring(0, 10),
                discount: val?.discount,
                totalDiscount: val?.totalDiscount,
                total: val?.total,
                idCustomer: val?.Customer?.id,
                code: val?.Customer?.code,
                name:
                  val?.Customer?.phone === SDT_VANG_LAI
                    ? "Khách vãng lai"
                    : val?.Customer?.firstName + " " + val?.Customer?.lastName,
                phone: val?.Customer.phone,
                tickets: val?.totalOrder,
                rank: val?.Customer?.Rank?.nameRank,
                city: city?.name?.replace("Thành phố", "") ?? "-",
                district:
                  district?.name
                    ?.replace("Thành phố", "")
                    ?.replace("Quận", "")
                    ?.replace("huyện", "") ?? "-",
                ward: ward?.name?.replace("Phường", "") ?? "-",
                address,
              };
            })
          );
          setRevenues(newDate);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);

  useEffect(() => {
    getCinemas().then((data) => {
      const newDate = data.map((val) => {
        return {
          value: val?.id,
          label: val?.name,
        };
      });
      newDate.push({
        value: "00000",
        label: "Tất cả rạp",
      });

      setListCinema(newDate);
    });
  }, []);

  return {
    revenues,
    onChangeDate,
    listCinema,
    onChangeCustomer,
  };
};

export default useCustomerComponentHook;
