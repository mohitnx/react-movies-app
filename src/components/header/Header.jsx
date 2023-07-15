import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//importign icons
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { FaRegPlayCircle } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";

const Header = () => {
  //to control the scrolling effect of header
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);

  //to change header slightly for mobile view
  const [mobileMenu, setMobileMenu] = useState(false);

  //to control search text
  const [query, setQuery] = useState("");

  //to show searchbar
  const [showSearch, setShowSearch] = useState("");

  //to navigate to antoher url
  const navigate = useNavigate();

  //to see which position you are on the screen after navigation
  const location = useLocation();

  //to bring teh user to the top of the page after navigaton
  //evn if they were at other positions in the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  //to control header ( opacity, hinding header when scrolling ,etc)
  const controlNavbar = () => {
    //vertical scroll value is window.scrollY..if it exceeds certain value ie
    //we scroll down a certain height, then hide the header
    if (window.scrollY > 200) {
      //if it is more than 200 and then it is more than lastScroll and not mobile menu then
      //hide it
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      }
      //else show the header with 'show' css property (solid background)
      else {
        setShow("show");
      }
      //if less than 200 then show the header
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  //to control the header ( opacity, hdiing haeder when scrolling etc)
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    //after work is done, remove the event listenr to prevvent memroy leak
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);

      //to colose teh search bar when we navigate to new screen
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    //in mobile view..closing the movie/tv show showing contienr after navigating to new screen
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <FaRegPlayCircle color="orange" size={42} />
          <span className="logoText">MovieOnline</span>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        {/* //for movie menu */}

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
