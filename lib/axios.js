import axios from "axios"

export const API_URL = "http://10.1.10.170:8000"

const config = {
  baseURL: API_URL,
  timeout: 5000 * 10,
  headers: {
    "Access-Control-Allow-Credentials": false,
    "Content-Type": "plain/text; charset=utf-8",
    // "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": "*"
  }
}

const _axios = axios.create(config);

export default _axios
