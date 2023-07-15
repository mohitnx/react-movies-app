import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchSearchQueryDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
  const [data, setData] = useState(null);

  //by default we get 20 results in page one..more 20 in page two and so on
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  //we first type a query in search bar...then we take that query from url in this
  //component and show the resutls as well in this componetn itself
  const { query } = useParams();

  //for the inital 20 results/ page 1
  const fetchInitialData = () => {
    setLoading(true);
    fetchSearchQueryDataFromApi(`/search/multi`, query, pageNum).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  //for the consequnet 20 results
  const fetchNextPageData = () => {
    fetchSearchQueryDataFromApi(`/search/multi`, query, pageNum).then((res) => {
      //if data already there then add new data to existing data
      if (data?.results) {
        setData({
          //adding new data to old data
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        //else no data previously then just add the new data
        setData(res);
      }
      //increase the page number
      setPageNum((prev) => prev + 1);
    });
  };

  //any time query changes, the setPage is set to 1 so that we get first 20 movies
  //and tehn we call teh inital movie fethcing function
  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {/* if the data is loading from api show a circulr progress bar */}
      {loading && <Spinner initial={true} />}

      {/* if loading is false then show the data */}
      {!loading && (
        <ContentWrapper>
          {/* if there is a move then show the movie */}
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>

              {/* 
              infinite scroll functionalty */}

              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                //after we scroll past a certain point we call the second functoni to get more moveis
                next={fetchNextPageData}
                //do infite scroll until the current page is < = the total pgaes for that paritucalr result
                hasMore={pageNum <= data?.total_pages}
                //to show somehting when the new moives are loading
                loader={<Spinner />}
              >
                {/* showing movie card   */}

                {data?.results.map((item, index) => {
                  //if the result is not a movei and a actor/director, etc then dont show it
                  //only show movie results

                  if (item.media_type === "person") return;
                  return (
                    //if the movie card is called from search then, no need to show rating and genre
                    //so the formSEarch is true
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            // if ther is no movie then show this image

            <img className="resultNotFound" src={noResults} alt="No Results" />
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
