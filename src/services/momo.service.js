const crypto = require("crypto");
const https = require("https");
require("dotenv").config();
const axios = require("axios");

const URL_PAYMENT = "https://test-payment.momo.vn/v2/gateway/api/create";
const URL_QUERY = "https://test-payment.momo.vn/v2/gateway/api/query";
const URL_REFUND = "https://test-payment.momo.vn/v2/gateway/api/refund";

class MomoPayService {
  async payment({ amount }) {
    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretkey = process.env.MOMO_SECRET_KEY;
    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const orderInfo = "pay with MoMo";
    const redirectUrl = "https://momo.vn/return";
    const ipnUrl = "https://callback.url/notify";
    const requestType = "captureWallet";
    const extraData = "";

    const rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;

    const signature = crypto
      .createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: "en",
    });

    try {
      const res = await axios.post(URL_PAYMENT, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return {
        payUrl: res.data.payUrl,
        requestId: res.data.requestId,
        orderId: res.data.orderId,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getRequsetPaymentStatus({ orderId, requestId }) {
    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretkey = process.env.MOMO_SECRET_KEY;

    const rawSignature =
      "accessKey=" +
      accessKey +
      "&orderId=" +
      orderId +
      "&partnerCode=" +
      partnerCode +
      "&requestId=" +
      requestId;

    const signature = crypto
      .createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      orderId: orderId,
      signature: signature,
      lang: "en",
    });

    try {
      const res = await axios.post(URL_QUERY, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async refund({ amount, description, transId }) {
    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretkey = process.env.MOMO_SECRET_KEY;
    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;

    const rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&description=" +
      description +
      "&orderId=" +
      orderId +
      "&partnerCode=" +
      partnerCode +
      "&requestId=" +
      requestId +
      "&transId=" +
      transId;

    const signature = crypto
      .createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      transId: transId,
      description: description,
      signature: signature,
      lang: "en",
    });

    try {
      const res = await axios.post(URL_REFUND, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MomoPayService();
