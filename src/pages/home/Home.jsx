import React from "react";
import "./style.scss";
import { HeroBanner } from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import TopRated from "./topRated/TopRated";

export const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      {/* almost all code same as trending..as carousel, cricle progres...loading aniamtion..all thigns are same..only api call is diff */}
      <TopRated />
    </div>
  );
};
