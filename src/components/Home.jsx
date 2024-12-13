import React, { useEffect, useState } from "react";
import Leftnav from "./partials/Leftnav";
import Top_nav from "./partials/Top_nav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "FlixStream | Home";

  const [wallpaper, setwallpaper] = useState(null);
  const [Trending, setTrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomData);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);

  return Trending && wallpaper ? (
    <>
      <Leftnav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden ">
        <Top_nav Placeholder="Search your Entertianment" />
        <Header data={wallpaper} />

        <div className="p-6 flex justify-between">
          <h1 className="text-xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown title="Filter" options={["all", "movie", "tv"]} func={(e) => setcategory(e.target.value)} />
        </div>

        <HorizontalCards data={Trending} />
      </div>
    </>
  ) : (
    <Loading/>
  );
};

export default Home;
