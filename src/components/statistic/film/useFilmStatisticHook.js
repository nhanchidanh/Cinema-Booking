import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  fetchRevenueByCustomer,
  fetchRevenueByMovie,
} from "../../../services/StatitisFetch";
import { SDT_VANG_LAI, VND } from "../../../constant";
import { getCinemas } from "../../../services/CinemaFetch";
import { getFilmByCinemaId } from "../../../services/FilmService";
import movieApi from "../../../api/movieApi";
const dateFormat = "YYYY-MM-DD";

const useFilmStatisticHook = () => {
  const [revenues, setRevenues] = useState([]);
  const user = useSelector((state) => state.user);
  const cinema = useSelector((state) => state.cinema);
  const [listMovie, setListMovie] = useState([]);
  const [paramsShow, setParamShow] = useState({
    date: "",
    idMovie: "",
  });
  console.log(paramsShow);
  const [params, setParams] = useState({
    end_date: moment().format(dateFormat),
    start_date: moment().startOf("month").format(dateFormat),
    movie_id: null,
  });
  const onChangeDate = (date, dateString) => {
    console.log(dateString);
    setParams({
      ...params,
      start_date: dateString[0].replaceAll("/", "-"),
      end_date: dateString[1].replaceAll("/", "-"),
    });
  };

  const handleOnChangeMovie = (value) => {
    setParams({
      ...params,
      movie_id: value,
    });
  };

  console.log(revenues);

  useEffect(() => {
    fetchRevenueByMovie(params)
      .then((data) => {
        if (data.length === 0) {
          setRevenues([]);
        } else {
          const newDate = data.map((val, idx) => {
            return {
              ...val,
              createdAt: val?.createdAt.substring(0, 10),
              discount: val?.discount,
              totalDiscount: val?.totalDiscount,
              total: val?.total,
              idMovie: val?.movie?.id,
              codeMovie: val?.movie?.codeMovie,
              name: val?.movie?.nameMovie,
              tickets: val?.count,
            };
          });
          setRevenues(newDate);
        }
      })
      .catch(() => {
        console.log("fetch revunues failed!!");
      });
  }, [params]);

  //Get list movie
  const gettListMovie = async () => {
    try {
      const response = await movieApi.getMovies({
        keyword: "",
        startDate: "",
        endDate: "",
      });
      //set user info
      if (response?.length > 0) {
        //handle data
        const newDate = response.map((val) => {
          return {
            value: val?.id,
            label: val?.nameMovie,
          };
        });

        setListMovie(newDate);
      }
    } catch (error) {
      console.log("Failed to login ", error);
    }
  };

  useEffect(() => {
    gettListMovie();
  }, []);

  return {
    revenues,
    cinema,
    onChangeDate,
    listMovie,
    setParamShow,
    handleOnChangeMovie,
    start_date: params.start_date,
    end_date: params.end_date,
  };
};

export default useFilmStatisticHook;
