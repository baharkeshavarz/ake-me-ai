"use strict"
import axios from "axios"

const API_URL = "https://demoapi.jetvam.ir"

const config = {
  baseURL: API_URL,
  timeout: 5000 * 10,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": API_URL
  }
}

const _axios = axios.create(config);

export default _axios
