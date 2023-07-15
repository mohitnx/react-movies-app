import React from "react";

//hook to access parameters from teh ccurrent url
//so obvisouly it can only be used within a component that is rendered within a <Route>
//app.jsx ma detials is inside <Route>
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similarr from "./carousels/similar";

const Details = () => {
  //to extract mediaType and id from teh url

  //in carousel.jsx we haev navigate func when cliked on a menu
  //where we pass mdeiatype and id...which we are extracting here to make
  //api call and display the detials of that movie/tv
  const { mediaType, id } = useParams();

  //making api call using the extracted endpoints above to get videos
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);

  //again same..making api call with mdeiaType and id to get credits

  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similarr mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
