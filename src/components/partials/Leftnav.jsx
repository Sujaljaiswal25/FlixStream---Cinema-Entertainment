
import React from "react";
import { Link } from "react-router-dom";

const Leftnav = () => {
  return (
    <div
      className="w-[100%] sm:w-[30%] md:w-[25%] lg:w-[20%] h-full border-r-[1px] border-zinc-400 p-4 md:p-7 bg-[#1F1E24] "
    >
      <h1 className="text-lg sm:text-xl text-white font-bold flex items-center">
        <i className="text-[#1d7437] ri-clapperboard-fill mr-2"></i>
        <span className="text-xl sm:text-2xl">F|ixStream.</span>
      </h1>

      <nav className="flex flex-col text-zinc-400 text-[4vw] sm:text-[1.3vw] md:text-[1.1vw] gap-2">
        <h1 className="text-white font-bold mt-6 sm:mt-8 mb-2 text-base md:text-l">
          New Feeds
        </h1>

        <Link
          to="/treanding"
          className="hover:text-white hover:bg-[#1d7437] rounded-lg p-2 duration-300"
        >
          <i className="ri-fire-line mr-2"></i> Treanding
        </Link>
        <Link
          to="/popular"
          className="hover:text-white hover:bg-[#1d7437] rounded-lg p-2 duration-300"
        >
          <i className="ri-bard-line mr-2"></i> Popular
        </Link>
        <Link
          to="/movies"
          className="hover:text-white hover:bg-[#1d7437] rounded-lg p-2 duration-300"
        >
          <i className="ri-movie-2-line mr-2"></i> Movies
        </Link>
        <Link
          to="/tv"
          className="hover:text-white hover:bg-[#1d7437] rounded-lg p-2 duration-300"
        >
          <i className="ri-tv-2-line mr-2"></i> TV shows
        </Link>
        <Link
          to="/person"
          className="hover:text-white hover:bg-[#1d7437] rounded-lg p-2 duration-300"
        >
          <i className="ri-team-line mr-2"></i> People
        </Link>
      </nav>

      <hr className="border-none h-[0.6px] bg-zinc-400 mt-4 mb-4" />

      <nav className="flex flex-col text-zinc-400 text-[4vw] sm:text-[1.3vw] md:text-[1.1vw] gap-2">
        <h1 className="text-white font-bold mt-4 mb-2 text-base md:text-l">
          Help Service
        </h1>

        <Link
          to="/about"
          className="hover:text-white hover:bg-[#1d7437] rounded-lg p-2 duration-300"
        >
          <i className="ri-information-2-line mr-2"></i> About FlixStream
        </Link>
      </nav>
    </div>
  );
};

export default Leftnav;
