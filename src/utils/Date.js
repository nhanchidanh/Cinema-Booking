import { Dimensions } from "react-native";

export const caculatorDay = (dateNumber) => {
  let day = "";
  switch (dateNumber) {
    case 0:
      day = "Chủ nhật";
      break;
    case 1:
      day = "Thứ hai";
      break;
    case 2:
      day = "Thứ ba";
      break;
    case 3:
      day = "Thứ tư";
      break;
    case 4:
      day = "Thứ năm";
      break;
    case 5:
      day = "Thứ sáu";
      break;
    case 6:
      day = "Thứ bảy";
  }

  return day;
};

export const dateFormat = "DD / MM";
export const dateFormatQuery = "YYYY-MM-DD";
export const dateVN = "DD-MM-YYYY";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
