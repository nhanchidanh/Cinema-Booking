const axios = require("axios");
const CryptoJS = require("crypto-js");
const moment = require("moment");
require("dotenv").config();
const qs = require("qs");

const config = {
  app_id: process.env.ZALO_PAY_APP_ID,
  key1: process.env.ZALO_PAY_KEY_1,
  key2: process.env.ZALO_PAY_KEY_2,
  endpoint: process.env.ZALO_PAY_ENDPOINT,
  endpointQuery: process.env.ZALO_PAY_ENDPOINT_QUERY,
};

const embed_data = {
  redirecturl: process.env.REDIRECT_URL,
};
const items = [{}];
class ZaloPayService {
  async payment({ amount }) {
    console.log("amount", amount);
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
      app_user: process.env.ZALO_PAY_APP_USER,
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: Number(amount),
      description: `Thanh toán vé phim ${moment().format("YYMMDD")}_${transID}`,
      title: "Thanh toán vé phim",
    };

    const data =
      config.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;

    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
      const res = await axios.post(config.endpoint, null, { params: order });
      console.log("res.data", res.data);
      return {
        result: res.data,
        appTransId: order.app_trans_id,
        appTime: order.app_time,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getRequsetPaymentStatus({ appTransId, appTime }) {
    const playload = {
      app_id: config.app_id,
      app_trans_id: appTransId,
    };

    const data =
      config.app_id + "|" + playload.app_trans_id + "|" + config.key1;
    playload.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    console.log("playload", playload);

    const postConfig = {
      method: "post",
      url: config.endpointQuery,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(playload),
    };

    try {
      // setInterval( async() => {
      //     const check = await axios(postConfig);
      //     console.log("check.data", check.data);
      // }, 7000)
      const check = await axios(postConfig);
      return {
        status: check.data.return_code,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ZaloPayService();
