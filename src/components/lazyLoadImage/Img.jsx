import React from "react";
//package
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

//when img has come from api but has not fully loaded..show the blur of img

//The LazyLoadImage component is designed to optimize the
//loading of images on a webpage, particularly when there are many images or large-sized images
//that might cause performance issues.

const Img = ({ src, className }) => {
  return (
    <LazyLoadImage className={className || ""} alt="" effect="blur" src={src} />
  );
};

export default Img;
