import React, { useEffect } from "react";
import { getUserLanguages, getLanguages, addLanguageToUser } from "../requests";
import { Link } from "react-router-dom";
// import LanguagePage from "./LanguagePage";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./LanguagePage.css";

function SelectLanguagePage(props) {
  const [userLanguages, setUserLanguages] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);
  const [selection, setSelection] = React.useState(null);

  useEffect(() => {
    getUserLanguages(setUserLanguages);
    getLanguages(setLanguages);
  }, []);

  return (
    <div style={{ color: "white" }}>
      <div className="background"></div>
      <h4>Local Language</h4>
      <Container>
        <Row>
          <Col>
            <h3 style={{ marginTop: "160px" }}>Select a language</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={9}>
            <Row>
              {userLanguages.map((language) => {
                return selection === language.name ? (
                  <Col xs={4}>
                    <h2
                      className="user-languages"
                      style={{ color: "#f0ad1c" }}
                      onClick={() => setSelection(language.name)}
                    >
                      {language.name}
                    </h2>
                  </Col>
                ) : (
                  <Col xs={4}>
                    <h2
                      className="user-languages"
                      onClick={() => setSelection(language.name)}
                    >
                      {language.name}
                    </h2>
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col>
            <div style={{ height: "200px" }}>
              {selection ? (
                <Link to="/language">
                  <div
                    style={{
                      height: "200px",
                      width: "200px",
                      background: "#f0ad1c",
                      borderRadius: "100px",
                    }}
                    onClick={() =>
                      localStorage.setItem("currentLanguage", selection)
                    }
                  >
                    <h3
                      style={{
                        color: "#282c2d",
                        height: "150px",
                        textAlign: "center",
                        transform: "translateY(50%)",
                      }}
                    >
                      enter
                    </h3>
                  </div>
                </Link>
              ) : (
                // <Link to="/language">
                <div
                  style={{
                    height: "200px",
                    width: "200px",
                    background: "#aa7e20",
                    borderRadius: "100px",
                  }}
                  onClick={() =>
                    localStorage.setItem("currentLanguage", selection)
                  }
                >
                  <h3
                    style={{
                      color: "#282c2d",
                      height: "150px",
                      textAlign: "center",
                      transform: "translateY(50%)",
                    }}
                  >
                    enter
                  </h3>
                </div>
                // </Link>
              )}
            </div>
          </Col>
        </Row>
        <div>
          <h3>Add Language To profile</h3>
          {languages.map((language) => (
            <div>
              <p style={{ display: "inline-block" }}>{language.name} - </p>
              <button
                onClick={() => addLanguageToUser(language, setUserLanguages)}
              >
                {" "}
                Add Language
              </button>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default SelectLanguagePage;
