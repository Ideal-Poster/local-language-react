import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  timeout: 5000,
  // headers: {
  // //     Authorization: ''
  // }
});

export const getLocationsByLanguage = (callback, language) => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 1000,
    headers: { currentLanguage: language },
  });

  instance
    .get("/locations_by_language")
    .then((res) => {
      // console.log("data", res.data);
      if (res.statusText === "OK") callback(res.data);
    })
    .catch(console.log());
};

export const postLocation = (object, setMarker, language) => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 1000,
    headers: { currentLanguage: language },
  });

  instance
    .post("/locations", object)
    .then((res) => {
      setMarker((current) => [...current, res.data]);
    })
    .catch(console.log);
};

export const postVisit = (location, setMarkers, setSelected) => {
  const updatedMarkersState = (markers, resData) => {
    console.log(resData);
    markers.map((marker) => {
      if (marker.id === location.id) {
        marker.user_visits = [...marker.user_visits, resData];
      }
      return marker;
    });
    return markers;
  };

  api
    .post("/visits", location)
    .then((res) => {
      // console.log(location);
      setMarkers((current) => updatedMarkersState(current, res.data));
      setSelected(null);
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

export const addLanguageToUser = (object, setUserLanguages) => {
  console.log(object);
  api
    .post("/user_languages", { user_id: 1, language_id: object.id })
    .then((res) => {
      if (res.data.id)
        return setUserLanguages((current) => [...current, res.data]);
      console.log(res);
    })
    .catch(console.log);
};

export const getVisits = (
  setVisit,
  setLocationCount,
  setTopLocations,
  language
) => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 1000,
    headers: { currentLanguage: language },
  });

  instance
    .get("/visits")
    .then((res) => {
      const { visitCount, locationCount, topHangouts } = res.data;
      console.log(res.data);
      setVisit(visitCount);
      setLocationCount(locationCount);
      setTopLocations(topHangouts);
    })
    .catch(console.log);
};
