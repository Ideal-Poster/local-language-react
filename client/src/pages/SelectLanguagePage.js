import React, { useEffect } from "react";
import { getUserLanguages, getLanguages, addLanguageToUser } from "../requests";
import { Link } from "react-router-dom";
import LanguagePage from "./LanguagePage";

function SelectLanguagePage(props) {
  const [userLanguages, setUserLanguages] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);
  const [selection, setSelection] = React.useState(null);

  useEffect(() => {
    getUserLanguages(setUserLanguages);
    getLanguages(setLanguages);
  }, []);

  return (
    <div>
      <h2>Select a language</h2>
      <h2>{selection}</h2>
      <div>
        {userLanguages.map((language) => (
          <button onClick={() => setSelection(language.name)}>
            {language.name}
          </button>
        ))}
      </div>
      <div>
        <h2>Add Language To profile</h2>
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

        {selection && (
          <Link to="/language">
            <button onClick={() => props.setCurrentLanguage(selection)}>
              enter
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default SelectLanguagePage;
