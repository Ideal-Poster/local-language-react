import React, { useEffect } from "react";
import { useLoadScript, GoogleMap, InfoWindow } from "@react-google-maps/api";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
// import Search from "./Search";
import {
  getLocationsByLanguage,
  postLocation,
  postVisit,
} from "../../requests";
import { libraries, mapContainerStyle, center, options } from "./mapConfig";
import Pin from "./Pin";
import { Link } from "react-router-dom";

const initialState = {
  name: "",
  description: "",
};

function Map(props) {
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [newMarker, setNewMarker] = React.useState(null);
  const [formData, setFormData] = React.useState(initialState);
  // const [visited, setVisited] = React.useState(initialState);

  useEffect(() => {
    const fetchMarkers = () => {
      getLocationsByLanguage(setMarkers, localStorage.currentLanguage);
    };
    fetchMarkers();
  }, []);

  const visitLocation = async () => {
    const selectedCopy = selected;
    postVisit(selected, setMarkers, setSelected);
  };

  const onMapClick = React.useCallback(async (event) => {
    const object = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
      user_visits: [],
    };
    setNewMarker(object);
    await setSelected(null);
    setSelected(object);
  }, []);

  const submitLocation = async (e) => {
    e.preventDefault();
    await postLocation(
      { ...newMarker, ...formData },
      setMarkers,
      localStorage.currentLanguage
    );
    setNewMarker(null);
    setSelected(null);
  };

  const handleChange = (e) => {
    setFormData((current) => {
      const object = current;
      object[e.target.name] = e.target.value;
      return object;
    });
  };

  // const chooseMarkerIcon = (marker) => {
  //   let vector = ""
  //   const markersVisitCount = markers.map(mkr => mkr).sort((mkr) => mkr.user_visits.length)
  //   console.log(markersVisitCount);
  //   if (marker.user_visits.length > 0) {

  //   } else if (marker.user_visits.length > 0) {
  //     vector = "/Asset-8.svg"
  //   } else {
  //     vector =  "/Asset-3.svg"
  //   }
  //   return vector
  // }

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => (mapRef.current = map), []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      {/* <Search /> */}

      <Link
        style={{
          position: "absolute",
          zIndex: "100",
          border: "2px solid white",
          padding: "0px 10px 0px 10px",
          margin: "10px 0px 0px 10px",
        }}
        to="/language"
      >
        <h3 id="back"> Back </h3>
      </Link>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Pin
            key={marker.id}
            imageUrl={
              marker.user_visits.length > 0 ? "/Asset-8.svg" : "/Asset-3.svg"
              // chooseMarkerIcon(marker)
            }
            marker={marker}
            setSelected={setSelected}
          />
        ))}

        {newMarker && (
          <Pin
            key={newMarker.id}
            imageUrl={"/Asset-15.svg"}
            marker={newMarker}
            setSelected={setSelected}
            onDragEnd={onMapClick}
            newMarker={true}
          />
        )}

        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
            options={{ pixelOffset: new window.google.maps.Size(0, -50) }}
          >
            {selected.id ? (
              <>
                <p>{selected.name}</p>
                <p>{selected.description}</p>
                <p>
                  created:{" "}
                  {formatRelative(
                    new Date(selected.created_at.split("T")[0]),
                    new Date()
                  )}
                </p>

                {selected.user_visits.length > 0 && (
                  <>
                    <p>
                      You have been here {selected.user_visits.length} time
                      before
                    </p>
                  </>
                )}
                <button onClick={visitLocation}>Visit</button>
              </>
            ) : (
              <>
                <form>
                  <label htmlFor="name">
                    Name <br />
                    <input
                      style={{ width: "200px" }}
                      onChange={handleChange}
                      type="text"
                      name="name"
                    />
                  </label>
                  <br />
                  <label htmlFor="description">
                    Description <br />
                    <input
                      style={{ height: "50px", width: "200px" }}
                      onChange={handleChange}
                      type="text-area"
                      name="description"
                    />
                  </label>
                  <br />
                  <button onClick={submitLocation} type="submit" form="a-form">
                    Submit
                  </button>
                </form>
              </>
            )}
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default Map;
