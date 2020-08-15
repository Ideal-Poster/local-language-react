import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  timeout: 5000,
  // headers: {
  //     Authorization: ''
  // }
});

export const getLocationsByLanguage = async (language) => {
  return (await api.get("/locations_by_language")).data;
};
