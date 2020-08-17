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
      console.log(res.data);
      if (res.statusText == "OK") callback(res.data);
    })
    .catch(console.log);
};

export const postLocation = (object, callback) => {
  console.log(object);
  api
    .post("/locations", object)
    .then((res) => {
      callback((current) => [...current, res.data]);
    })
    .catch(console.log);
};

export const postVisit = (marker, setMarkers, setSelected) => {
  const updatedMarkersState = (markers, resObj) => {
    markers.map((marker) => {
      if (marker.id == marker.id) {
        const updated_user_visits = (marker.user_visits = [
          ...marker.user_visits,
          resObj,
        ]);
        marker.user_visits = updated_user_visits;
      }
      return marker;
    });
    return markers;
  };

  api
    .post("/visits", marker)
    .then((res) => {
      setMarkers((current) => updatedMarkersState(current, res.data));
    })
    .catch(console.log);
};
