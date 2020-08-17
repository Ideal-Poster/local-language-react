import React, { useEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import Search from "./Search";
import {
  getLocationsByLanguage,
  postLocation,
  postVisit,
} from "../../requests";
import { libraries, mapContainerStyle, center, options } from "./mapConfig";
import Pin from "./Pin";

const initialState = {
  name: "",
  description: "",
};

function Map(props) {
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [newMarker, setNewMarker] = React.useState(null);
  const [formData, setFormData] = React.useState(initialState);

  useEffect(() => {
    const fetchMarkers = () => {
      getLocationsByLanguage(setMarkers, localStorage.currentLanguage);
    };
    fetchMarkers();
  }, []);

  const visitLocation = () => {
    postVisit(selected, setMarkers, setSelected);
  };

  const onMapClick = React.useCallback((event) => {
    setNewMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
      user_visits: [],
    });
    setSelected(null);
  }, []);

  const submitLocation = async (e) => {
    e.preventDefault();
    await postLocation({ ...newMarker, ...formData }, setMarkers);
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
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) =>
          marker.user_visits.length > 0 ? (
            <Pin
              key={marker.id}
              imageUrl={"/Asset-8.svg"}
              marker={marker}
              setSelected={setSelected}
            />
          ) : (
            <Pin
              key={marker.id}
              imageUrl={"/Asset-3.svg"}
              marker={marker}
              setSelected={setSelected}
            />
          )
        )}

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
                <p>{selected.created_at}</p>
                {selected.user_visits.length > 0 && (
                  <p>
                    you have been here {selected.user_visits.length} time before
                  </p>
                )}
                <button onClick={visitLocation}>Visit</button>
              </>
            ) : (
              <>
                <form>
                  <label htmlFor="name">
                    Name <br />
                    <input onChange={handleChange} type="text" name="name" />
                  </label>
                  <br />
                  <label htmlFor="description">
                    Description <br />
                    <input
                      onChange={handleChange}
                      type="text"
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
