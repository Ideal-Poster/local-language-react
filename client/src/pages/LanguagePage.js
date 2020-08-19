import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getVisits } from "../requests";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./LanguagePage.css";

function LanguagePage() {
  const [visits, setVisit] = React.useState([]);
  const [locationCount, setLocationCount] = React.useState(0);
  const [topLocations, setTopLocations] = React.useState([]);

  useEffect(() => {
    const fetchVisits = async () => {
      getVisits(
        setVisit,
        setLocationCount,
        setTopLocations,
        localStorage.currentLanguage
      );
    };
    fetchVisits();
  }, []);

  return (
    <div style={{ color: "white" }}>
      <div className="background"></div>
      <Container>
        <Row xs={12}>
          <Col>
            <h2>Stats</h2>
            <h1>{localStorage.currentLanguage}</h1>
            <h3>You have visited {visits} total loactions</h3>
            <h3>You have been {locationCount} different locations</h3>
            <Row>
              <Col>
                <Link to="/">
                  <h4 className="route-link">Select Language</h4>
                </Link>
              </Col>
              <Col>
                <Link to="/map">
                  <h4 className="route-link">Map</h4>
                </Link>
              </Col>
            </Row>
          </Col>
          <Col>
            <h3 style={{ marginTop: "30px" }}>Top Locations</h3>
            {topLocations.map((location) => (
              <p>{location.name}</p>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LanguagePage;
