import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Top_nav from "./partials/Top_nav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Movies = () => {
  const navigat = useNavigate();

  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "FlixStream | Movie " + "|" + " " + category.toUpperCase();

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      if (data.results.length > 0) {
        setmovie((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refershHandler = () => {
    if (movie.length === 0) {
      GetMovie();
    } else {
      setpage(1);
      setmovie([]);
      GetMovie();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category]);

  return movie.length > 0 ? (
    <div className="w-full h-screen overflow-x-hidden">
      <div className="w-full px-[5%] flex items-center justify-between">
        <h1 className="text-xl font-medium text-zinc-400">
          <i
            onClick={() => navigat(-1)}
            className="ri-arrow-left-line hover:text-[#1d7437] mr-5 border-2 p-[3px] border-zinc-400 rounded-full"
          ></i>
          Movie{" "}
          <small className="text-sm text-zinc-500">
            ({category.toUpperCase()})
          </small>
        </h1>

        <div className="flex items-center w-[80%] gap-4">
          <Top_nav Placeholder="Search" />
          <div className="gap-3 flex">
            <Dropdown
              title="Category"
              options={["top_rated", "upcoming", "now_playing"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div
        className="h-[calc(100vh-100px)]  overflow-y-auto"
        id="scrollableDiv"
      >
        <InfiniteScroll
          dataLength={movie.length}
          next={GetMovie}
          hasMore={hasMore}
          loader={<Loading />}
          scrollableTarget="scrollableDiv"
          endMessage={
            <p className="text-center text-zinc-200 py-4">
              You have seen it all!
            </p>
          }
        >
          <Cards data={movie} title="movie" />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;
