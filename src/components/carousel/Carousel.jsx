//useRef to get reference to a element(use ref inside the element) which persists across re-renders
//allows us to interact with dom elemlents/values without triggering re-redners as well
import React, { useRef } from "react";

//icon buttons for horizonatall scrolling
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//to format date from api
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";

const Carousel = ({ data, loading, endpoint, title }) => {
  //size of carouselItems is put in carosulContianer
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  //hanlding of scrolling trending movies on button press of left/right
  const navigation = (dir) => {
    const container = carouselContainer.current;
    //+20 to keep account of padding
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    //using scrollTo method scroll to a driection wtih scroll animation

    //inside the container scroll it horizontally to the scrollAmount position with smooth scrolling behavior.
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  //for when moves are laoding from api
  const skeletonItems = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {/* if title provided while calling carousel then show it here */}
        {title && <div className="carouselTitle">{title}</div>}

        {/* trending seciton starts form here as there is not title provided */}

        {/* left and right arrow icons */}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          //if not loading then show the carousel Items

          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              //if we cant get the image from server then we show the
              //saved posterFallback image
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() =>
                    //eg movie/avatar or tv/sopranos
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  {/* poster */}
                  <div className="posterBlock">
                    <Img src={posterUrl} />

                    {/* genre : 
                    sending genre id..to genre compoentn..wher we can map genre text according to this id 
                    also sending only the first 2 genre ids*/}
                    <Genres data={item.genre_ids.slice(0, 2)} />

                    {/* circular rating 
                    taking only one number after decimali point*/}
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                  </div>

                  {/* movie title and date*/}
                  <div className="textBlock">
                    {/* movies have 'title' as name and series haev 'name' as name */}
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_date || item.first_air_date).format(
                        "MMM D, YYYY"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          //if loading then show loading layout (like in youtube)
          <div className="loadingSkeleton">
            {skeletonItems()}
            {skeletonItems()}
            {skeletonItems()}
            {skeletonItems()}
            {skeletonItems()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;

//use of key;

/*not mandetory but it is highly recommended to provide a unique key for each item in the 
list. The key prop helps React optimize the rendering process and efficiently 
update, add, or remove elements when the list changes.

*/
