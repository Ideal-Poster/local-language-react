import React, { useEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapSytles from "./mapSytles";
// import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import Search from "./Search";
import api from "../../api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 40.712776,
  lng: -74.005974,
};
const options = {
  styles: mapSytles,
  disableDefaultUI: true,
  zoomControl: true,
};

function Map() {
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      const res = (await api.get("/locations")).data;
      setMarkers(res);
    };
    fetchMarkers();
  }, []);

  const onMapClick = React.useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

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
      <Search />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.created_at}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => setSelected(marker)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <input type="text"></input>
              <p>{selected.created_at}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default Map;
