import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

import "./style.scss";

import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";

export const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  //getting image url from store ( we stored images in store from app.jsx)
  const { url } = useSelector((state) => state.home);

  //using custom hook to make api call
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    //img url is in object>result>[number betn 0-19]>backdrop_path
    //object as a whole is stored in data variable
    // ? is chaining ( null saftey of dart jastai)..so that if null code stil runs instead of throwing error
    const bg1 = data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    //getting size and base url from store through url
    //note ..bg2 could be hard coded as well as the image changes due to bg1 ko value only
    //but for learning purposes of store/redux we are doing it like this
    const bg2 = url.backdrop;
    //combining bg1 and bg2 to get actual image link
    const bg = bg2 + bg1;
    setBackground(bg);
    console.log(bg);
  }, [data]);

  const searchQueryHandlersearch = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="heroBanner">
      {/* if response from api has alread come(i.e loading = false ) then show the image ...see custom hook if confuesd*/}
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      {/* //to show fade / opacity in the image */}
      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            A one stop shop for all your enternainmnet needs
          </span>
          {/* event for when a key is released after being pressed */}
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
              //on enter key up...we search (see the function)
              //if not empty and enter pressedn then navigate is triggered
              onKeyUp={searchQueryHandler}
            ></input>
            <button onClick={searchQueryHandlersearch}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};
