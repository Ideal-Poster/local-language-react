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
import { getAllLocations, getLocationsByLanguage } from "../../requests";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
  // position: "absolute",
  // right: 0
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
  const [newMarker, setNewMarker] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

  const chineseLocations = async () => {
    const locations = await getLocationsByLanguage();
    setMarkers(locations);
  };

  useEffect(() => {
    const fetchMarkers = async () => {
      const res = await getAllLocations();
      console.log(res);
      setMarkers(res);
    };
    fetchMarkers();
  }, []);

  const onMapClick = React.useCallback((event) => {
    setNewMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    });
    setSelected(null);
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
      {/* <Search /> */}
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

        {newMarker && (
          <Marker
            key={newMarker.created_at}
            position={{ lat: newMarker.lat, lng: newMarker.lng }}
            draggable={true}
            onDragEnd={onMapClick}
            icon={{
              url: `/stencil.png`,
              origin: new window.google.maps.Point(0, 0),
              scaledSize: new window.google.maps.Size(120, 50),
            }}
            // onClick={() => setSelected(new)}
          />
        )}

        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <p>{selected.name}</p>
              <p>{selected.description}</p>
              <p>{selected.created_at}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default Map;
