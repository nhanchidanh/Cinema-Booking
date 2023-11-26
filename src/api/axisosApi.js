// api/axiosClient.js
import axios from "axios";
import { parse, stringify } from "qs";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
//config` for the full list of configs

const axiosApi = axios.create({
  baseURL: "http://localhost:3001",
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
