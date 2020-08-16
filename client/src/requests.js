import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  timeout: 5000,
  // headers: {
  //     Authorization: ''
  // }
});

export const getLocationsByLanguage = (callback) => {
  api
    .get("/locations_by_language")
    .then((res) => {
      if (res.statusText == "OK") callback(res.data);
    })
    .catch(console.log);
};

export const postLocation = (object, callback) => {
  api
    .post("/locations", object)
    .then((res) => {
      callback((current) => [...current, res.data]);
    })
    .catch(console.log);
};
