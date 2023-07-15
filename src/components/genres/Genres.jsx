import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

//problem: genres from api only gives genre_id..so we have to take thos
//id aand map them to a text/genre_name

//also note:genre_id is differnet for moves and tv series..so if we are searching for
//movies then seperate api call, and for tv series separate api calls
const Genres = ({ data }) => {
  //{genres} holds genres names from store..and teh prop data holds the genres id
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {data?.map((g) => {
        //if no name present for given id then jsut return
        if (!genres[g]?.name) return;
        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
