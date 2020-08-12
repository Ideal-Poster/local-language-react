import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  timeout: 5000,
  // headers: {
  //     Authorization: 'Client-ID 74a2c2a5faba167281d63307340fdff8925b30337319ec1e95471ab93ebea12b'
  // }
});

export default api;
