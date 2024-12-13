import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Top_nav from "./partials/Top_nav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Treanding = () => {
  const navigate = useNavigate();

  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "FlixStream | Trending " + "|" + " " + category.toUpperCase();

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      // settrending(data.results);
      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refershHandler = () => {
    if (trending.length === 0) {
      GetTrending();
    } else {
      setpage(1);
      settrending([]);
      GetTrending();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-full h-screen overflow-x-hidden">
      <div className="w-full px-[5%] flex items-center justify-between">
        <h1 className="text-xl font-medium text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#1d7437] mr-5 border-2 p-[3px] border-zinc-400 rounded-full"
          ></i>
          Trending{" "}
          <small className="text-sm text-zinc-500">
            ({category.toUpperCase()})
          </small>
        </h1>

        <div className="flex items-center w-[80%]">
          <Top_nav Placeholder="Search" />
          <div className="gap-3 flex">
            <Dropdown
              title="Category"
              options={["movie", "tv", "all"]}
              func={(e) => setcategory(e.target.value)}
            />
            <Dropdown
              title="Duration"
              options={["week", "day"]}
              func={(e) => setduration(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div
        className="h-[calc(100vh-100px)] overflow-y-auto"
        id="scrollableDiv"
      >
        <InfiniteScroll
          dataLength={trending.length}
          next={GetTrending}
          hasMore={hasMore}
          loader={<Loading />}
          scrollableTarget="scrollableDiv"
          endMessage={
            <p className="text-center text-zinc-200 py-4">
              You have seen it all!
            </p>
          }
        >
          <Cards data={trending} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Treanding;



