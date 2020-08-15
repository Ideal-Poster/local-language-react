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
import { getLocationsByLanguage, getVisitedLocations } from "../../requests";
import { libraries, mapContainerStyle, center, options } from "./MapConfig";

function Map() {
  const [markers, setMarkers] = React.useState([]);
  const [visitedMarkers, setVisitedMarkers] = React.useState([]);
  const [newMarker, setNewMarker] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      const res = await getLocationsByLanguage();
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
      <button onClick={() => console.log(selected.description)}>Hello</button>
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
            <Marker
              key={marker.created_at}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setSelected(marker)}
              icon={{
                url: `/Asset-8.svg`,
                origin: new window.google.maps.Point(0, 0),
                scaledSize: new window.google.maps.Size(25, 45),
              }}
            />
          ) : (
            <Marker
              key={marker.created_at}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setSelected(marker)}
              icon={{
                url: `/Asset-3.svg`,
                origin: new window.google.maps.Point(0, 0),
                scaledSize: new window.google.maps.Size(25, 45),
              }}
            />
          )
        )}

        {newMarker && (
          <Marker
            key={newMarker.created_at}
            position={{ lat: newMarker.lat, lng: newMarker.lng }}
            draggable={true}
            onDragEnd={onMapClick}
            icon={{
              url: `/Asset-15.svg`,
              origin: new window.google.maps.Point(0, 0),
              scaledSize: new window.google.maps.Size(25, 45),
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
              {selected.user_visits.length > 0 && (
                <p>
                  you have been here {selected.user_visits.length} time before
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default Map;
