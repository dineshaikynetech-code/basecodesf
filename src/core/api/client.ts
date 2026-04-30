import axios from "axios"

export const api = axios.create({
  baseURL: "/storefriesapi", // real API in next version
  timeout: 5000,
})