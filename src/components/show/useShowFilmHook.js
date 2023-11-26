import moment from "moment";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { getCinemaById } from "../../service/CinemaService";
import { getShow } from "../../service/ShowService";
import Contex from "../../store/Context";
import { caculatorDay, dateFormatQuery, dateVN } from "../../utils/Date";

const useShowFilmHook = (url) => {
  const [loading, setLoading] = useState(false);
  const [dateQuery, setDateQUery] = useState(moment().format(dateFormatQuery));
  const { state, depatch } = useContext(Contex);
  const { booking } = state;
  const [loadding, setLoadding] = useState(true)
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);

  const [datePicked, setPicked] = useState({
    number: 1,
    text: "",
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("LVV");
  const [cinemas, setCinemas] = useState([
    { label: "Tất cả rạp", value: "LVV" },
    // { label: "Cinema LVV", value: "LVV1" },
    // { label: "Cinema LVV", value: "LVV2" },
  ]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const day = caculatorDay(moment().add(0, "days").day());
    const time = moment().add(0, "days").format(dateVN);
    const string = day + ", " + time;
    setPicked({ ...datePicked, text: string });
  }, []);

  useEffect(() => {
    const { film } = booking;
    setLoading(true);
    getShow(film.id, dateQuery)
      .then((data) => {
        // lấy ra các rạp có chiếu bộ phim
        const dataCinema = data?.map((val) => {
          return val.Show.idCinema;
        });
        const dataCinemaUniQue = dataCinema?.filter((val, idx) => {
          return idx === dataCinema.findIndex((v) => val === v);
        });

        Promise.all([
          ...dataCinemaUniQue.map((val) => {
            return getCinemaById(val);
          }),
        ]).then((values) => {
          const dataResult = values.map((val) => {
            const dataFilter = data.filter((item) => {
              return val.id === item.Show.idCinema;
            });

            var now = moment().format(dateFormatQuery);
            const dataFinal = dataFilter.map((val) => {
              if (val?.showDate === now) {
                var cdt = moment(val?.ShowTime?.showTime, "HH:mm");
                const hour = moment().get("hour");
                const minus = moment().get("minute");
                const showHour = cdt.get("hour");
                const showMinus = cdt.get("minute");

                if (showHour < hour) return { ...val, disable: true };
                else if (showHour === hour && showMinus < minus)
                  return { ...val, disable: true };
              }
              return { ...val, disable: false };
            });

            return { name: val?.name, dataFilter: dataFinal };
          });

          setShows(dataResult);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
      })
      .catch(() => {
        alert("System Error!!");
      }).finally(() => setLoadding(false));
  }, [datePicked]);

  return {
    isOpen,
    setIsOpen,
    onClose,
    datePicked,
    setPicked,
    open,
    setOpen,
    value,
    setValue,
    shows,
    cinemas,
    setCinemas,
    setDateQUery,
    loading,
    setLoading,
    loadding
  };
};

export default useShowFilmHook;
