import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getVisits } from "../requests";

function LanguagePage() {
  const [visits, setVisit] = React.useState([]);
  const [locationCount, setLocationCount] = React.useState(0);
  const [topLocations, setTopLocations] = React.useState([]);

  useEffect(() => {
    const fetchVisits = async () => {
      getVisits(setVisit, setLocationCount, setTopLocations);
    };
    fetchVisits();
  }, []);

  return (
    <div>
      <h2>Stats</h2>
      <h3>{localStorage.currentLanguage}</h3>

      <h3>You have visited {visits} total loactions</h3>

      <p>You have been {locationCount} different locations</p>
      <h3>Top Locations</h3>
      {topLocations.map((location) => (
        <p>{location.name}</p>
      ))}
      <Link to="/map">
        <button>Map</button>
      </Link>
    </div>
  );
}

export default LanguagePage;
