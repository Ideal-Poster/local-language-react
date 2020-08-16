import mapSytles from "./mapSytles";

export const libraries = ["places"];
export const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
  position: "absolute",
  // right: 0
};
export const center = {
  lat: 40.712776,
  lng: -74.005974,
};
export const options = {
  styles: mapSytles,
  disableDefaultUI: true,
  zoomControl: true,
};
