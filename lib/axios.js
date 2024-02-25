import axios from "axios";

// export const API_URL = "http://10.1.10.170:8000"
export const API_URL = "https://aichat.sls.ir:8000";
// export const API_URL = "http://217.218.99.11:8000"

const config = {
  baseURL: API_URL,
  timeout: 300 * 1000, //5 mins
  headers: {
    // "Access-Control-Allow-Credentials": false,
    "Content-Type": "plain/text; charset=utf-8",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": "*",
  },
};

const _axios = axios.create(config);

export default _axios;
