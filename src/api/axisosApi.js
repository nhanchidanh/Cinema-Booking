// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
import { parse, stringify } from "qs";
import { BASE_URL } from "../constant";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
//config` for the full list of configs

const axiosApi = axios.create({
  // baseURL: "http://192.168.1.6:3001",
  baseURL: `${BASE_URL}`,

  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
  // paramsSerializer: (params) => queryString.stringify(params),
});

axiosApi.interceptors.request.use(async (config) => {
  return config;
});

axiosApi.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosApi;
