import Constants from "expo-constants";
const { manifest2, linkingUri } = Constants;

const v1 = manifest2?.extra?.expoClient?.hostUri
  ?.split(":")
  ?.shift()
  ?.concat(`:3001`);

const v2 = linkingUri?.split(":")[1] + `:3001`;
export const HOST = v1 || v2;

console.log("====================================");
console.log("v1: ", v1);
console.log("v2: ", v2);
console.log("HOST", HOST);
console.log("====================================");

export const BASE_URL = `http://${HOST}`;

export const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export const GHE_DOI = "Ghế Đôi";

export const GHE_THUONG = "Ghế Đơn";
export const SDT_VANG_LAI = "0999999999";
export const MESSAGE_PICK_SEAT = "Hãy chọn ghế.";
export const MESSAGE_UPDATE_SEAT_SUCCESS = "Cập nhật ghế thành công!";
export const MESSAGE_MONEY_INCORRECT = "Tiền khách đưa không hợp lệ.";
export const MESSAGE_CUSTOMER_NOT_FOUND = "Chưa nhập khách hàng.";
export const MESSAGE_NOT_ACCEPT =
  "Hãy hoàn tất giao dịch hoặc hủy để thực hiện chức năng mới.";

export const MESSAGE_PAYMENT_ALERT = {
  type: "payment",
  text: "Bạn muốn thanh toán?",
  buttonContent: "Thanh toán",
};
export const MESSAGE_PAYMENT_LOADDING_ALERT = {
  type: "payment",
  text: "Bạn đang thực hiện thanh toán, bạn muốn hủy?",
  buttonContent: "Hủy thanh toán",
};
export const PayMent = "payment";
