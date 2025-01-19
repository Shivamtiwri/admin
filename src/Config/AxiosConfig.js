import axios from 'axios';

export const baseURL = 'http://localhost:4000/user';
// export const baseURL = "https://ezzogame.igtglobal.io/";
// export const baseURL = "https://ezzotest.igtglobal.io/";

const AxiosConfig = axios.create({
  baseURL: baseURL,
});

AxiosConfig.interceptors.request.use(
  config => {
    config.headers = {
      //   "x-api-key": "3cfbcf074af44acfa1a40270e63f26aa",

      ...config.headers,
    };
    return config;
  },
  err => Promise.reject(err),
);

export default AxiosConfig;
