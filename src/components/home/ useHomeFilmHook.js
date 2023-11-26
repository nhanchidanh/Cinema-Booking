import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { useEffect } from "react";
import movieApi from "../../api/movieApi";
import { getFilmById } from "../../service/FilmService";
import { SetBooking } from "../../store/Actions";
import Contex from "../../store/Context";
const useHomeFilmHook = (url) => {
  const [items, setItems] = React.useState([]);
  const { state, depatch } = useContext(Contex);

  const navigation = useNavigation();
  useEffect(() => {
    const getFilms = async () => {
      const data = await movieApi.getMovieByType(1);
      setItems(data);
    };
    getFilms();
  }, []);

  const handleOnpress = (id) => {
    getFilmById(id)
      .then((data) => {
        depatch(SetBooking({ film: data }));
        navigation.navigate("FilmDetail", { id });
      })
      .catch((erro) => {
        alert("Lỗi lấy thông tin Film");
      });
  };

  return {
    items,
    handleOnpress,
  };
};

export default useHomeFilmHook;
