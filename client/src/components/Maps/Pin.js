import React from "react";
import { Marker } from "@react-google-maps/api";

function Pin(props) {
  const { marker, imageUrl, setSelected, newMarker, onDragEnd } = props;
  if (!newMarker) {
    return (
      <Marker
        key={marker.created_at}
        position={{ lat: marker.lat, lng: marker.lng }}
        onClick={() => setSelected(marker)}
        icon={{
          url: imageUrl,
          origin: new window.google.maps.Point(0, 0),
          scaledSize: new window.google.maps.Size(25, 45),
        }}
      />
    );
  } else {
    return (
      <Marker
        key={marker.created_at}
        position={{ lat: marker.lat, lng: marker.lng }}
        draggable={true}
        onDragEnd={onDragEnd}
        onClick={() => setSelected(marker)}
        icon={{
          url: imageUrl,
          origin: new window.google.maps.Point(0, 0),
          scaledSize: new window.google.maps.Size(25, 45),
        }}
      />
    );
  }
}

export default Pin;
