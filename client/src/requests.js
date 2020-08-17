import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  timeout: 5000,
  // headers: {
  // //     Authorization: ''
  //   currentLanguage: localStorage.currentLanguage
  // }
});

export const getLocationsByLanguage = (callback, language) => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 1000,
    headers: { currentLanguage: language },
  });

  // console.log("prop",language);
  instance
    .get("/locations_by_language")
    .then((res) => {
      console.log("data", res.data);
      if (res.statusText == "OK") callback(res.data);
    })
    .catch(console.log());

  // api
  //   .get("/locations_by_language")
  //   .then((res) => {
  //     // console.log(res.data);
  //     if (res.statusText == "OK") callback(res.data);
  //   })
  //   .catch(console.log);
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

export const postVisit = (location, setMarkers, setMarker) => {
  const updatedMarkersState = (markers, resData) => {
    markers.map((marker) => {
      if (marker.id == location.id) {
        // const updated_user_visits = (marker.user_visits = [...marker.user_visits, resObj ]);
        // marker.user_visits = updated_user_visits;
        marker.user_visits = [...marker.user_visits, resData];
      }
      return marker;
    });
    return markers;
  };

  api
    .post("/visits", location)
    .then((res) => {
      console.log(res.data);
      setMarkers((current) => updatedMarkersState(current, res.data));
      setMarker(location);
    })
    .catch(console.log);
};

export const getUserLanguages = (callback) => {
  api
    .get("/user_languages")
    .then((res) => {
      callback(res.data);
      // console.log(res.data);
    })
    .catch(console.log);
};

export const getLanguages = (callback) => {
  api
    .get("/languages")
    .then((res) => {
      callback(res.data);
      // console.log(res.data);
    })
    .catch(console.log);
};

export const addLanguageToUser = (object, callback) => {
  api
    .post("/user_languages", { user_id: 1, language_id: object.id })
    .then((res) => callback((current) => [...current, res.data]));
};
