import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Top_nav from "./partials/Top_nav";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {


    const navigate = useNavigate();

  const [category, setcategory] = useState("popular");
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "FlixStream | Person " ;

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);

      if (data.results.length > 0) {
        setperson((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refershHandler = () => {
    if (person.length === 0) {
        GetPerson();
    } else {
      setpage(1);
      setperson([]);
      GetPerson();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category]);

  return person.length > 0 ? (
    <div className="w-full h-screen overflow-x-hidden">
      <div className="w-full px-[5%] flex items-center justify-between">
        <h1 className="text-xl font-medium text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#1d7437] mr-5 border-2 p-[3px] border-zinc-400 rounded-full"
          ></i>
          Popular Personality
          
        </h1>

        <div className="flex items-center w-[80%] gap-4">
          <Top_nav Placeholder="Search" />
          {/* <div className="gap-3 flex">
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div> */}
        </div>

      </div>

      <div
        className="h-[calc(100vh-100px)]  overflow-y-auto"
        id="scrollableDiv"
      >
        <InfiniteScroll
          dataLength={person.length}
          next={GetPerson}
          hasMore={hasMore}
          loader={<Loading />}
          scrollableTarget="scrollableDiv"
          endMessage={
            <p className="text-center text-zinc-200 py-4">
              You have seen it all!
            </p>
          }
        >
          <Cards data={person} title="person" />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default People

