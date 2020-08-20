import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getVisits } from "../requests";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./LanguagePage.css";
import { formatRelative } from "date-fns";

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
            <h3>You have a total of {visits} visits</h3>
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
            {topLocations.map((location) => {
              console.log(location);
              return (
                <div
                  style={{
                    border: "1px solid white",
                    paddingTop: "15px",
                    paddingLeft: "15px",
                  }}
                >
                  <p>{location.name}</p>
                  <p>
                    {" "}
                    Last visit:{" "}
                    {formatRelative(
                      new Date(location.updated_at.slice(0, 19)),
                      new Date()
                    )}
                  </p>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LanguagePage;
