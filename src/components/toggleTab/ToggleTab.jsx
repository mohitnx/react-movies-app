//could have reused the switch tab but wanted to get practice creating custom components

import "./style.scss";

import React, { useState, useEffect } from "react";

export const ToggleTab = () => {
  const savedMode = localStorage.getItem("mode");
  const [selectedOption, setSelectedOption] = useState(savedMode || "dark");

  useEffect(() => {
    if (savedMode) {
      setSelectedOption(savedMode);
    }
  }, []);

  //since the color varibles ( --black, black2, ) are deifned in the root level
  //:root in index.scss, they can be asccessed from any css rule or class within the document

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    localStorage.setItem("mode", option);
  };

  useEffect(() => {
    if (selectedOption === "light") {
      document.documentElement.style.setProperty("--black", "#FFC0CB");
      document.documentElement.style.setProperty("--black2", "#FF91A4");
      document.documentElement.style.setProperty("--black3", "#FF69B4");
      document.documentElement.style.setProperty("--black-lighter", "#FF1493");
      document.documentElement.style.setProperty("--black-light", "#DB7093");
    } else {
      document.documentElement.style.setProperty("--black", "#161617");
      document.documentElement.style.setProperty("--black2", "#171818");
      document.documentElement.style.setProperty("--black3", "#0c0c0d");
      document.documentElement.style.setProperty("--black-lighter", "#575859");
      document.documentElement.style.setProperty("--black-light", "#4e5359");
    }
  }, [selectedOption]);

  return (
    <div className="toggle-menu-container">
      <div className="option-container">
        <p
          className={`option ${selectedOption === "dark" ? "selected" : ""}`}
          onClick={() => handleOptionClick("dark")}
        >
          dark
        </p>
        <p
          className={`option ${selectedOption === "light" ? "selected" : ""}`}
          onClick={() => handleOptionClick("light")}
        >
          light
        </p>
      </div>
      <div className="selector-tab"></div>
    </div>
  );
};
