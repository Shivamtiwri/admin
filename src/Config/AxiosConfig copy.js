import axios from 'axios';

export const baseURL = 'http://localhost:4000/admin';

const AxiosConfigadmin = axios.create({
  baseURL: baseURL,
});
const token = localStorage.getItem('token');
AxiosConfigadmin.interceptors.request.use(
  config => {
    config.headers = {
      //   "x-api-key": "3cfbcf074af44acfa1a40270e63f26aa",
      ...config.headers,
      authorization: `Bearer ${token}`,
    };
    return config;
  },
  err => Promise.reject(err),
);

export default AxiosConfigadmin;
