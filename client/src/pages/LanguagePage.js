import React from "react";
import { Link } from "react-router-dom";

function LanguagePage() {
  return (
    <div>
      <h2>Stats</h2>
      <Link to="/map">
        <button>Map</button>
      </Link>
    </div>
  );
}

export default LanguagePage;
