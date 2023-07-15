import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
  const handleClick = (id) => {
    if (id === "github") {
      window.open("https://github.com/mohitnx", "_blank");
    } else if (id === "linkedin") {
      window.open(
        "https://www.linkedin.com/in/mohit-neupane-194351206/",
        "_blank"
      );
    } else if (id === "instagram") {
      window.open("https://www.instagram.com/___mo_hit/", "_blank");
    }
  };

  return (
    <footer className="footer">
      <ContentWrapper>
        <div className="infoText">Made using TMDB API, React, Redux, Sass</div>
        <div className="socialIcons">
          <span
            className="icon"
            id="github"
            onClick={() => handleClick("github")}
          >
            <FaGithub />
          </span>
          <span
            className="icon"
            id="linkedin"
            onClick={() => handleClick("github")}
          >
            <FaLinkedin />
          </span>
          <span
            className="icon"
            id="insta"
            onClick={() => handleClick("github")}
          >
            <FaInstagram />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
